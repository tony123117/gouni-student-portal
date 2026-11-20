import { ChevronDown, Search, RotateCcw } from 'lucide-react';
import { useMemo, useState } from 'react';
import type { UseFormRegister } from 'react-hook-form';
import { SectionCard } from '@/components/shared/SectionCard';
import { PortalIcon } from '@/components/shared/PortalIcon';
import type {
  RegistrationAvailability,
  RegistrationCourse,
} from '../types/registration';
import type { RegistrationFormValues } from '../validation/registration';
import { formatCreditUnits } from '../utils/format';
import {
  CourseCatalogueEmpty,
  CourseCatalogueNoResults,
  CourseCatalogueUnavailable,
} from './RegistrationStates';

interface CourseCatalogueProps {
  availability: RegistrationAvailability;
  message: string | null;
  courses: RegistrationCourse[];
  selectedIds: string[];
  register: UseFormRegister<RegistrationFormValues>;
  disabled: boolean;
}

const ALL_CLASSIFICATIONS = 'all';

export function CourseCatalogue({
  availability,
  message,
  courses,
  selectedIds,
  register,
  disabled,
}: CourseCatalogueProps) {
  const [query, setQuery] = useState('');
  const [classification, setClassification] = useState(ALL_CLASSIFICATIONS);

  const classifications = useMemo(() => {
    const unique = new Set<string>();

    for (const course of courses) {
      if (course.classification?.trim()) {
        unique.add(course.classification);
      }
    }

    return Array.from(unique);
  }, [courses]);

  const normalizedQuery = query.trim().toLowerCase();

  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      const matchesClassification =
        classification === ALL_CLASSIFICATIONS ||
        course.classification === classification;
      const matchesQuery =
        normalizedQuery.length === 0 ||
        course.code.toLowerCase().includes(normalizedQuery) ||
        course.title.toLowerCase().includes(normalizedQuery);

      return matchesClassification && matchesQuery;
    });
  }, [classification, courses, normalizedQuery]);

  const hasActiveFilters =
    normalizedQuery.length > 0 || classification !== ALL_CLASSIFICATIONS;

  const clearFilters = () => {
    setQuery('');
    setClassification(ALL_CLASSIFICATIONS);
  };

  return (
    <SectionCard
      title="Available Courses"
      description="Courses supplied by the university for this registration period."
      headerAside={
        availability === 'available' ? (
          <span className="text-[10px] font-bold text-slate-400">
            {courses.length} {courses.length === 1 ? 'course' : 'courses'}
          </span>
        ) : null
      }
      bodyClassName="p-0"
    >
      {availability === 'unavailable' ? (
        <CourseCatalogueUnavailable message={message} />
      ) : courses.length === 0 ? (
        <CourseCatalogueEmpty message={message} />
      ) : (
        <>
          <div className="border-b border-portal-line/80 p-4 sm:px-5">
            <div className="flex flex-col gap-2 sm:flex-row">
              <label htmlFor="course-search" className="sr-only">
                Search courses by code or title
              </label>
              <div className="relative min-w-0 flex-1">
                <PortalIcon
                  icon={Search}
                  className="pointer-events-none absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-navy-600"
                  strokeWidth={2.3}
                />
                <input
                  id="course-search"
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search by course code or title"
                  className="h-10 w-full rounded-lg border border-portal-line bg-portal-surface/60 pl-9 pr-3 text-[12px] font-semibold text-navy-950 outline-none transition-colors placeholder:font-medium placeholder:text-slate-400 hover:bg-portal-surface focus:border-navy-300 focus:bg-white focus:ring-2 focus:ring-navy-100"
                />
              </div>

              {classifications.length > 0 ? (
                <>
                  <label htmlFor="course-classification" className="sr-only">
                    Filter courses by classification
                  </label>
                  <div className="relative sm:w-52">
                    <select
                      id="course-classification"
                      value={classification}
                      onChange={(event) => setClassification(event.target.value)}
                      className="h-10 w-full appearance-none rounded-lg border border-portal-line bg-portal-surface/60 pl-3 pr-8 text-[11.5px] font-semibold text-navy-950 outline-none transition-colors hover:bg-portal-surface focus:border-navy-300 focus:bg-white focus:ring-2 focus:ring-navy-100"
                    >
                      <option value={ALL_CLASSIFICATIONS}>
                        All classifications
                      </option>
                      {classifications.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                    <PortalIcon
                      icon={ChevronDown}
                      className="pointer-events-none absolute right-2.5 top-1/2 size-3.5 -translate-y-1/2 text-navy-600"
                      strokeWidth={2.3}
                    />
                  </div>
                </>
              ) : null}

              {hasActiveFilters ? (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="inline-flex h-10 items-center justify-center gap-1.5 rounded-lg border border-portal-line bg-white px-3 text-[11px] font-bold text-navy-800 transition-colors hover:border-navy-200 hover:bg-portal-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-600 focus-visible:ring-offset-2"
                >
                  <PortalIcon
                    icon={RotateCcw}
                    className="size-3.5"
                    strokeWidth={2.3}
                  />
                  Clear
                </button>
              ) : null}
            </div>

            <div className="mt-2.5 flex flex-wrap items-center justify-between gap-2">
              <p className="text-[10px] font-medium text-slate-500">
                Showing {filteredCourses.length} of {courses.length} courses
              </p>
              {selectedIds.length > 0 ? (
                <p className="text-[10px] font-bold text-navy-700">
                  {selectedIds.length} selected
                </p>
              ) : null}
            </div>
          </div>

          {filteredCourses.length === 0 ? (
            <CourseCatalogueNoResults onClearFilters={clearFilters} />
          ) : (
            <ul className="divide-y divide-portal-line/70">
              {filteredCourses.map((course) => (
                <CourseRow
                  key={course.id}
                  course={course}
                  register={register}
                  disabled={disabled}
                  isSelected={selectedIds.includes(course.id)}
                />
              ))}
            </ul>
          )}
        </>
      )}
    </SectionCard>
  );
}

interface CourseRowProps {
  course: RegistrationCourse;
  register: UseFormRegister<RegistrationFormValues>;
  disabled: boolean;
  isSelected: boolean;
}

function CourseRow({
  course,
  register,
  disabled,
  isSelected,
}: CourseRowProps) {
  const [expanded, setExpanded] = useState(false);
  const checkboxId = `registration-course-${course.id}`;
  const unavailableId = `${checkboxId}-unavailable`;
  const isUnavailable =
    !course.selectable || course.prerequisiteSatisfied === false;
  const hasDetails =
    Boolean(course.description?.trim()) ||
    (course.prerequisites?.length ?? 0) > 0;
  const metaItems = [course.department, course.level].filter(
    (value): value is string => Boolean(value),
  );

  return (
    <li
      className={`transition-colors ${
        isUnavailable
          ? 'bg-portal-surface/40'
          : isSelected
            ? 'bg-portal-sky/70 ring-1 ring-inset ring-navy-200'
            : 'hover:bg-portal-surface/50'
      }`}
    >
      <div className="flex items-start gap-2.5 px-3.5 py-3 sm:gap-3 sm:px-4">
        <input
          id={checkboxId}
          type="checkbox"
          value={course.id}
          {...register('selectedCourseIds')}
          disabled={disabled || isUnavailable}
          aria-describedby={isUnavailable ? unavailableId : undefined}
          className="mt-0.5 size-4 shrink-0 cursor-pointer rounded border-portal-line accent-navy-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        />

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <label
              htmlFor={checkboxId}
              className={`text-[12px] leading-[18px] text-navy-950 ${
                isUnavailable ? 'cursor-not-allowed' : 'cursor-pointer'
              }`}
            >
              <span className="font-mono font-extrabold">{course.code}</span>
              <span className="ml-1.5 font-semibold text-navy-800">
                {course.title}
              </span>
            </label>
            {course.requirement ? (
              <span className="inline-flex items-center rounded border border-navy-100 bg-navy-50 px-1.5 py-0.5 text-[8.5px] font-bold uppercase tracking-[0.08em] text-navy-700">
                {course.requirement === 'compulsory'
                  ? 'Compulsory'
                  : 'Elective'}
              </span>
            ) : null}
            {course.classification ? (
              <span className="inline-flex items-center rounded border border-gold-200 bg-gold-50 px-1.5 py-0.5 text-[8.5px] font-bold uppercase tracking-[0.08em] text-gold-800">
                {course.classification}
              </span>
            ) : null}
          </div>

          <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-[9.5px] font-medium text-slate-500">
            {metaItems.length > 0 ? (
              <span>{metaItems.join(' · ')}</span>
            ) : null}
            {course.registrationStatus ? (
              <span className="inline-flex items-center rounded border border-portal-line bg-white px-1.5 py-0.5 text-[8.5px] font-bold uppercase tracking-[0.07em] text-navy-700">
                {course.registrationStatus}
              </span>
            ) : null}
            {isUnavailable ? (
              <span className="font-bold text-rose-600">Unavailable</span>
            ) : null}
          </div>

          {isUnavailable && course.unavailableReason ? (
            <p
              id={unavailableId}
              className="mt-1 text-[9.5px] font-medium leading-[14px] text-rose-600"
            >
              {course.unavailableReason}
            </p>
          ) : null}

          {expanded ? (
            <div className="mt-2 space-y-1.5 rounded-lg border border-portal-line/80 bg-white px-2.5 py-2">
              {course.description?.trim() ? (
                <p className="text-[10px] leading-[16px] text-slate-600">
                  {course.description}
                </p>
              ) : null}
              {course.prerequisites && course.prerequisites.length > 0 ? (
                <p className="text-[9.5px] leading-[15px] text-slate-500">
                  <span className="font-bold text-navy-700">
                    Prerequisites:
                  </span>{' '}
                  {course.prerequisites.join(', ')}
                  {course.prerequisiteSatisfied === true
                    ? ' · Requirement met (university service)'
                    : course.prerequisiteSatisfied === false
                      ? ' · Requirement not met (university service)'
                      : ''}
                </p>
              ) : null}
            </div>
          ) : null}
        </div>

        <div className="flex shrink-0 flex-col items-end gap-1">
          <span className="whitespace-nowrap rounded border border-portal-line bg-white px-1.5 py-0.5 text-[9.5px] font-bold tabular-nums text-navy-950">
            {formatCreditUnits(course.creditUnits)}
          </span>
          {hasDetails ? (
            <button
              type="button"
              onClick={() => setExpanded((current) => !current)}
              aria-expanded={expanded}
              className="inline-flex h-7 items-center rounded text-[9.5px] font-bold text-navy-700 transition-colors hover:text-navy-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-600 focus-visible:ring-offset-2"
            >
              {expanded ? 'Hide details' : 'Details'}
            </button>
          ) : null}
        </div>
      </div>
    </li>
  );
}
