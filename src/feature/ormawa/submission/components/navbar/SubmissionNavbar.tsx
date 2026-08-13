import NavbarLogo from "./NavbarLogo";
import LogoutButton from "./LogoutButton";

export default function SubmissionNavbar() {
  return (
    <header className="w-full flex justify-center bg-blue-900 shadow-[4px_0_40px_0_#C9A22766] sticky top-0 z-50">
      <nav className="w-full flex items-center justify-between px-6 lg:px-[100px] py-[28px]">
        <NavbarLogo />
        <LogoutButton />
      </nav>
    </header>
  );
}
