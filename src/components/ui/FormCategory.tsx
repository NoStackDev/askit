import { cn } from "@/lib/utils";
import * as MenubarPrimitive from "@radix-ui/react-menubar";
import * as SelectPrimitive from "@radix-ui/react-select";
import React from "react";

const KeyboardArrowDownIcon = React.lazy(
  () => import("@mui/icons-material/KeyboardArrowDown")
);

const ChevronRightIcon = React.lazy(
  () => import("@mui/icons-material/ChevronRight")
);

const FormCategory = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Root>
>(({ className, ...props }, forwardedRef) => (
  <SelectPrimitive.Root>
    <SelectPrimitive.Trigger aria-label="category">
      <SelectPrimitive.Value placeholder="Select" />
      <SelectPrimitive.Icon />
    </SelectPrimitive.Trigger>

    <SelectPrimitive.Portal>
      <SelectPrimitive.Content>
        <SelectPrimitive.Viewport>
          <SelectPrimitive.Group>
            {/* <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
            <SelectItem value="blueberry">Blueberry</SelectItem>
            <SelectItem value="grapes">Grapes</SelectItem>
            <SelectItem value="pineapple">Pineapple</SelectItem> */}
            <Menubar />
          </SelectPrimitive.Group>

          {/* <SelectPrimitive.Separator /> */}
        </SelectPrimitive.Viewport>
        <SelectPrimitive.Arrow />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  </SelectPrimitive.Root>
));

FormCategory.displayName = "FormCategory";

export default FormCategory;

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ children, className, ...props }, forwardedRef) => {
  return (
    <SelectPrimitive.Item
      className={cn(
        "text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] pr-[35px] pl-[25px] relative select-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:outline-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1",
        className
      )}
      {...props}
      ref={forwardedRef}
    >
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
      <SelectPrimitive.ItemIndicator className="absolute left-0 w-[25px] inline-flex items-center justify-center">
        {/* <CheckIcon /> */}
      </SelectPrimitive.ItemIndicator>
    </SelectPrimitive.Item>
  );
});

SelectItem.displayName = "SelectItem"

const Menubar = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Root> & {
    category?: string
  }
>(({ className, category, ...props }, forwardedRef) => (
  <MenubarPrimitive.Root
    ref={forwardedRef}
    className={cn("", className)}
    {...props}
  >
    <MenubarPrimitive.Menu>
      <MenubarPrimitive.Trigger>
        Select{" "}
        <React.Suspense>
          <KeyboardArrowDownIcon />
        </React.Suspense>
      </MenubarPrimitive.Trigger>

      <MenubarPrimitive.Portal>
        <MenubarPrimitive.Content>
          <MenubarPrimitive.Sub>
            <MenubarPrimitive.SubTrigger>
              Products{" "}
              <React.Suspense>
                <ChevronRightIcon />
              </React.Suspense>{" "}
            </MenubarPrimitive.SubTrigger>

            <MenubarPrimitive.Portal>
              <MenubarPrimitive.SubContent></MenubarPrimitive.SubContent>
            </MenubarPrimitive.Portal>
          </MenubarPrimitive.Sub>
        </MenubarPrimitive.Content>
      </MenubarPrimitive.Portal>
    </MenubarPrimitive.Menu>
  </MenubarPrimitive.Root>
));

Menubar.displayName = "Menubar"
