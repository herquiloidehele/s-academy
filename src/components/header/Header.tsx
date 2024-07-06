import HeaderComponent from "@/components/header/HeaderComponent";
import AuthManager from "@/app/business/auth/AuthManager";

interface HeaderProps {
  solidBg?: boolean;
}
export default async function Header(props: HeaderProps) {
  const user = await AuthManager.getAuthUser();

  return <HeaderComponent solidBg={props.solidBg} user={user} />;
}
