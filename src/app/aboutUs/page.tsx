import React from "react";

type Props = {};

const AboutUsPage = (props: Props) => {
  return (
    <main className="bg-white px-5 md:px-[168px] md:mx-[100px] md:mt-10 md:py-10 mb-10 md:mb-20 flex flex-col items-center justify-center">
      <div className="bg-[#48466D] font-headline text-headline_2 font-bold w-fit text-white">
        About Us
      </div>

      {/* Welcome to AskCenta! */}
      <div className="mt-6 flex flex-col items-start gap-4 w-full">
        <div className="font-headline text-headline_3 font-bold text-[#2E2775]">
          Welcome to AskCenta!
        </div>

        <div className="flex flex-col gap-6">
          <p className="font-body text-body_1 text-black">
            At AskCenta, we&apos;ve created a unique platform that connects a vibrant
            community of users, enabling them to request and find a wide range
            of products, services, jobs, and accommodations. Our mission is to
            facilitate meaningful interactions and empower individuals by
            tapping into the collective knowledge and expertise of our diverse
            user base.
          </p>

          <p className="font-body text-body_1 text-black">
            At the core of AskCenta is the belief that the power of community
            can unlock endless possibilities. We provide a platform where users
            can confidently ask for what they need, and fellow community
            members, equipped with their valuable products and services, step
            forward to provide helpful responses. Whether you&apos;re seeking a
            specialized service, searching for a rare product, looking for job
            opportunities, or hunting for the perfect accommodation, AskCenta is
            your go-to platform.
          </p>
        </div>
      </div>

      {/* Here's how AskCenta works: */}
      <div className="mt-6 flex flex-col items-start gap-4 w-full">
        <div className="font-headline text-headline_3 font-bold text-[#2E2775]">
          Here&apos;s how AskCenta works:
        </div>

        <div className="flex flex-col gap-6">
          <p className="font-body text-body_1 text-black">
            Request: Simply post your request on our platform, detailing your
            specific requirements, preferences, and any other relevant
            information. Be as clear and concise as possible to maximize the
            chances of receiving accurate and tailored responses.
          </p>

          <p className="font-body text-body_1 text-black">
            Community Engagement: Once your request is live, our active
            community of users, driven by their passion to assist and render
            service, will respond with their insights, recommendations, or
            offers. These responses come from our community of users across the
            nation selected.
          </p>

          <p className="font-body text-body_1 text-black">
            Conversation and Finalization: As a requester, you have the freedom
            to engage with the responders on our platform, exchange messages,
            and ask follow-up questions. When you find a response that resonates
            with your needs, you have the option to connect with the responder
            outside of AskCenta to discuss and finalize the details of your
            request. We believe in empowering you to make informed decisions and
            create meaningful connections beyond our platform. 
          </p>
        </div>
      </div>

      {/* Key Features at AskCenta: */}
      <div className="mt-6 flex flex-col items-start gap-4 w-full">
        <div className="font-headline text-headline_3 font-bold text-[#2E2775]">
          Key Features at AskCenta:
        </div>

        <div className="flex flex-col gap-6">
          <p className="font-body text-body_1 text-black">
            Request for Quote: Our platform caters to a diverse array of needs,
            whether it&apos;s finding a specialized service, unique products, job
            opportunities, or accommodation solutions. No matter what you&apos;re
            looking for, AskCenta is here to help you connect with the right
            people with competitive offers.
          </p>

          <p className="font-body text-body_1 text-black">
            Match Buyers Needs: Thousands of requests are made on a daily basis,
            browse through the category of service or product you sell and to
            see what people are actually looking for. Respond to these requests
            if you render the service or product at no cost, hence drive more
            customers for your business.
          </p>

          <p className="font-body text-body_1 text-black">
            Get It Around You: When proximity seems to be a barrier in attaining
            the actual product or service you want. Our platform allows you the
            ability to place a request and specify the location you need it,
            Users with relevant offers in that locality will respond to your
            need.
          </p>

          <p className="font-body text-body_1 text-black">
            Active and Supportive Community: Our vibrant community of users is
            filled with individuals who are passionate about sharing their
            knowledge and expertise. They are committed to helping you find the
            best possible solutions, drawing from their own experiences and
            insights.
          </p>

          <p className="font-body text-body_1 text-black">
            Freedom and Flexibility: We believe in giving you the freedom to
            communicate with respondents outside of AskCenta to finalize the
            details of your request. This flexibility allows for more
            personalized interactions and greater efficiency in finding the
            perfect fit for your needs.
          </p>

          <p className="font-body text-body_1 text-black">
            At AskCenta, we are dedicated to providing a seamless and
            user-friendly experience. Our team is constantly working behind the
            scenes to enhance our platform, improve functionality, and listen to
            your feedback. We strive to create an environment where every user
            feels valued and supported throughout their journey with us.
          </p>

          <p className="font-body text-body_1 text-black">
            Join our ever-growing community of enthusiastic individuals who
            believe in the power of collaboration and connection. Discover the
            limitless potential that AskCenta offers and let us help you find
            the answers you seek.
          </p>

          <p className="font-body text-body_1 text-black">
            Remember, at AskCenta, the possibilities are endless.
          </p>
        </div>
      </div>

      {/* Contact Us: */}
      <div className="mt-6 flex flex-col items-start gap-4 w-full">
        <div className="font-headline text-headline_3 font-bold text-[#2E2775]">
          Contact Us:
        </div>

        <div className="flex flex-col gap-6 w-full">
          <p className="font-body text-body_1 text-black">
            If you have any questions, suggestions or want to partner with us,
            please contact us:
          </p>

          <div className="flex flex-col gap-2 w-full">
            <p className="font-body text-body_1 text-black">By email: </p>
            <p className="font-body text-body_1 text-black">By phone:</p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AboutUsPage;
