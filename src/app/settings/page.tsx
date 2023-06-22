import Button from "@/components/ui/Button";
import Image from "next/image";
import React from "react";

type Props = {};

const SettingsPage = (props: Props) => {
  return (
    <main className="mt-10 md:mt-14 md:ml-16 md:mr-[100px] mb-10 md:mb-20">
      <div className="w-full flex justify-between items-center px-5 md:px-0">
        <div className="bg-[#48466D] font-headline text-headline_2 text-white font-bold w-fit">
          Settings
        </div>

        <div className="flex gap-1">
          <Image
            src="/images/icons/logout.png"
            height={24}
            width={24}
            alt="logout"
          />
          <div className="text-primary font-body text-title_2 font-medium hover:cursor-pointer">
            Sign out
          </div>
        </div>
      </div>

      {/* profile */}
      <div className="mt-8 md:mt-6 p-5 md:px-4 md:py-6 bg-white">
        <div className="font-headline text-headline_3 font-bold text-secondary">
          Profile
        </div>

        <div className="mt-4 md:mt-2 font-body text-body_1 text-[#000000]/60">
          Example@email.com
        </div>

        <div className="flex justify-between items-center w-full mt-7 md:mt-6">
          <div className="font-body text-title_1 font-medium text-[#000000]">
            Change Password
          </div>

          <Image
            src="/images/icons/expand_more_change_password.png"
            height={24}
            width={24}
            alt="change password"
            className="md:hidden"
          />
        </div>
      </div>

      <div className="mt-6 md:mt-4 p-5 md:px-4 md:py-6 bg-white">
        <div className="font-headline text-headline_3 font-bold text-secondary">
          Customize Feed
        </div>

        <div>
          <div className="mt-6">
            <span className="font-body text-title_2 font-medium text-black">
              Preferred Location
            </span>
            <span className="font-body text-body_2 text-secondary ml-4">
              Default
            </span>
          </div>

          <div className="mt-4 w-full flex flex-col md:flex-row gap-4">
            <select
              name="state"
              id="state_select_id"
              className="w-full py-2 px-2"
            >
              <option value="Rivers">Rivers</option>
              <option value="Lagos">Lagos</option>
              <option value="Abuja">Abuja</option>
            </select>

            <div className="w-full flex gap-6">
              <select name="city" id="city_select_id" className="w-full">
                <option value=""></option>
                <option value=""></option>
                <option value=""></option>
              </select>

              <Button variant="outlined2" className="py-[10px] px-6">
                Add
              </Button>
            </div>
          </div>
        </div>

        <div className="md:hidden w-full mt-6 border-t border-[#000000]/10"></div>

        <div>
          <div className="mt-6">
            <span className="font-body text-title_2 font-medium text-black">
              Preferred Category
            </span>
          </div>

          <div className="mt-4 w-full flex flex-col md:flex-row gap-4">
            <select
              name="category"
              id="category_select_id"
              className="w-full py-2 px-2"
            >
              <option value="Products">Products</option>
              <option value="Services">Services</option>
              <option value="Accomodation">Accomodation</option>
            </select>

            <div className="w-full flex gap-6">
              <select name="type" id="types_select_id" className="w-full">
                <option value=""></option>
                <option value=""></option>
                <option value=""></option>
              </select>

              <Button variant="outlined2" className="py-[10px] px-6">
                Add
              </Button>
            </div>
          </div>

          <div className="flex flex-wrap mt-4">
            <div className="bg-background rounded-2xl px-3 py-1 flex gap-1 w-fit">
              <span className="font-body text-secondary text-body_2">
                Fashion
              </span>
              <span className="font-body text-[#000000] text-body_2">x</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 md:mt-4 p-5 md:px-4 md:py-6 bg-white">
        <div className="w-full flex justify-between">
          <div className="font-headline text-headline_3 font-bold text-secondary">
            Visibility
          </div>

          <div className="font-body text-title_3 font-medium text-primary hover:cursor-pointer">
            SAVE CHANGES
          </div>
        </div>

        <div className="mt-6 w-full">
          <div className="font-body text-title_2 font-medium text-black">
            My Request
          </div>

          <div className="flex gap-10 mt-4">
            <div className="flex gap-2">
              <input
                type="radio"
                name="visibility"
                id="public"
                value="public"
              />
              <label
                htmlFor="public"
                className="font-body text-title_3 font-medium text-black"
              >
                Public
              </label>
            </div>

            <div className="flex gap-2">
              <input
                type="radio"
                name="visibility"
                id="agents"
                value="agents"
              />
              <label
                htmlFor="agents"
                className="font-body text-title_3 font-medium text-black"
              >
                Only Verified Agents
              </label>
            </div>
          </div>

          <div className="mt-4 font-body text-title_3 text-[#000000]/60 max-w-[498px]">
            *Public - everyone can view and respond to your request. *Only
            verified Agents - Only users we have verified on the category of the
            request can view and respond to it (feature not yet available in
            your country)
          </div>
        </div>

        <div className="mt-6 w-full">
          <div className="font-body text-title_2 font-medium text-black">
            My Responses
          </div>

          <div className="flex gap-10 mt-4">
            <div className="flex gap-2">
              <input
                type="radio"
                name="visibility"
                id="public"
                value="public"
              />
              <label
                htmlFor="public"
                className="font-body text-title_3 font-medium text-black"
              >
                Public
              </label>
            </div>

            <div className="flex gap-2">
              <input
                type="radio"
                name="visibility"
                id="private"
                value="private"
              />
              <label
                htmlFor="private"
                className="font-body text-title_3 font-medium text-black"
              >
                Private
              </label>
            </div>
          </div>

          <div className="mt-4 font-body text-title_3 text-[#000000]/60 max-w-[498px]">
            *Public - everyone can view your response and contact. *Private -
            only the user with the request can get to see your response and
            contact you if desired
          </div>
        </div>
      </div>

      <div className="mt-6 md:mt-4 p-5 md:px-4 md:py-6 bg-white">
        <div className="font-head font-bold text-headline_3 text-secondary">
          Others
        </div>

        <div className="font-body font-medium text-title_2 mt-4 text-[#000000]">
          Delete Account
        </div>

        <div className="font-body font-medium text-title_2 mt-4 text-[#000000]">
          Email Notification on Preferred Feeds
        </div>

        <div className="font-body font-medium text-title_2 mt-4 text-[#000000]">
          Write Us Feedback
        </div>
      </div>
    </main>
  );
};

export default SettingsPage;
