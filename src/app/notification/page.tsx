import { cn } from "@/lib/utils";
import React from "react";

type Props = {};

export default function NotificationPage({}: Props) {
  return (
    <main className="md:ml-14 pt-14 flex flex-col gap-6 w-full">
      <div className="border border-[#000000] rounded-[20px] bg-primary font-headline font-bold text-headline_2 w-full text-white text-center shadow-boxShadow_4 py-[10px]">
        Notification
      </div>
      <div className="flex flex-col gap-6">
        <NotificationItem title="Lorem Ipsum" read={false} />
        <NotificationItem title="Lorem Ipsum" read={true} />
      </div>
    </main>
  );
}

type NotificationItemProps = {
  title: string;
  read: boolean;
};

function NotificationItem({ title, read }: NotificationItemProps) {
  return (
    <div className="w-full p-4 border border-stroke bg-faded rounded-[14px] shadow-boxShadow_5 flex justify-start gap-4">
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
  );
}
