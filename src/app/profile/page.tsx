"use client";

import React from "react";

import { getUserResponses } from "../lib/repsonse";
import { useResponseContext } from "../context/responseContext";
import { UserType } from "../types";
import ProfileInfo from "@/components/ProfileInfo";
import { useGlobalContext } from "../context/Store";

const UserInfo = React.lazy(() => import("@/components/UserInfo"));
const Responses = React.lazy(() => import("@/components/Responses"));
const EditIcon = React.lazy(() => import("@mui/icons-material/Edit"));

type Props = {};

const ProfilePage = (props: Props) => {
  const { responses, setResponses } = useResponseContext();
  const [isLoading, setIsLoading] = React.useState(true);
  const [user, setUser] = React.useState<UserType | null>(null);
  const [editProfile, setEditProfile] = React.useState(false);
  const { setToken, user: authUser, setUser: setAuthUser } = useGlobalContext();

  React.useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (!token) {
      window.location.assign("/login");
    }
  }, []);

  React.useEffect(() => {
    const userDetails = window.localStorage.getItem("userDetails");
    console.log(userDetails)
    if (!userDetails) {
      window.location.assign("/login");
      return;
    }

    setUser(JSON.parse(userDetails).data);
  }, []);


  React.useEffect(() => {
    const token = window.localStorage.getItem("token");
    (async () => {
      try {
        if (token) {
          const res = await getUserResponses(token);
          setResponses(res.data);
        }
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  return (
    <>
      {editProfile ? (
        <ProfileInfo userDetails={user} />
      ) : (
        <main className="relative bg-background px-[20px] md:px-0 pb-20 md:pb-0 md:mt-14 md:mb-10 md:ml-[112px] md:mr-[100px]">
          <div className="flex items-center justify-between w-full mt-10 md:mt-0 md:mx-0">
            <div className="bg-secondary w-fit mt-[10] mb-[6] p-2 items-center font-headline text-white text-headline_3 font-bold">
              My Profile
            </div>

            <div className="w-fit flex gap-[10px] p-2 items-center hover:cursor-pointer">
              <React.Suspense>
                <EditIcon className="text-primary" />
              </React.Suspense>

              <div
                className="font-body text-primary text-title_2 font-medium"
                onClick={() => setEditProfile(true)}
              >
                Edit Profile
              </div>
            </div>
          </div>

          <div className="flex flex-col md:grid md:grid-cols-[348px_1fr] gap-6">
            <React.Suspense>
              <UserInfo
                userDetails={user}
                variant="profile"
                className="mt-10"
              />
            </React.Suspense>

            <div className="col-span-2 mt-14">
              <div className="bg-secondary w-fit flex gap-[10px] p-2 items-center font-headline text-white text-headline_2 font-bold">
                My Responses
              </div>

              {responses && (
                <React.Suspense>
                  <Responses
                    responses={responses}
                    className="mt-6"
                    variant="user"
                  />
                </React.Suspense>
              )}
            </div>
          </div>
        </main>
      )}
    </>
  );
};

export default ProfilePage;
