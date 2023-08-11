import React from "react";

type Props = {};

const SafetyHintsPage = (props: Props) => {
  return (
    <main className="bg-white px-5 md:px-[168px] md:mx-[100px] md:mt-10 md:py-10 mb-10 md:mb-20 flex flex-col items-center justify-center">
      <div className="bg-[#48466D] font-headline text-headline_2 font-bold w-fit text-white">
        Safety Hints
      </div>

      <div className="mt-10 md:text-center font-body text-title_2 text-[#000000]">
        Inasmuch as we try to foster a secure community that will be free of
        scam and abuse, we urge you to keep an open eye by adopting these safety
        hints while dealing with people you met on this platform or similar
        ones.
      </div>

      {/* Protect your personal information: */}
      <div className="mt-6 flex flex-col items-start gap-4 w-full">
        <div className="font-headline text-headline_3 font-bold text-[#2E2775]">
          Protect your personal information:
        </div>

        <div className="flex flex-col gap-6">
          <p className="font-body text-body_1 text-black">
            Be cautious about sharing sensitive personal information, such as
            your full name, address, phone number, or financial details, with
            other users. Only share such information in trusted and secure
            environments.
          </p>
        </div>
      </div>

      {/* Verify users and offers: */}
      <div className="mt-6 flex flex-col items-start gap-4 w-full">
        <div className="font-headline text-headline_3 font-bold text-[#2E2775]">
          Verify users and offers:
        </div>

        <div className="flex flex-col gap-6">
          <p className="font-body text-body_1 text-black">
            Before entering into any transactions or agreements with other
            users, take the time to verify their identity and credibility.
            Review their profiles, ratings, and reviews if available. If
            possible, view their profile on their social media handles through
            the link on their profile.
          </p>
        </div>
      </div>

      {/* Meet in safe locations: */}
      <div className="mt-6 flex flex-col items-start gap-4 w-full">
        <div className="font-headline text-headline_3 font-bold text-[#2E2775]">
          Meet in safe locations:
        </div>

        <div className="flex flex-col gap-6">
          <p className="font-body text-body_1 text-black">
            If you plan to meet another user in person, always choose safe and
            public locations. Consider meeting during daylight hours and bring a
            friend or family member with you if possible. Trust your instincts
            and avoid situations that feel uncomfortable or unsafe.
          </p>
        </div>
      </div>

      {/* Exercise caution with financial transactions: */}
      <div className="mt-6 flex flex-col items-start gap-4 w-full">
        <div className="font-headline text-headline_3 font-bold text-[#2E2775]">
          Exercise caution with financial transactions:
        </div>

        <div className="flex flex-col gap-6">
          <p className="font-body text-body_1 text-black">
            If financial transactions are involved, be cautious and use secure
            payment methods or get a receipt for cash payments. Avoid sharing
            sensitive financial information directly with other users unless it
            is necessary and done through secure channels.
          </p>
        </div>
      </div>

      {/* Exercise caution with financial transactions: */}
      <div className="mt-6 flex flex-col items-start gap-4 w-full">
        <div className="font-headline text-headline_3 font-bold text-[#2E2775]">
          Report inappropriate or suspicious activity:
        </div>

        <div className="flex flex-col gap-6">
          <p className="font-body text-body_1 text-black">
            If you encounter any inappropriate, fraudulent, or suspicious
            activity on the platform, report it immediately to the platform&apos;s
            support team. This helps maintain a safe and reliable community for
            all users.
          </p>
        </div>
      </div>

      {/* Be respectful and professional: */}
      <div className="mt-6 flex flex-col items-start gap-4 w-full">
        <div className="font-headline text-headline_3 font-bold text-[#2E2775]">
          Be respectful and professional:
        </div>

        <div className="flex flex-col gap-6">
          <p className="font-body text-body_1 text-black">
            Maintain a respectful and professional tone in your interactions
            with other users. Treat others as you would like to be treated and
            avoid engaging in offensive, discriminatory, or harassing behavior.
          </p>
        </div>
      </div>

      {/* Trust your instincts: */}
      <div className="mt-6 flex flex-col items-start gap-4 w-full">
        <div className="font-headline text-headline_3 font-bold text-[#2E2775]">
          Trust your instincts:
        </div>

        <div className="flex flex-col gap-6">
          <p className="font-body text-body_1 text-black">
            Trust your instincts when engaging with others on the platform. If
            something feels suspicious, too good to be true, or makes you
            uncomfortable, proceed with caution or refrain from engaging
            further.
          </p>
        </div>
      </div>

      {/* Go for close proximity deals when possible: */}
      <div className="mt-6 flex flex-col items-start gap-4 w-full">
        <div className="font-headline text-headline_3 font-bold text-[#2E2775]">
          Go for close proximity deals when possible:
        </div>

        <div className="flex flex-col gap-6">
          <p className="font-body text-body_1 text-black">
            To promote secure interactions, we encourage users to prioritize
            dealing with responders who are closest to them in terms of
            proximity. By selecting responders in close proximity, users can
            benefit from convenient face-to-face meetings, reduced delivery
            times, and increased familiarity with local service providers. When
            engaging with responders nearby, remember to exercise caution, apply
            the general safety hints provided
          </p>
        </div>
      </div>

      <div className="mt-8 font-body text-title_3 font-medium w-full">
        Remember, these safety hints serve as general guidelines, and it&apos;s
        important for users to exercise their own judgment and take personal
        responsibility for their actions and interactions on the platform.
      </div>

      <div className="flex flex-col gap-6 mt-8 w-full">
        <p className="font-body text-body_1 text-black">
          If you have any questions, suggestions or want to partner with us,
          please contact us:
        </p>

        <div className="flex flex-col gap-2 w-full">
          <p className="font-body text-body_1 text-black">By email: </p>
          <p className="font-body text-body_1 text-black">By phone:</p>
        </div>
      </div>
    </main>
  );
};

export default SafetyHintsPage;
