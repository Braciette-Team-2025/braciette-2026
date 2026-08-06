import Image from "next/image";
import Link from "next/link";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";

export default function LoginForm() {
  return (
    <div className="p-15 bg-blue-800 w-fit shadow-[0_0_40px_rgba(255,214,133,0.16)] rounded-3xl">
      <div className="flex flex-col gap-10 items-center justify-center">
        <div className="flex flex-col gap-10 items-center justify-center">
          <Image
            src="/images/logo/braciate-logo.svg"
            alt="Braciate Logo"
            width={120}
            height={120}
          />
          <div className="space-x-5">
            <h1 className="font-sloop text-8xl text-yellow-300 drop-shadow-[0_0_40px_rgba(218,161,17,1)]">
              L<span className="font-the-seasons text-6xl">ogin</span> O
              <span className="font-the-seasons text-6xl">rmawa</span>
            </h1>
            <p className="text-center text-xl text-blue-100 font-semibold">
              Masuk sebagai ormawa menggunakan akun
              <br />
              yang telah disediakan
            </p>
          </div>
        </div>
        <form className="flex flex-col gap-8 w-full sm:w-[516px]">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="username"
              className="text-yellow-500 text-md font-semibold"
            >
              Username / Email
            </label>
            <Input
              id="username"
              placeholder="Masukkan Username / Email kamu disini"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="password"
              className="text-yellow-500 text-md font-semibold"
            >
              Password
            </label>
            <Input
              id="password"
              type="password"
              placeholder="Masukkan NIM kamu disini"
            />
          </div>
          <div className="w-full flex justify-center">
            <Button className="w-fit">Konfirmasi</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
