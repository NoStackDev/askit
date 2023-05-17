import Navbar from "@/components/Navbar";
import Searchbox from "@/components/Searchbox";

export default function Home() {
  return (
    <main className="">
      <Navbar />
      <div className="mx-5 my-6">
        <Searchbox className="md:hidden" />
      </div>
    </main>
  );
}
