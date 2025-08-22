import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const medicalButtonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-gradient-primary text-primary-foreground shadow-soft hover:shadow-medium hover:scale-105",
        secondary: "bg-gradient-secondary text-secondary-foreground shadow-soft hover:shadow-medium hover:scale-105",
        success: "bg-gradient-success text-success-foreground shadow-soft hover:shadow-medium hover:scale-105",
        outline: "border border-primary text-primary hover:bg-primary/10 hover:shadow-soft",
        ghost: "hover:bg-primary/10 text-primary hover:shadow-soft",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-6 py-2",
        sm: "h-8 rounded-lg px-4 text-xs",
        lg: "h-12 rounded-xl px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

export interface MedicalButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof medicalButtonVariants> {
  asChild?: boolean;
}

const MedicalButton = React.forwardRef<HTMLButtonElement, MedicalButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(medicalButtonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
MedicalButton.displayName = "MedicalButton";

export { MedicalButton, medicalButtonVariants };