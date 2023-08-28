"use client";
import DealsCard from "@/components/DealsCard";
import PageNumbers from "@/components/PageNumbers";
import Requests from "@/components/Requests";
import RequestsFilter from "@/components/RequestsFilter";
import Searchbox from "@/components/Searchbox";
import Button from "@/components/ui/Button";
import useOnClickOutside from "@/hooks/useOnclickOutside";
import { cn } from "@/app/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { getRequests } from "./lib/request";
import Dialog from "@/components/ui/DialogPrimitive";
import { useGlobalContext } from "./context/Store";
import RequestForm from "@/components/RequestForm";
import { useFeedsContext } from "./context/feedsContext";
import { useAuthContext } from "./context/authContext";
import { getCities } from "./lib/city";
import { getBookmarks } from "./lib/bookmark";
import { RequestType } from "./types";
import ReportUserCard from "@/components/ReportUserCard";
import LoadingDots from "@/components/LoadingDots";
import useLocations from "@/hooks/useLocation";

export default function Home() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [bookmarkedList, setBookmarkedList] = useState<number[] | null>(null);
  const [feedsWithBookmarkedRequests, setFeedsWithBookmarkedRequests] =
    useState<RequestType[] | null>(null);
  useLocations();
  const openSidebarRef = useRef<HTMLDivElement>(null);

  const { feeds, setFeeds, currentFeedsUrl, setCurrentFeedsUrl } =
    useFeedsContext();
  const { dispatch } = useAuthContext();
  const { selectedCategoryFilter } = useGlobalContext();

  useEffect(() => {
    dispatch({ type: "RESET" });
    (async () => {
      try {
        setIsError(false);
        const feedsResponse = await getRequests(null, setCurrentFeedsUrl);
        if (feedsResponse) {
          setIsLoading(false);
          setFeeds(feedsResponse);
          setFeedsWithBookmarkedRequests(feedsResponse.data);
        }
      } catch (err) {
        console.log(err);
        setIsError(true);
      }
    })();
  }, []);

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    (async () => {
      if (token) {
        const bookmarksRes: { data: RequestType[] } = await getBookmarks(token);

        if (!bookmarksRes) {
          console.log(bookmarksRes);
          return;
        }
        const bookmarks = bookmarksRes.data.map((bookmark) => bookmark.id);
        setBookmarkedList(bookmarks);
      }
    })();
  }, [feeds]);

  useEffect(() => {
    if (bookmarkedList && feeds) {
      const feedsWithBookmarkedRequestsArr = feeds?.data.map((request) => {
        if (bookmarkedList.includes(request.id)) {
          return {
            ...request,
            bookmark: true,
          };
        }
        return request;
      });
      setFeedsWithBookmarkedRequests(feedsWithBookmarkedRequestsArr);
      return;
    }
    setFeedsWithBookmarkedRequests(feeds?.data || null);
  }, [feeds, bookmarkedList]);

  useOnClickOutside(openSidebarRef, setShowSidebar);

  const onClickNext = async () => {
    setIsError(false);
    setIsLoading(true);
    const token = window.localStorage.getItem("token");
    window.scrollTo({ top: 200, behavior: "smooth" });
    try {
      const feedsResponse = await fetch(
        feeds?.links.next?.split(":").join("s:") || "",
        {
          method: "OPTIONS",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (feedsResponse.status === 200) {
        setIsLoading(false);
        const data = await feedsResponse.json();
        setFeeds(data);
      } else throw new Error("failed to fetch next page");
    } catch (err) {
      console.log(err);
      setIsError(true);
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
                <Dialog
                  dialogTrigger={
                    <Button
                      variant="outlined2"
                      className={cn("w-full py-[5px] mb-[14px]")}
                    >
                      Request for it
                    </Button>
                  }
                  className="fixed -translate-x-1/2 z-50 top-1/2 -translate-y-1/2 left-1/2"
                >
                  <RequestForm />
                </Dialog>
              </div>
            </div>

            <div className="mt-10 md:mt-14 flex flex-col md:flex-row md:justify-between md:items-center gap-6">
              <div className="bg-[#48466D] w-fit text-white text-headline_3 md:text-headline_2 font-headline">
                {selectedCategoryFilter || "Latest Requests"}
              </div>

              <div className="">
                <RequestsFilter />
              </div>
            </div>

            <div>
              <div className="min-h-[150px] md:min-h-[300px] relative ">
                {isLoading && !feeds && (
                  <LoadingDots className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2" />
                )}

                {feeds && feeds.data.length > 0 && (
                  <Requests
                    requests={feedsWithBookmarkedRequests}
                    className="mt-4 md:mt-8"
                  />
                )}

                {feeds && feeds.data.length < 0 && (
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

              <div>
                {feeds &&
                  feeds.meta.last_page > 1 &&
                  feeds.meta.last_page !== feeds.meta.current_page && (
                    <div className="w-full flex flex-col items-center justify-center">
                      <Button
                        variant="outlined"
                        className="mt-12 md:mt-14 w-[255px]"
                        onClick={onClickNext}
                      >
                        Next Page
                      </Button>
                    </div>
                  )}

                {feeds && feeds.meta.last_page > 1 && (
                  <div>
                    <PageNumbers
                      {...feeds.links}
                      {...feeds.meta}
                      setFeeds={setFeeds}
                      className={cn(
                        "mt-6",
                        feeds.meta.last_page === feeds.meta.current_page &&
                          "mt-12 md:mt-14"
                      )}
                      setIsLoading={setIsLoading}
                      setIsError={setIsError}
                    />
                  </div>
                )}
              </div>
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
          className="top-0 fixed left-0 h-full"
        >
          <RequestForm className="" />
        </Dialog>
      </main>
    </>
  );
}
