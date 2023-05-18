import React from "react";
import { VariantProps, cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva("inline-flex items-center justify-center", {
  variants: {
    variant: {
      primary:
        "p-3 bg-primary rounded-[14px] font-body font-medium text-title_2 md:text-title_1 text-white",
      outlined:
        "px-[55px] py-[10px] rounded-lg border-[1px] border-primary text-title_3 font-body font-medium text-primary w-fit hover:bg-primary hover:text-white",
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className, variant, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, className }))}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
