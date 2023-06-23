"use client";

import Accordion from "@/components/Accordion";
import { faqsConfig } from "@/config.ts/faqs";
import React from "react";

type Props = {};

const FAQsPage = (props: Props) => {
  return (
    <main className="bg-white px-5 md:px-[168px] md:mx-[100px] md:mt-10 md:py-10 mb-10 md:mb-20 flex flex-col items-center justify-center">
      <div className="bg-[#48466D] font-headline text-headline_2 font-bold w-fit text-white text-center">
        Frequently Asked Questions
      </div>
      <div className="w-full">
        <Accordion items={faqsConfig} />
      </div>

      <div className="w-full mt-10 font-body text-body_2">
        <p>
          If you have any questions, suggestions or want to partner with us,
          please contact us:
        </p>

        <p className="mt-5"> By email: </p>
        <p>By phone: </p>
      </div>
    </main>
  );
};

export default FAQsPage;
