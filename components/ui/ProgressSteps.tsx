"use client";

type ProgressStepsProps = {
  steps: string[];
  currentStep: number;
};

export function ProgressSteps({ steps, currentStep }: ProgressStepsProps) {
  return (
    <div aria-label="Postęp rezerwacji" className="grid gap-3 sm:grid-cols-6">
      {steps.map((step, index) => {
        const isActive = index === currentStep;
        const isDone = index < currentStep;

        return (
          <div
            key={step}
            className="flex items-center gap-2 rounded-full bg-white/70 p-1.5 ring-1 ring-graphite-900/6"
          >
            <span
              className={`grid h-7 w-7 shrink-0 place-items-center rounded-full text-xs font-bold ${
                isDone || isActive
                  ? "bg-mint-500 text-white"
                  : "bg-graphite-900/5 text-graphite-500"
              }`}
            >
              {index + 1}
            </span>
            <span
              className={`hidden truncate text-xs font-semibold sm:block ${
                isActive ? "text-graphite-900" : "text-graphite-500"
              }`}
            >
              {step}
            </span>
          </div>
        );
      })}
    </div>
  );
}
