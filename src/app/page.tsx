import Advertisements from "@/components/Advertisements";
import DealsCard from "@/components/DealsCard";
import Navbar from "@/components/Navbar";
import Searchbox from "@/components/Searchbox";
import Sidebar from "@/components/Sidebar";
import Image from "next/image";

export default function Home() {
  return (
    <main className="">
      <Navbar className="sticky top-0" />

      <div className="relative flex md:px-[100px]">
        <div className="absolute md:relative -translate-x-full md:translate-x-0 md:mt-14">
          <Sidebar />
          <Advertisements className="hidden md:flex">
            <div className="flex flex-col gap-1">
              <Image
                src="/images/pictures/cocacola.png"
                height={228}
                width={255}
                alt="advert"
              />
              <span className="self-start font-inter text-[12px] text-[#000000] opacity-50">
                Sponsored
              </span>
            </div>

            <div className="flex flex-col gap-1">
              <Image
                src="/images/pictures/yumyum.png"
                height={228}
                width={255}
                alt="advert"
              />
              <span className="self-start font-inter text-[12px] text-[#000000] opacity-50">
                Sponsored
              </span>
            </div>
          </Advertisements>
        </div>

        <div className="mx-5 my-6 w-full">
          <Searchbox className="md:hidden" />

          <DealsCard className="md:hidden mt-5">
            <Image
              src="/images/pictures/deals.png"
              width={352}
              height={113}
              alt="deals"
            />
          </DealsCard>
        </div>
      </div>
    </main>
  );
}
