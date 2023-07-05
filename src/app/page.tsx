"use client";
import DealsCard from "@/components/DealsCard";
import PageNumbers from "@/components/PageNumbers";
import Requests from "@/components/Requests";
import RequestsFilter from "@/components/RequestsFilter";
import Searchbox from "@/components/Searchbox";
import Button from "@/components/ui/Button";
import { requestsConfig } from "@/config.ts/requests";
import useOnClickOutside from "@/hooks/useOnclickOutside";
import { cn } from "@/app/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  deleteRequest,
  getRequestDetail,
  getRequests,
  getUserRequests,
  postRequest,
  updateRequest,
} from "./lib/request";
import { getPreferences, updateUser } from "./lib/user";
import { getLocations } from "./lib/location";
import updateUserPreference from "./lib/user/updateUserPreference";
import logoutUser from "./lib/user/logoutUser";
import Dialog from "@/components/ui/DialogPrimitive";
import { useGlobalContext } from "./context/Store";
import { redirect } from "next/navigation";
import { deleteResponse, postResponse, updateResponse } from "./lib/repsonse";
import { addToBookmark, deleteBookmark, getBookmarks } from "./lib/bookmark";
import RequestForm from "@/components/RequestForm";
import { useFeedsContext } from "./context/feedsContext";

export default function Home() {
  const [showSidebar, setShowSidebar] = useState(false);
  const openSidebarRef = useRef<HTMLDivElement>(null);
  const [feeds, setFeeds] = useState<any>([])

  const { token, user } = useGlobalContext();
  const {
    data: feedData,
    links: feedsLinks,
    meta: feedsMeta,
    dispatch,
  } = useFeedsContext();

  // if (!token || !user) {
  //   redirect("/login");
  // }

  useEffect(() => {
    (async () => {
      try {
        const feedsResponse = await getRequests(dispatch);
        setFeeds(feedsResponse)
        if (feedsResponse.status === 200) {
        dispatch({type: "SUCCESS", payload: feedsResponse})
        }
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  useOnClickOutside(openSidebarRef, setShowSidebar);

  const handleSidebar = () => {
    setShowSidebar(!showSidebar);

    document.body.style.overflow =
      document.body.style.overflow === "hidden" ? "" : "hidden";
  };

  const onClickNext = async () => {
    dispatch({ type: "FETCHING" });
    try {
      const feedsResponse = await fetch(feedsLinks.next || "/");
      if (feedsResponse.status === 200) {
        dispatch({ type: "SUCCESS" });
        const data = await feedsResponse.json();
        dispatch({ type: "RESET", payload: data });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
    <main className="relative md:mr-[100px] md:ml-[60px]">
      <div className="relative flex md:gap-[92px] md:mb-10">
        <div className="mx-5 my-6 mt-[24px] md:mt-[56px] w-full z-10">
          <Searchbox className="md:hidden" />

          <div className="flex gap-6 md:grid md:grid-cols-[75%_25%]">
            <DealsCard className="mt-5 md:mt-0 w-full">
              <Image
                src="/images/pictures/deals.png"
                width={540}
                height={174}
                alt="deals"
                className="w-full h-auto max-h-[250px]"
              />
            </DealsCard>

            <div className="hidden md:flex md:flex-col w-full border stroke-secondary rounded-xl bg-white items-center px-3 justify-between">
              <div className="mt-4 font-headline font-bold text-headline_3 text-secondary text-center">
                Don’t Search Aimlessly
              </div>
              <div className="font-body font-light text-special text-black">
                for whatever you want!
              </div>
              <Link href="/request" className="w-full mb-[14px]">
                <Button variant="outlined2" className="w-full py-[5px]">
                  Request for it
                </Button>
              </Link>
            </div>
          </div>

          <div className="mt-10 md:mt-14 flex flex-col md:flex-row md:justify-between md:items-center gap-6">
            <div className="bg-[#48466D] w-fit text-white text-headline_3 md:text-headline_2 font-headline">
              Latest Requests
            </div>

            <div className="">
              <RequestsFilter />
            </div>
          </div>

          <div>
            {feeds.data && feeds.data.length > 0 ? (
              <>
                <Requests requests={feeds.data} className="mt-4 md:mt-8" />

                <div className="w-full flex flex-col items-center justify-center">
                  <Button
                    variant="outlined"
                    className="mt-12 md:mt-14 w-[255px]"
                  >
                    Next Page
                  </Button>
                </div>

                <div>
                  <PageNumbers
                    {...feeds.links}
                    {...feeds.meta}
                    className="mt-6"
                  />
                </div>
              </>
            ) : (
              <div className="flex flex-col justify-center items-center mt-10">
                <Image
                  src="/images/pictures/requestEmpty.png"
                  height={150}
                  width={177.16}
                  alt="there are no requests"
                />

                <p className="mt-8 font-headline text-headline_3 font-bold text-black">
                  Oops... Nothing Here
                </p>
                <p className="mt-4 font-body text-body_2 text-[#000000]/60 max-w-[328px] text-center">
                  No request has been placed on this category
                </p>
                <Link href={"/"} className="mt-12 h-fit w-fit">
                  <Button className="font-body text-title_3 font-medium px-8 py-2 text-white">
                    Go Back
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      <Dialog
        dialogTrigger={
          <Button
            className={cn(
              "md:hidden fixed bottom-10 right-5 z-20 hover:cursor-pointer"
            )}
          >
            Place a Request
          </Button>
        }
        className="-translate-x-1/2 z-30 fixed top-[80px] left-1/2"
      >
        <RequestForm className="" />
      </Dialog>
    </main>
      </>
  );
}
