import { Child } from "../types";
import { QUESTIONNAIRE_SECTIONS, normalizeQuestionnaireSectionName } from "../questionnaire";

type ReviewDateFormat = "short" | "long";

interface ChildProfileStatus {
  subheading?: string;
  maintenancePhase?: boolean;
  planNotStarted?: boolean;
  diagnosticPathway?: boolean;
  suppressQuickNote?: boolean;
  sessionPreviewUnavailable?: boolean;
  assessmentCardProfile?: boolean;
  completedAssessmentReport?: boolean;
  reviewDate?: {
    short: string;
    long: string;
  };
}

const CHILD_PROFILE_STATUS: Record<string, ChildProfileStatus> = {
  Maya: {
    subheading: "Navigator Care",
    reviewDate: { short: "12 Sep", long: "12 September" },
    assessmentCardProfile: true,
  },
  Liam: {
    subheading: "Navigator Care",
    maintenancePhase: true,
    reviewDate: { short: "12 Dec", long: "12 December" },
    assessmentCardProfile: true,
  },
  Leo: {
    subheading: "Diagnostic Assessment",
    diagnosticPathway: true,
    suppressQuickNote: true,
    sessionPreviewUnavailable: true,
  },
  Noah: {
    subheading: "Diagnostic Assessment",
    diagnosticPathway: true,
    planNotStarted: true,
    suppressQuickNote: true,
    sessionPreviewUnavailable: true,
    completedAssessmentReport: true,
    reviewDate: { short: "8 Oct", long: "8 October" },
  },
  Nick: {
    subheading: "Diagnostic Assessment",
    diagnosticPathway: true,
    suppressQuickNote: true,
  },
  Sophia: {
    subheading: "Navigator Care",
    reviewDate: { short: "24 Sep", long: "24 September" },
    assessmentCardProfile: true,
  },
  Tom: {
    subheading: "Intake in progress",
    assessmentCardProfile: true,
  },
  Ava: {
    subheading: "Assessment pending",
    assessmentCardProfile: true,
  },
  Chloe: {
    subheading: "Assessment pending",
    assessmentCardProfile: true,
  },
};

function getProfileStatus(child: Child): ChildProfileStatus {
  return CHILD_PROFILE_STATUS[child.name] || {};
}

export function getChildSessionStatus(child: Child) {
  if (child.intake?.sessionDay && child.intake?.sessionTime) return "booked";
  if (child.intake?.sessionCancelled) return "cancelled";
  return "not-booked";
}

export function isSessionBooked(child: Child) {
  return getChildSessionStatus(child) === "booked";
}

/**
 * Formats the booked session date, e.g. "Thu 26 Jun" (or "Thu 26 June" with
 * month: "long"). Returns undefined when no session is booked, so callers can
 * `?? fallback`. Centralizes the date string that was duplicated across pages.
 */
export function getSessionDate(child: Child, month: "short" | "long" = "short"): string | undefined {
  if (!isSessionBooked(child)) return undefined;
  const day = child.intake?.sessionDay;
  return day ? `Thu ${day} ${month === "long" ? "June" : "Jun"}` : undefined;
}

/**
 * Whether the child is an established profile in the completed-quarter /
 * maintenance phase. Currently keyed off the seeded "Liam" demo profile;
 * centralized here so the name check lives in one place.
 */
export function isMaintenancePhase(child: Child) {
  return getProfileStatus(child).maintenancePhase === true;
}

export function isPlanNotStarted(child: Child) {
  return getProfileStatus(child).planNotStarted === true;
}

export function isDiagnosticPathway(child: Child) {
  return getProfileStatus(child).diagnosticPathway === true;
}

export function isAssessmentPendingProfile(child: Child) {
  return getChildSubheading(child) === "Assessment pending";
}

export function isIntakeProfile(child: Child) {
  return getChildSubheading(child) === "Intake in progress";
}

export function shouldSuppressQuickNote(child: Child) {
  return getProfileStatus(child).suppressQuickNote === true;
}

export function isSessionPreviewUnavailable(child: Child) {
  return getProfileStatus(child).sessionPreviewUnavailable === true;
}

export function usesAssessmentCard(child: Child) {
  return getProfileStatus(child).assessmentCardProfile === true;
}

export function usesPathwayChoiceCard(child: Child) {
  return child.name === "Ava";
}

export function usesCompletedAssessmentReport(child: Child) {
  return getProfileStatus(child).completedAssessmentReport === true;
}

export function getChildReviewDate(child: Child, format: ReviewDateFormat = "long") {
  const reviewDate = getProfileStatus(child).reviewDate;
  if (!reviewDate) return format === "long" ? "12 September" : "12 Sep";
  return reviewDate[format];
}

export function getChildSubheadingByName(childName: string) {
  return CHILD_PROFILE_STATUS[childName]?.subheading || "";
}

export function getDiagnosticPathwayCardCopy(child: Child) {
  if (!isDiagnosticPathway(child)) return {};
  const isBooked = isSessionBooked(child);

  return {
    titleText: "Diagnostic Assessment",
    descriptionText: isBooked ? undefined : "The pathway is chosen, but the Diagnostic Assessment hasn't started yet.",
    buttonText: isBooked ? "Prepare for your session" : "Book appointment",
  };
}

export function getNewChildPrimaryActionLabel(child: Child) {
  if (!child.isNew) return `Open ${child.name}`;
  if (child.name === "Ava") return "Open Insight";
  return isIntakeProfile(child) ? "Start questionnaire" : `Open ${child.name} Insight`;
}

export function shouldShowNewChildSetupAction(child: Child) {
  return Boolean(child.isNew) && !isDiagnosticPathway(child);
}

export function shouldUseFirstSessionCard(child: Child) {
  return Boolean(child.isNew) || (isDiagnosticPathway(child) && !isPlanNotStarted(child));
}

export function isNewChildOnboardingComplete(child: Child) {
  if (!child.isNew) return false;

  const completedSections = Array.from(
    new Set((child.intake?.completedQuestionnaireSections || []).map(normalizeQuestionnaireSectionName)),
  );
  const hasCompletedQuestionnaire = completedSections.length >= QUESTIONNAIRE_SECTIONS.length;
  const hasBookedSession = getChildSessionStatus(child) === "booked";

  return hasCompletedQuestionnaire && hasBookedSession;
}

export function getChildSubheading(child: Child) {
  const profileSubheading = getProfileStatus(child).subheading;
  if (profileSubheading) return profileSubheading;

  if (!child.isNew) return "Navigator Care";
  if (getChildSessionStatus(child) === "cancelled") return "Choose your path";
  return isNewChildOnboardingComplete(child) ? "Assessment pending" : "Intake in progress";
}
