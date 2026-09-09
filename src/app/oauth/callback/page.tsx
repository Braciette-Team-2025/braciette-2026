/**
 * Route /oauth/callback tidak lagi digunakan sejak migrasi ke Firebase OAuth.
 * Flow baru: Firebase popup → id_token → POST /api/v1/auth/google (inline, tanpa redirect).
 *
 * Halaman ini dipertahankan untuk kompatibilitas backward dengan link lama,
 * dan akan redirect ke /login jika ada yang mengaksesnya.
 */
import { redirect } from "next/navigation";

export default function OAuthCallbackPage() {
  redirect("/login");
}
