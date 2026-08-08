import { Input } from "../../components/AuthInput";
import { Button } from "../../components/AuthButton";

export default function LoginForm() {
  return (
    <form className="flex flex-col gap-5 md:gap-8 w-full sm:w-[516px]">
      <div className="flex flex-col gap-2">
        <label
          htmlFor="username"
          className="text-yellow-500 text-sm md:text-md font-semibold"
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
          className="text-yellow-500 text-sm md:text-md font-semibold"
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
  );
}
