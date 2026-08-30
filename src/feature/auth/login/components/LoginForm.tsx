"use client";

import { Input } from "../../components/AuthInput";
import { Button } from "../../components/AuthButton";
import { useLoginForm } from "../hooks/useLoginForm";

export default function LoginForm() {
  const {
    email,
    setEmail,
    password,
    setPassword,
    error,
    isLoading,
    handleSubmit,
  } = useLoginForm();

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-5 md:gap-4 w-full sm:w-[516px]"
    >
      {error && (
        <div className="bg-red-500/10 border border-red-500 text-red-500 text-sm p-3 rounded-md">
          {error}
        </div>
      )}

      <div className="flex flex-col gap-2">
        <label
          htmlFor="username"
          className="text-yellow-500 text-sm md:text-md font-semibold"
        >
          Username / Email
        </label>
        <Input
          id="username"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Masukkan Username / Email kamu disini"
          disabled={isLoading}
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
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Masukkan Password kamu disini"
          disabled={isLoading}
        />
      </div>
      <div className="w-full flex justify-center mt-4">
        <Button type="submit" className="w-fit" disabled={isLoading}>
          {isLoading ? "Memproses..." : "Konfirmasi"}
        </Button>
      </div>
    </form>
  );
}
