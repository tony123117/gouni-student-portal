import type { FieldErrors, Resolver } from 'react-hook-form';
import { z } from 'zod';
import type {
  RegistrationCourse,
  RegistrationCreditRules,
  RegistrationEligibility,
  RegistrationSubmissionRequest,
  RegistrationTerm,
} from '../types/registration';

export interface RegistrationSchemaOptions {
  courses: RegistrationCourse[];
  rules: RegistrationCreditRules;
  eligibility: RegistrationEligibility | null;
  submissionSupported: boolean;
  term: RegistrationTerm | null;
}

export interface RegistrationFormValues {
  selectedCourseIds: string[];
}

export const emptyRegistrationFormValues: RegistrationFormValues = {
  selectedCourseIds: [],
};

const selectionPath = ['selectedCourseIds'] as const;

export function createRegistrationSelectionSchema(
  options: RegistrationSchemaOptions,
) {
  return z
    .object({
      selectedCourseIds: z.array(z.string()),
    })
    .superRefine((values, ctx) => {
      const fail = (message: string) => {
        ctx.addIssue({
          code: 'custom',
          path: [...selectionPath],
          message,
        });
      };

      if (!options.submissionSupported) {
        fail(
          'Course registration submission is not available from the university service.',
        );
        return;
      }

      if (!options.term) {
        fail(
          'The university has not supplied the academic session and semester for this registration.',
        );
        return;
      }

      if (!options.eligibility) {
        fail(
          'The university has not supplied your registration eligibility, so this selection cannot be submitted.',
        );
        return;
      }

      if (!options.eligibility.eligible) {
        fail(
          options.eligibility.reason ??
            'The university service reports that you are not eligible to register for this term.',
        );
        return;
      }

      if (values.selectedCourseIds.length === 0) {
        fail('Select at least one course to register.');
        return;
      }

      if (
        new Set(values.selectedCourseIds).size !==
        values.selectedCourseIds.length
      ) {
        fail('Duplicate course selections are not allowed.');
        return;
      }

      const courseById = new Map(
        options.courses.map((course) => [course.id, course]),
      );
      const selectedCourses = values.selectedCourseIds.map((courseId) =>
        courseById.get(courseId),
      );

      if (selectedCourses.some((course) => course === undefined)) {
        fail(
          'One or more selected courses are not in the university catalogue. Remove them and select again.',
        );
        return;
      }

      const unavailable = selectedCourses.filter(
        (course): course is RegistrationCourse =>
          course !== undefined &&
          (!course.selectable || course.prerequisiteSatisfied === false),
      );

      if (unavailable.length > 0) {
        fail(
          `The following selected courses are not available for registration: ${unavailable
            .map((course) => course.code)
            .join(', ')}.`,
        );
        return;
      }

      const totalCreditUnits = selectedCourses.reduce(
        (total, course) => total + (course?.creditUnits ?? 0),
        0,
      );

      if (
        options.rules.maximumCreditUnits !== null &&
        totalCreditUnits > options.rules.maximumCreditUnits
      ) {
        fail(
          `The selected ${totalCreditUnits} credit units exceed the university maximum of ${options.rules.maximumCreditUnits} credit units for this registration period.`,
        );
        return;
      }

      if (
        options.rules.minimumCreditUnits !== null &&
        totalCreditUnits < options.rules.minimumCreditUnits
      ) {
        fail(
          `The selected ${totalCreditUnits} credit units are below the university minimum of ${options.rules.minimumCreditUnits} credit units for this registration period.`,
        );
      }
    });
}

/**
 * Resolver factory so the selection form uses React Hook Form with the
 * installed Zod version, matching the other portal forms.
 */
export function createRegistrationFormResolver(
  options: RegistrationSchemaOptions,
): Resolver<RegistrationFormValues> {
  const schema = createRegistrationSelectionSchema(options);

  return (values) => {
    const result = schema.safeParse(values);

    if (result.success) {
      return { values: result.data, errors: {} };
    }

    const errors: FieldErrors<RegistrationFormValues> = {};
    const [firstIssue] = result.error.issues;

    if (firstIssue) {
      errors.selectedCourseIds = {
        type: firstIssue.code,
        message: firstIssue.message,
      } as never;
    }

    return { values: {}, errors };
  };
}

export function toRegistrationSubmissionRequest(
  values: RegistrationFormValues,
  term: RegistrationTerm,
): RegistrationSubmissionRequest {
  return {
    academicSession: term.academicSession,
    semester: term.semester,
    courseIds: [...values.selectedCourseIds],
  };
}
