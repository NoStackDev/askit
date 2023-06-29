import React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";

export const Close = DialogPrimitive.Close;

const Dialog = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Close>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Root> & {
    dialogTrigger: React.ReactNode;
    dialogContent: React.ReactNode;
  }
>(({ children, dialogTrigger, dialogContent }, fowardref) => {
  return (
    <DialogPrimitive.Root>
      <DialogPrimitive.Trigger
        asChild
        className="data-[state='open']:opacity-0"
      >
        {dialogTrigger}
      </DialogPrimitive.Trigger>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="bg-[#000000]/20 fixed inset-0 z-20" />
        <DialogPrimitive.Content className="z-30 fixed top-[53%] left-1/2 h-[80vh] w-screen md:w-5/12 -translate-x-1/2 -translate-y-1/2">
          {dialogContent}
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
