import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import type {
  RegistrationSnapshot,
  RegistrationSubmissionRequest,
} from '../types/registration';
import {
  createRegistrationFormResolver,
  emptyRegistrationFormValues,
  toRegistrationSubmissionRequest,
  type RegistrationFormValues,
} from '../validation/registration';
import { CourseCatalogue } from './CourseCatalogue';
import { RegistrationReviewDialog } from './RegistrationReviewDialog';
import { SelectedCoursesPanel } from './SelectedCoursesPanel';

interface RegistrationWorkspaceProps {
  snapshot: RegistrationSnapshot;
  isSubmitting: boolean;
  receiptRecorded: boolean;
  onSubmit: (request: RegistrationSubmissionRequest) => void;
}

export function RegistrationWorkspace({
  snapshot,
  isSubmitting,
  receiptRecorded,
  onSubmit,
}: RegistrationWorkspaceProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<RegistrationFormValues>({
    resolver: createRegistrationFormResolver({
      courses: snapshot.courses,
      rules: snapshot.rules,
      eligibility: snapshot.eligibility,
      submissionSupported:
        snapshot.availability === 'available' &&
        snapshot.capabilities.submission,
      term: snapshot.term,
    }),
    defaultValues: emptyRegistrationFormValues,
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  });

  const [reviewIds, setReviewIds] = useState<string[] | null>(null);
  const submitLockRef = useRef(false);

  // Once the parent reports that no submission is in flight, allow a new
  // review. The synchronous ref blocks double activation before re-render.
  useEffect(() => {
    if (!isSubmitting) {
      submitLockRef.current = false;
    }
  }, [isSubmitting]);

  const selectedIds = watch('selectedCourseIds');
  const selectedCourses = snapshot.courses.filter((course) =>
    selectedIds.includes(course.id),
  );
  const totalCreditUnits = selectedCourses.reduce(
    (total, course) => total + course.creditUnits,
    0,
  );

  const submissionSupported =
    snapshot.availability === 'available' && snapshot.capabilities.submission;
  const hasCurrentRegistration = snapshot.currentRegistration !== null;
  const canSubmit =
    submissionSupported &&
    snapshot.term !== null &&
    snapshot.eligibility?.eligible === true &&
    !hasCurrentRegistration &&
    !receiptRecorded;

  let blockedReason: string | null = null;

  if (snapshot.availability === 'unavailable') {
    blockedReason =
      snapshot.submissionBlockedReason ??
      snapshot.message ??
      'Course registration is unavailable until the university registration service is connected.';
  } else if (!snapshot.capabilities.submission) {
    blockedReason =
      snapshot.submissionBlockedReason ??
      'The university has not enabled registration submission for this term.';
  } else if (!snapshot.term) {
    blockedReason =
      'The university has not supplied the academic session and semester for this registration.';
  } else if (!snapshot.eligibility) {
    blockedReason =
      'The university has not supplied your registration eligibility, so submission stays disabled.';
  } else if (!snapshot.eligibility.eligible) {
    blockedReason =
      snapshot.eligibility.reason ??
      'The university service reports that you are not eligible to register for this term.';
  } else if (hasCurrentRegistration) {
    blockedReason =
      'The university already holds a registration for this term. A new selection cannot be submitted from this page.';
  } else if (receiptRecorded) {
    blockedReason =
      'Your registration has been received by the university. Refresh the registration data to confirm its current status before submitting again.';
  }

  const selectionDisabled =
    isSubmitting ||
    !submissionSupported ||
    snapshot.term === null ||
    snapshot.eligibility?.eligible !== true ||
    hasCurrentRegistration ||
    receiptRecorded;

  const selectionError = (
    errors.selectedCourseIds as { message?: string } | undefined
  )?.message;

  const reviewCourses =
    reviewIds === null
      ? []
      : snapshot.courses.filter((course) => reviewIds.includes(course.id));
  const reviewTotalCreditUnits = reviewCourses.reduce(
    (total, course) => total + course.creditUnits,
    0,
  );

  const handleReview = (values: RegistrationFormValues) => {
    if (!canSubmit) {
      return;
    }

    setReviewIds([...values.selectedCourseIds]);
  };

  const requestReview = () => {
    void handleSubmit(handleReview)();
  };

  const closeReview = () => {
    setReviewIds(null);
  };

  const confirmSubmission = () => {
    if (
      !reviewIds ||
      reviewIds.length === 0 ||
      !snapshot.term ||
      isSubmitting ||
      !canSubmit ||
      submitLockRef.current
    ) {
      return;
    }

    submitLockRef.current = true;
    const request = toRegistrationSubmissionRequest(
      { selectedCourseIds: reviewIds },
      snapshot.term,
    );

    setReviewIds(null);
    onSubmit(request);
  };

  const removeCourse = (courseId: string) => {
    setValue(
      'selectedCourseIds',
      selectedIds.filter((selectedId) => selectedId !== courseId),
      { shouldValidate: true },
    );
  };

  const clearSelection = () => {
    setValue('selectedCourseIds', [], { shouldValidate: true });
  };

  return (
    <>
      <div className="grid gap-3.5 xl:grid-cols-[minmax(0,1.55fr)_minmax(290px,0.45fr)]">
        <div className="order-2 min-w-0 xl:order-1">
          <CourseCatalogue
            availability={snapshot.availability}
            message={snapshot.message}
            courses={snapshot.courses}
            selectedIds={selectedIds}
            register={register}
            disabled={selectionDisabled}
          />
        </div>

        <div className="order-1 min-w-0 xl:order-2">
          <SelectedCoursesPanel
            selectedCourses={selectedCourses}
            totalCreditUnits={totalCreditUnits}
            minimumCreditUnits={snapshot.rules.minimumCreditUnits}
            maximumCreditUnits={snapshot.rules.maximumCreditUnits}
            canSubmit={canSubmit}
            blockedReason={blockedReason}
            isSubmitting={isSubmitting}
            errorMessage={selectionError ?? null}
            onRemove={removeCourse}
            onClear={clearSelection}
            onReview={requestReview}
          />
        </div>
      </div>

      {reviewIds !== null && snapshot.term ? (
        <RegistrationReviewDialog
          term={snapshot.term}
          courses={reviewCourses}
          totalCreditUnits={reviewTotalCreditUnits}
          minimumCreditUnits={snapshot.rules.minimumCreditUnits}
          maximumCreditUnits={snapshot.rules.maximumCreditUnits}
          isSubmitting={isSubmitting}
          onClose={closeReview}
          onConfirm={confirmSubmission}
        />
      ) : null}
    </>
  );
}
