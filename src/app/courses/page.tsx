import Header from "@/components/header/Header";

export const dynamic = "force-dynamic";

export default async function page() {
  return (
    <div>
      <Header solidBg />
      Course List
    </div>
  );
}
