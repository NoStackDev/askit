"use client";

import { cn } from "@/app/lib/utils";
import React from "react";
import ResponseSent from "./ResponseSent";
import Button from "./ui/Button";
import { useResponseContext } from "@/app/context/responseContext";
import { useRequestContext } from "@/app/context/requestContext";
import RequestPlaced from "./RequestPlaced";

const StatusModal = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div">
>(() => {
  const { responseStatus, setResponseStatus } = useResponseContext();
  const { requestStatus, setRequestStatus } = useRequestContext();

  return (
    <>
      {responseStatus === "SUCCESS" && (
        <div className={cn("fixed top-0 left-0 h-full w-full z-[60]")}>
          <div
            className="absolute top-0 left-0 h-full w-full bg-[#000000]/80 z-[60]"
            onClick={() => setResponseStatus(null)}
          ></div>
          <ResponseSent
            doneButton={
              <Button
                className="px-[62px] py-3 border-black text-white rounded-lg"
                onClick={() => setResponseStatus(null)}
              >
                Done
              </Button>
            }
            className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 z-[60]"
          />
        </div>
      )}

      {requestStatus === "SUCCESS" && (
        <div className={cn("fixed top-0 left-0 h-full w-full z-[60]")}>
          <div
            className="absolute top-0 left-0 h-full w-full bg-[#000000]/80 z-[60]"
            onClick={() => setRequestStatus(null)}
          ></div>
          <RequestPlaced
            doneButton={
              <Button
                className="px-[62px] py-3 border-black text-white rounded-lg"
                onClick={() => setRequestStatus(null)}
              >
                Done
              </Button>
            }
            className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 z-[60]"
          />
        </div>
      )}
    </>
  );
});

StatusModal.displayName = StatusModal.name;

export default StatusModal;
