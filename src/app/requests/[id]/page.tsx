import RequestImgDetail from "./section/RequestImgDetail";
import Topbar from "../../../components/Topbar";
import Responses from "./section/Responses";
import Button from "@/components/ui/Button";
import RequestResponseForm from "@/components/RequestResponseForm";

export default function RequestPage() {
  return (
    <div className="bg-background md:py-14 md:px-[100px] mb-20">
      <div className="md:grid md:grid-cols-[67%_33%] md:gap-5">
        <div>
          <Topbar>Fashion</Topbar>
          <RequestImgDetail />
          <div className="flex items-center justify-center h-fit w-full">
            <Button className="md:hidden w-4/5 mt-8">Respond to Request</Button>
          </div>
          <Responses className="mt-8 md:mt-14 mx-[20px] md:mx-0" />
        </div>

        <div className="hidden md:block">
          <RequestResponseForm />
        </div>
      </div>
    </div>
  );
}
