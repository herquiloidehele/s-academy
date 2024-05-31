import AppLogo from "@/assets/icons/logo.svg";

export default function Footer() {
  return (
    <div className="w-full py-20 px-10 bg-white">
      <div className="max-w-[1300px] mx-auto">
        <div className={"flex justify-center flex-col items-center "}>
          <AppLogo className="h-7 w-auto" />
          <p className={"text-gray-500 mt-3 text-sm"}>
            © {new Date().getFullYear()} . Todos Direitos reservados. <br />
          </p>
        </div>
      </div>
    </div>
  );
}
