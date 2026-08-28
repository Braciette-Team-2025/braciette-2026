import axios from "axios";

export const getAuthErrorMessage = (err: unknown): string => {
  if (axios.isAxiosError(err)) {
    const status = err.response?.status;
    const beMessage = err.response?.data?.message;

    if (status === 400) {
      if (beMessage === "email and password are required") {
        return "Email dan password wajib diisi!";
      }
      return beMessage || "Format input tidak valid!";
    }
    if (status === 401) return "Email atau password salah. Silakan coba lagi.";
    if (status === 402 || status === 403)
      return "Akun belum aktif. Silakan cek email Anda untuk verifikasi.";

    return (
      beMessage || "Terjadi kesalahan pada server. Silakan coba lagi nanti."
    );
  }

  return err instanceof Error
    ? err.message
    : "Terjadi kesalahan yang tidak terduga.";
};
