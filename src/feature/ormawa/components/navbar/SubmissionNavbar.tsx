import NavbarLogo from "./NavbarLogo";
import LogoutButton from "./LogoutButton";

export default function SubmissionNavbar() {
  return (
    <header className="w-full flex justify-center bg-blue-900 shadow-[4px_0_40px_0_#C9A22766] sticky top-0 z-50">
      <nav className="w-full flex items-center justify-between px-6 py-3 md:px-15 md:py-5 lg:px-25 lg:py-7">
        <NavbarLogo />
        <LogoutButton />
      </nav>
    </header>
  );
}
