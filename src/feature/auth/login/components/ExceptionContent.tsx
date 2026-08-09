import Link from "next/link";
import { Button } from "../../components/AuthButton";

export default function ExceptionContent() {
  return (
    <>
      <div className="flex bg-blue-900 rounded-[8px] overflow-hidden w-full shadow-lg">
        <div className="w-1 md:w-1.5 bg-yellow-500 shrink-0"></div>
        <div className="px-4 py-6 md:px-10 md:py-5">
          <p className="text-blue-50 text-sm md:text-md font-semibold">
            Jika ini adalah kesalahan, silakan hubungi
            <br />
            Unit Layanan TIK (ULTIK) UB
            <br />
            melalui{" "}
            <Link
              href="mailto:helpdesk-tik@ub.ac.id"
              className="underline underline-offset-4 text-white hover:text-yellow-300 transition-colors"
            >
              helpdesk-tik@ub.ac.id
            </Link>
            .
          </p>
        </div>
      </div>
      <div className="flex w-full justify-center">
        <Button>Keluar</Button>
      </div>
    </>
  );
}
