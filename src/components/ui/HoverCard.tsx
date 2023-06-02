import * as HoverCardPrimitive from "@radix-ui/react-hover-card";
import React from "react";

const HoverCard = React.forwardRef<
  React.ElementRef<typeof HoverCardPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof HoverCardPrimitive.Root>
>(() => (
  <HoverCardPrimitive.Root>
    <HoverCardPrimitive.Trigger asChild>
      <span>Products</span>
    </HoverCardPrimitive.Trigger>

    <HoverCardPrimitive.Portal>
      <HoverCardPrimitive.Content>
        <HoverCardPrimitive.Arrow />
      </HoverCardPrimitive.Content>
    </HoverCardPrimitive.Portal>
  </HoverCardPrimitive.Root>
));


HoverCard.displayName = "HoverCard"

export default HoverCard