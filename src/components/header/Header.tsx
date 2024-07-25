import HeaderComponent from "@/components/header/HeaderComponent";
import getAuthUser from "@/app/backend/actions/auth";

interface HeaderProps {
  solidBg?: boolean;
}
export default async function Header(props: HeaderProps) {
  const user = await getAuthUser();

  return <HeaderComponent solidBg={props.solidBg} isAuthenticated={!!user} />;
}
