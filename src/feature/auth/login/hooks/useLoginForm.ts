import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../hooks/useAuth";
import { getAuthErrorMessage } from "../../utils/authErrorHandler";

export const useLoginForm = () => {
  const router = useRouter();
  const { loginOrmawa, isLoading } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      await loginOrmawa({ email, password });
      router.push("/submission");
    } catch (err: unknown) {
      setError(getAuthErrorMessage(err));
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    error,
    isLoading,
    handleSubmit,
  };
};
