import * as React from "react";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface StepperProps extends React.HTMLAttributes<HTMLDivElement> {
  activeStep: number;
  steps: string[];
}

export const Stepper = React.forwardRef<HTMLDivElement, StepperProps>(
  ({ className, activeStep, steps, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex items-center w-full", className)}
        {...props}
      >
        {steps.map((step, index) => (
          <React.Fragment key={index}>
            <div className="flex items-center">
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center border-2",
                  index <= activeStep
                    ? "bg-primary border-primary text-primary-foreground"
                    : "border-gray-300 text-gray-300"
                )}
              >
                {index < activeStep ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <span>{index + 1}</span>
                )}
              </div>
              <div className="ml-2">
                <div className="text-sm font-medium">{step}</div>
              </div>
            </div>
            {index < steps.length - 1 && (
              <div
                className={cn(
                  "flex-1 h-0.5 mx-4",
                  index < activeStep ? "bg-primary" : "bg-gray-300"
                )}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    );
  }
);
Stepper.displayName = "Stepper";
