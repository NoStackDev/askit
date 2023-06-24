import React from "react";
import * as FormPrimitive from "@radix-ui/react-form";
import Topbar from "@/components/Topbar";
import Image from "next/image";
import Button from "@/components/ui/Button";

type Props = {};

const OnboardPage = (props: Props) => {
  return (
    <main className="mt-4 md:mt-10 md:mx-[100px] bg-white md:bg-background flex justify-center items-center mb-10 md:mb-20">
      <div className="max-w-[700px] bg-white">
        <Topbar className="">Setup your profile</Topbar>

        <div className="flex flex-col justify-center items-center px-5 md:px-[92px]">
          <div className="mt-6 md:mt-6 text-primary font-body text-title_2 md:text-title_1 font-medium">
            Hi Username, Nice to have you onboard!
          </div>

          <div className="mt-4 font-body text-body_2 text-center">
            If you hope to be responding to people’s request, its needful you
            set up your profile to prove your credibility to potential client.
          </div>

          <div className="flex flex-col justify-center items-center mt-6 md:mt-10 gap-2">
            <div className="font-body font-medium text-title_3 text-[#000000]">
              Profile Picture
            </div>

            <div className="border rounded-full border-stroke p-5">
              <Image
                src="/images/icons/person.png"
                height={40}
                width={40}
                alt="profile pic"
                className="hover:cursor-pointer"
              />
            </div>

            <div className="font-body text-special font-light">
              JPeg or PNG file only
            </div>
          </div>

          <div className="mt-4 md:mt-8 flex flex-col w-full gap-1 m">
            <div className="font-body font-medium text-title_3 text-black self-start">
              What do you do?
            </div>

            <textarea
              name=""
              id=""
              rows={5}
              placeholder="Write here..."
              className="font-body text-body_1 placeholder:font-body placeholder:text-body_1 placeholder:opacity-60 border border-[#B7B9BC] rounded-lg py-4 px-3"
            />
          </div>

          <div className="mt-6 md:mt-8 flex flex-col md:flex-row w-full gap-6 md:gap-5">
            <div className="w-full">
              <div className="font-body font-medium text-title_3 text-black self-start">
                Your Location
              </div>

              <select name="" id="" className="w-full">
                <option value="PH">PH </option>
                <option value="Lagos">Lagos </option>
                <option value="Abuja">Abuja </option>
                <option value="Kano">Kano</option>
              </select>
            </div>

            <div className="w-full">
              <div className="font-body font-medium text-title_3 text-black self-start">
                Business Address
              </div>

              <textarea
                name=""
                id=""
                rows={4}
                placeholder="Enter address..."
                className="w-full font-body text-body_1 placeholder:font-body placeholder:text-body_1 placeholder:opacity-60 border border-[#B7B9BC] rounded-lg py-4 px-3"
              />
            </div>
          </div>

          <div className="mt-8 md:mt-7 w-full">
            <div className="font-body text-title_3 font-medium text-black">
              Social Media Links
            </div>

            <div className="mt-2 w-full flex flex-col gap-3">
              <div className="px-3 py-[6px] bg-background flex w-full justify-between border border-[#D9D9D9] rounded-lg">
                <div className="">
                  <div></div>
                  <input
                    type="text"
                    className="font-body text-body_3 w-full bg-background placeholder:text-secondary"
                    placeholder=" Copy your Facebook link and Paste here!"
                  />
                </div>

                <Image
                  src="/images/icons/content_paste.png"
                  height={20}
                  width={20}
                  alt="copy content"
                  className="hover:cursor-pointer"
                />
              </div>

              <div className="px-3 py-[6px] bg-background flex w-full justify-between border border-[#D9D9D9] rounded-lg">
                <div className="">
                  <div></div>
                  <input
                    type="text"
                    className="font-body text-body_3 w-full bg-background placeholder:text-secondary"
                    placeholder="Copy your Instagram link and paste here!"
                  />
                </div>

                <Image
                  src="/images/icons/content_paste.png"
                  height={20}
                  width={20}
                  alt="copy content"
                  className="hover:cursor-pointer"
                />
              </div>

              <div className="px-3 py-[6px] bg-background flex w-full border border-[#D9D9D9] rounded-lg">
                <div className="w-full">
                  <div></div>
                  <input
                    type="text"
                    className="font-body text-body_3 w-full bg-background placeholder:text-secondary"
                    placeholder="Type in your WhatsApp ID (WhatsApp number)"
                  />
                </div>
              </div>
            </div>
          </div>

          <Button className="mt-8 w-full max-w-[225px] rounded-[14px] py-2">
            Save and continue
          </Button>

          <div className="font-body text-secondary text-body_1 mt-10 md:mt-6">
            © 2023 Askit. All Rights Reserved.
          </div>
        </div>
      </div>
    </main>
  );
};

export default OnboardPage;
