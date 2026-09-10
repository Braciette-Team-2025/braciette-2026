"use client";

/**
 * Skeleton yang meniru layout ProfileCard + ProfileMenu + LogoutButton
 * saat data /me sedang di-fetch.
 *
 * Gunakan di ProfileContainer ketika isLoading === true agar tidak ada
 * layout shift (card tidak tiba-tiba menghilang / muncul teks "Memuat...").
 */
export function ProfileCardSkeleton() {
  return (
    <div className="relative z-10 mx-auto flex w-[535px] max-w-[calc(100vw-32px)] flex-col gap-4 animate-pulse">
      {/* ── ProfileCard skeleton ── */}
      <div className="relative z-10 flex w-full flex-col items-center">
        {/* Avatar circle */}
        <div
          className="relative z-20 -mb-[60px] rounded-full border-4 border-yellow-500/40 bg-blue-900/40"
          style={{ width: 190, height: 190 }}
        />

        {/* Card body */}
        <div className="w-full rounded-2xl bg-yellow-500/30 px-8 pb-8 pt-[72px] text-center shadow-[0_0_75px_-6px_rgba(201,162,39,0.3)]">
          {/* Name */}
          <div className="mx-auto mb-4 h-8 w-48 rounded-lg bg-yellow-500/40 md:h-10 md:w-64" />
          {/* Email */}
          <div className="mx-auto h-5 w-56 rounded-lg bg-yellow-500/30" />
        </div>
      </div>

      {/* ── ProfileMenu skeleton (2 item) ── */}
      <div className="relative z-10 flex w-full flex-col gap-4">
        {[0, 1].map((i) => (
          <div
            key={i}
            className="flex w-full items-center justify-between rounded-xl bg-slate-100/60 px-5 py-4"
          >
            {/* Icon + label */}
            <span className="flex items-center gap-3">
              <div className="h-5 w-5 rounded-md bg-slate-300/70" />
              <div className="h-4 w-32 rounded-md bg-slate-300/70" />
            </span>
            {/* Chevron */}
            <div className="h-5 w-5 rounded-md bg-slate-300/50" />
          </div>
        ))}
      </div>

      {/* ── LogoutButton skeleton ── */}
      <div className="h-12 w-full rounded-xl bg-slate-100/60" />
    </div>
  );
}
