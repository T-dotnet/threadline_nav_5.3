import { Check } from "lucide-react";
import { cn } from "../../lib/utils";

const SETUP_STEPS = [
  { num: 1, title: "Journey", desc: "Where you are now" },
  { num: 2, title: "Your child", desc: "Name & date of birth" },
  { num: 3, title: "Hardest right now", desc: "Top areas" },
  { num: 4, title: "Questionnaire", desc: "Everyday life" },
];

interface SetupStepperProps {
  activeStep: number;
  heading: string;
}

export function SetupStepper({ activeStep, heading }: SetupStepperProps) {
  const currentStep = SETUP_STEPS.find((step) => step.num === activeStep) ?? SETUP_STEPS[0];
  const mobileProgressClass =
    activeStep <= 1 ? "w-0" : activeStep === 2 ? "w-1/3" : activeStep === 3 ? "w-2/3" : "w-full";

  return (
    <div className="thread-setup-stepper">
      <div className="thread-setup-stepper__heading-row">
        <div className="thread-setup-stepper__heading">
          {heading}
        </div>
        <div className="thread-setup-stepper__counter">
          Step {activeStep} of {SETUP_STEPS.length}
        </div>
      </div>

      <div className="thread-setup-stepper__mobile-card">
        <div className="thread-setup-stepper__mobile-summary">
          <div className="thread-setup-stepper__mobile-number">
            {activeStep}
          </div>
          <div className="thread-setup-stepper__mobile-copy">
            <div className="thread-setup-stepper__mobile-title">
              {currentStep.title}
            </div>
            <div className="thread-setup-stepper__mobile-desc">
              {currentStep.desc}
            </div>
          </div>
        </div>

        <div className="thread-setup-stepper__mobile-progress">
          <div className="thread-setup-stepper__mobile-track" />
          <div
            className={cn("thread-setup-stepper__mobile-fill", mobileProgressClass)}
          />
          <div className="thread-setup-stepper__mobile-grid">
            {SETUP_STEPS.map((step) => {
              const isPast = activeStep > step.num;
              const isCurrent = activeStep === step.num;

              return (
                <div key={step.num} className="thread-setup-stepper__mobile-item">
                  <div
                    className={cn(
                      "thread-setup-stepper__dot thread-setup-stepper__dot--mobile",
                      isPast
                        ? "thread-setup-stepper__dot--complete"
                        : isCurrent
                        ? "thread-setup-stepper__dot--current"
                        : "thread-setup-stepper__dot--upcoming",
                    )}
                    aria-label={`${step.title}: ${isPast ? "complete" : isCurrent ? "current" : "up next"}`}
                  >
                    {isPast ? <Check className="thread-setup-stepper__check" /> : step.num}
                  </div>
                  <span
                    className={cn(
                      "thread-setup-stepper__mobile-label",
                      isCurrent || isPast ? "thread-setup-stepper__label--available" : "thread-setup-stepper__label--upcoming",
                    )}
                  >
                    {step.title}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="thread-setup-stepper__desktop-list">
        {SETUP_STEPS.map((step) => {
          const isPast = activeStep > step.num;
          const isCurrent = activeStep === step.num;
          return (
            <div key={step.num} className="thread-setup-stepper__desktop-item">
              <div
                className={cn(
                  "thread-setup-stepper__dot thread-setup-stepper__dot--desktop",
                  isPast
                    ? "thread-setup-stepper__dot--complete"
                    : isCurrent
                    ? "thread-setup-stepper__dot--current thread-setup-stepper__dot--current-desktop"
                    : "thread-setup-stepper__dot--upcoming",
                )}
              >
                {isPast ? <Check className="thread-setup-stepper__check" /> : step.num}
              </div>
              <div>
                <div
                  className={cn(
                    "thread-setup-stepper__desktop-title",
                    isCurrent || isPast ? "thread-setup-stepper__label--available" : "thread-setup-stepper__label--upcoming",
                  )}
                >
                  {step.title}
                </div>
                <div
                  className={cn(
                    "thread-setup-stepper__desktop-desc",
                    isCurrent ? "thread-setup-stepper__desc--current" : "thread-setup-stepper__label--upcoming",
                  )}
                >
                  {step.desc}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
