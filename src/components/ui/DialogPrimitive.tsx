import React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cn } from "@/app/lib/utils";

export const Close = DialogPrimitive.Close;

const Dialog = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Close>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Root> & {
    dialogTrigger: React.ReactNode;
    // dialogContent: React.ReactNode;
    className?: string;
  }
>(({ children, className, dialogTrigger, ...props }, fowardref) => {
  return (
    <DialogPrimitive.Root {...props}>
      <DialogPrimitive.Trigger
        asChild
        className="data-[state='open']:opacity-0"
      >
        {dialogTrigger}
      </DialogPrimitive.Trigger>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="bg-[#000000]/90 fixed inset-0 z-50 backdrop-blur-md" />
        <DialogPrimitive.Content className={cn("h-fit w-fit z-50", className)}>
          {children}
          <DialogPrimitive.Close asChild>
            <div id="dialogCloseTrigger"></div>
          </DialogPrimitive.Close>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
});

Dialog.displayName = "Dialog";

export default Dialog;
