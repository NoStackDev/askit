import Advertisements from "@/components/Advertisements";
import CitySelector from "@/components/CitySelector";
import CountrySelector from "@/components/CountrySelector";
import DealsCard from "@/components/DealsCard";
import Navbar from "@/components/Navbar";
import Searchbox from "@/components/Searchbox";
import Sidebar from "@/components/Sidebar";
import Products from "@/section/Products";
import Image from "next/image";

export default function Home() {
  return (
    <main className="">
      <Navbar className="sticky top-0" />

      <div className="relative flex md:gap-[92px] md:px-[100px] md:mb-10">
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

        <div className="mx-5 my-6 mt-[56px] w-full">
          <Searchbox className="md:hidden" />

          <DealsCard className="md:hidden mt-5">
            <Image
              src="/images/pictures/deals.png"
              width={352}
              height={113}
              alt="deals"
            />
          </DealsCard>

          <div className="hidden md:grid grid-cols-[77%_23%] gap-[30px]">
            <div className="bg-[#D1D9DE] rounded-[20px] h-[174px] flex justify-center items-center font-headline text-headline_1 font-bold text-white">
              Latests Requests
            </div>

            <div className="font-inter text-[24px] text-[#000000] flex justify-center items-center text-center bg-[#48466D]">
              Make a Request
            </div>
          </div>

          <div className="mt-10 md:mt-14 flex flex-col md:flex-row md:justify-between md:items-center gap-6">
            <div className="bg-[#48466D] w-fit text-white text-headline_3 md:text-headline_2 font-headline">
              Latest Requests
            </div>

            <div className="border-[1px] border-stroke rounded px-4 flex gap-4 md:w-[229px]">
              <CountrySelector />
              <CitySelector />
            </div>
          </div>

          <Products className="mt-4 md:mt-8" />
        </div>
      </div>
    </main>
  );
}
