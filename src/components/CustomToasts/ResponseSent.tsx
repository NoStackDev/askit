import Image from "next/image";
import React from "react";
import Button from "../ui/Button";

const ResponseSent = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div">
>(({ children, className, ...props }, forwardRef) => {
  return (
    <div
      className="w-[347px] flex flex-col gap-6 items-center bg-white pt-[88px] pb-[66px] px-7 rounded-[20px]"
      ref={forwardRef}
    >
      <Image
        src={"/images/pictures/responseSent.png"}
        width={175.88}
        height={150}
        alt="response sent"
      />

      <div className="text-center mt-[60px] font-mono font-bold text-[#000000] text-headline_2">
        Response Sent
      </div>

      <div className="text-center font-body text-body_1 text-[#000000]">
        Thank you for your response, requester will contact you through the
        provided whatapp number
      </div>

      <Button className="px-[62px] py-3 border-black text-black rounded-lg">Done</Button>
    </div>
  );
});

ResponseSent.displayName = "ResponseSent";

export default ResponseSent;
