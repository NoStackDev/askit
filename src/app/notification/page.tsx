import { cn } from "@/lib/utils";
import React from "react";

type Props = {};

export default function NotificationPage({}: Props) {
  return (
    <main className="px-[20px] mb-10 md:mb-0 pt-14 flex flex-col gap-6 w-full md:pl-14 md:pr-[100px]">
      <div className="border border-[#000000] rounded-[20px] bg-primary font-headline font-bold text-headline_2 w-full text-white text-center shadow-boxShadow_4 py-[10px]">
        Notification
      </div>
      <div className="flex flex-col gap-6">
        <NotificationItem title="Lorem Ipsum" read={false} time={new Date()} />
        <NotificationItem title="Lorem Ipsum" read={true} time={new Date()} />
      </div>
    </main>
  );
}

type NotificationItemProps = {
  title: string;
  read: boolean;
  time: Date;
};

function NotificationItem({ title, read, time }: NotificationItemProps) {
  return (
    <div className="w-full p-4 border border-stroke bg-faded rounded-[14px] md:mr-[100px] shadow-boxShadow_5 flex justify-between">
      <div className="flex justify-start gap-4">
        <div
          className={cn(
            "h-6 w-6",
            !read && "bg-[#D9D9D9]",
            read && "bg-[#D9D9D9]/50"
          )}
        ></div>
        <div
          className={cn(
            "font-body font-medium text-title_",
            !read && "text-black",
            read && "text-black/50"
          )}
        >
          {title}
        </div>
      </div>

      <div
        className={cn(
          "font-body font-light text-special",
          !read && "text-black",
          read && "text-black/50"
        )}
      >
        1hr
      </div>
    </div>
  );
}
