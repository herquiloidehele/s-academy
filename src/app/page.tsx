import HomePageContent from "@/app/home-content/HomePageContent";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <main className={`flex mx-auto w-full`}>
      <HomePageContent />
    </main>
  );
}
