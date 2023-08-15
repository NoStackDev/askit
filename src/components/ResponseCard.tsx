import { useResponseContext } from "@/app/context/responseContext";
import { deleteResponse } from "@/app/lib/repsonse";
import { cn, month } from "@/app/lib/utils";
import { CityInterface, RequestDetailResponseType } from "@/app/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Dialog from "./ui/DialogPrimitive";
import ExternalAppConfirmation from "./ExternalAppConfirmation";
import { DialogClose } from "@radix-ui/react-dialog";
import Button from "./ui/Button";
import { getCities } from "@/app/lib/city";
import DeleteConfirmation from "./DeleteConfirmation";

const LocationOnIcon = React.lazy(
  () => import("@mui/icons-material/LocationOn")
);
const PersonIcon = React.lazy(() => import("@mui/icons-material/Person"));
const NorthEastIcon = React.lazy(() => import("@mui/icons-material/NorthEast"));
const DeleteIcon = React.lazy(() => import("@mui/icons-material/Delete"));

const ResponseCard = React.forwardRef<
  React.ElementRef<"div">,
  React.HTMLAttributes<HTMLDivElement> &
    Omit<RequestDetailResponseType, "id"> & {
      variant?: "user";
      responseid: number;
    }
>(
  (
    {
      children,
      className,
      created_at,
      description,
      responseid,
      image_url,
      location,
      title,
      user,
      user_id,
      price,
      variant,
      whatsapp_num,
      whatsapp_link,
      ...props
    },
    ref
  ) => {
    const { responses, setResponses } = useResponseContext();
    const [locationString, setLocationString] = React.useState<string | null>(
      null
    );

    React.useEffect(() => {
      const stateCitiesIntermediate = window.localStorage.getItem("cities");

      if (!stateCitiesIntermediate) {
        (async () => {
          try {
            const citiesRes = await getCities();
            window.localStorage.setItem("cities", JSON.stringify(citiesRes));
          } catch (err) {
            console.log(err);
          }
        })();
      } else {
        Object.values(
          JSON.parse(stateCitiesIntermediate) as {
            [id: string]: CityInterface[];
          }
        ).forEach((arr) => {
          arr.forEach((arr1) => {
            if (arr1.id === Number(location)) {
              setLocationString(arr1.city);
              return;
            }
          });
        });
      }
    }, []);

    const date = new Date(created_at);

    const onClickDeleteBtn = async (
      event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
      responseid: number
    ) => {
      event.stopPropagation();
      let responseIndex: null | number = null;
      let deletedResponse: RequestDetailResponseType | null = null;
      const newResponse = responses?.filter((response, index) => {
        if (response.id === Number(responseid)) {
          responseIndex = index;
          deletedResponse = response;
        }
        return response.id !== Number(responseid);
      });

      try {
        const token = window.localStorage.getItem("token");
        const userDetails = window.localStorage.getItem("userDetails");
        if (token && userDetails) {
          const newRequests = responses?.filter((response, index) => {
            if (response.id === Number(responseid)) {
              responseIndex = index;
              deletedResponse = response;
            }
            return response.id !== Number(responseid);
          });
          setResponses(newRequests || null);

          const userId = JSON.parse(userDetails).data.id;
          const res = await deleteResponse(token, responseid);

          if (res.success) {
            return;
          } else {
            if (responses && responseIndex && deletedResponse)
              setResponses(responses);
          }
        } else window.location.assign("/login");
      } catch (err) {
        console.log(err);
        if (responses && responseIndex && deletedResponse)
          setResponses(responses);
      }
    };

    return (
      <div
        ref={ref}
        className={cn(
          "p-4 bg-secondary rounded-[20px] h-fit min-w-[300px]",
          variant === "user" && "bg-[#191A23]",
          className
        )}
        {...props}
      >
        <div className="flex gap-3 items-start">
          {image_url && (
            <Link href={`/profile/${user_id}/`}>
              <Image
                src={`https://${image_url}`}
                width={92}
                height={92}
                alt={`product image`}
              />
            </Link>
          )}

          <div
            className={cn(
              "font-body text-white text-title_3 font-medium",
              !image_url && "text-white text-center w-full"
            )}
          >
            {description}
          </div>
        </div>

        <div className="mt-4 flex justify-between items-center">
          <div className="flex gap-4 items-center">
            <React.Suspense
              fallback={
                <div className="w-4 h-4 bg-stroke/80 animate-pulse"></div>
              }
            >
              <div className="flex items-center gap-1">
                <LocationOnIcon className="text-[#A3A1A1] h-[16.3px] w-auto" />
                <span className="text-grey text-special font-body font-light">
                  {locationString}
                </span>
              </div>
            </React.Suspense>

            {created_at && (
              <div className="text-grey text-special font-body font-light">
                {date.getDay()} {month(date.getMonth())}
              </div>
            )}
          </div>

          <div className="text-title_3 font-body font-medium text-white">
            {price && <>N{price.toLocaleString()}</>}
          </div>
        </div>

        {variant === "user" ? null : (
          <div className="flex items-end h-fit justify-between">
            <div className="flex items-end h-fit gap-2">
              <React.Suspense
                fallback={
                  <div className="mt-[26px] text-stroke animate-pulse h-6 w-6 rounded-full"></div>
                }
              >
                <Link href={`/profile/${user_id}/`}>
                  {false ? (
                    <Image
                      src={`https://${image_url}`}
                      height={20}
                      width={20}
                      className="rounded-full"
                      alt={`${user}'s profile pic`}
                    />
                  ) : (
                    <PersonIcon className="mt-[26px] text-stroke p-[2.33px] bg-[#D9D9D9] rounded-full self-center hover:cursor-pointer" />
                  )}
                </Link>
              </React.Suspense>

              <Link href={`/profile/${user_id}/`}>
                <div className="font-headline font-bold text-body_2 text-white hover:cursor-pointer">
                  {user ? user : "Username"}
                </div>
              </Link>
            </div>

            <Dialog
              dialogTrigger={
                <div className="flex gap-1 items-center hover:cursor-pointer">
                  <div className="font-headline text-body_2 font-bold text-sm text-[#20E010]">
                    WhatsApp
                  </div>
                  <React.Suspense>
                    <NorthEastIcon className="text-[#20E010]" />
                  </React.Suspense>
                </div>
              }
              className="fixed top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 z-40"
            >
              <ExternalAppConfirmation
                appTitle="WhatsApp"
                closeDialogElement={
                  <div className="flex flex-col gap-6 items-center">
                    <DialogClose asChild>
                      <a href={"https://wa.me/" + whatsapp_num}>
                        <Button className="px-11 py-3 rounded-lg hover:cursor-pointer">
                          Proceed to WhatsApp
                        </Button>
                      </a>
                    </DialogClose>

                    <DialogClose asChild>
                      <Button
                        variant={"outlined2"}
                        className="px-[72px] py-3 text-black border-black hover:cursor-pointer"
                      >
                        Cancel
                      </Button>
                    </DialogClose>
                  </div>
                }
              />
            </Dialog>
          </div>
        )}

        {variant === "user" ? (
          <div className="flex items-center gap-8 mt-6">
            <Dialog
              dialogTrigger={
                <DeleteIcon className="text-white hover:cursor-pointer" />
              }
              className="fixed -translate-x-1/2 z-50 top-1/2 -translate-y-1/2 left-1/2"
            >
              <DeleteConfirmation
                closeDialogElement={
                  <div className="flex flex-col gap-6 items-center">
                    <DialogClose asChild>
                      <Button
                        variant={"outlined2"}
                        className="px-[72px] py-3 border-black text-black"
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                      >
                        No
                      </Button>
                    </DialogClose>

                    <DialogClose asChild>
                      <Button
                        variant={"outlined2"}
                        className="px-[72px] py-3 border-black text-black"
                        onClick={(e) => onClickDeleteBtn(e, responseid)}
                      >
                        Yes delete!
                      </Button>
                    </DialogClose>
                  </div>
                }
              />
            </Dialog>

            <Image
              src="/images/icons/editIcon.png"
              width={24}
              height={24}
              alt="edit"
              className="hover:cursor-pointer"
            />
          </div>
        ) : null}
      </div>
    );
  }
);

ResponseCard.displayName = "ResponseCard";

export default ResponseCard;
