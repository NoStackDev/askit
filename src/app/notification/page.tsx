"use client";

import { cn } from "@/app/lib/utils";
import Button from "@/components/ui/Button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {};

export default function NotificationPage({}: Props) {
  const [notifications, setNotifications] = React.useState<any>();

  React.useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (!token) {
      window.location.assign("/login");
    }
  }, []);

  return (
    <main className="px-[20px] mb-10 md:mb-0 pt-14 flex flex-col gap-6 w-full md:pl-14 md:pr-[100px]">
      <div className="border border-[#000000] rounded-[20px] bg-primary font-headline font-bold text-headline_2 w-full text-white text-center shadow-boxShadow_4 py-[10px]">
        Notification
      </div>

      <div>
        {notifications && notifications.data.length > 0 ? (
          <>
            <div className="flex flex-col gap-6">
              <NotificationItem
                title="Lorem Ipsum"
                read={false}
                time={new Date()}
              />
            </div>
          </>
        ) : (
          <div className="flex flex-col justify-center items-center mt-10">
            <Image
              src="/images/pictures/emptyNotification.png"
              height={150}
              width={158.61}
              alt="there are no notifications"
            />

            <p className="mt-8 font-headline text-headline_3 font-bold text-black">
              No Notification Yet
            </p>
            <Link href={"/"} className="mt-12 h-fit w-fit">
              <Button className="font-body text-title_3 font-medium px-8 py-2 text-white">
                Go Back
              </Button>
            </Link>
          </div>
        )}
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
