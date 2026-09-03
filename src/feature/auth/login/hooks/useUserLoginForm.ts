import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../../store/authStore";
import { getAuthErrorMessage } from "../../utils/authErrorHandler";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD_LENGTH = 6;

interface FieldErrors {
  email?: string;
  password?: string;
}

export const useUserLoginForm = () => {
  const router = useRouter();

  const login = useAuthStore((state) => state.login);
  const isLoading = useAuthStore((state) => state.isLoading);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isInitialized = useAuthStore((state) => state.isInitialized);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [serverError, setServerError] = useState<string | null>(null);

  useEffect(() => {
    if (isInitialized && isAuthenticated) {
      router.replace("/profile");
    }
  }, [isInitialized, isAuthenticated, router]);

  const validate = (): boolean => {
    const errors: FieldErrors = {};

    if (!email.trim()) {
      errors.email = "Email wajib diisi.";
    } else if (!EMAIL_REGEX.test(email.trim())) {
      errors.email = "Format email tidak valid.";
    }

    if (!password) {
      errors.password = "Password wajib diisi.";
    } else if (password.length < MIN_PASSWORD_LENGTH) {
      errors.password = `Password minimal ${MIN_PASSWORD_LENGTH} karakter.`;
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    if (!validate()) return;

    try {
      await login({ email: email.trim(), password });
      router.push("/profile");
    } catch (err: unknown) {
      setServerError(getAuthErrorMessage(err));
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    fieldErrors,
    serverError,
    isLoading,
    isCheckingSession: !isInitialized || isAuthenticated,
    handleSubmit,
  };
};
