import HomePageContent from "@/app/home-content/HomePageContent";
import { Constants } from "@/utils/Constants";

export default function Home() {
  return (
    <main className={`flex mx-auto w-full pt-[${Constants.UI.HEADER_HEIGHT}]`}>
      <HomePageContent />
    </main>
  );
}
