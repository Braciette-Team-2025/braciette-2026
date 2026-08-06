import Image from "next/image";
import Link from "next/link";
import { Button } from "../../components/Button";

export default function ExceptionContent() {
  return (
    <div className="p-18 bg-blue-800 w-fit shadow-[0_0_40px_rgba(255,214,133,0.16)] rounded-3xl">
      <div className="flex flex-col gap-10 items-center justify-center">
        <div className="flex flex-col gap-10 items-center justify-center">
          <Image
            src="/images/logo/braciate-logo.svg"
            alt="Braciate Logo"
            width={120}
            height={120}
          />
          <h1 className="font-sloop text-8xl text-yellow-300 drop-shadow-[0_0_40px_rgba(218,161,17,1)]">
            T <span className="font-the-seasons text-6xl">erjadi</span> M
            <span className="font-the-seasons text-6xl">asalah</span>
          </h1>
          <p className="text-center text-xl text-blue-100 font-semibold">
            Pastikan email Anda menggunakan domain
            <br />
            <span className="text-yellow-500">student.ub.ac.id.</span>
          </p>
        </div>
        <div className="flex bg-blue-900 rounded-[8px] overflow-hidden w-full shadow-lg">
          <div className="w-1.5 bg-yellow-500 shrink-0"></div>
          <div className="px-10 py-5">
            <p className="text-blue-50 text-xl font-semibold">
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
      </div>
    </div>
  );
}
