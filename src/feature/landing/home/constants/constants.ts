import { FaqItem, TimelineItem, VotingGuideItem } from "../types/types";

export const FAQ_DATA: FaqItem[] = [
  {
    id: 1,
    title:
      "Apakah setiap akun hanya dapat memberikan satu voting untuk setiap jenis organisasi mahasiswa?",
    desc: "YA, Satu email UB hanya dapat memberikan satu kali vote untuk tiap jenis organisasi mahasiswa.",
  },
  {
    id: 2,
    title:
      "Apakah untuk nominasi most favorite hanya bersumber dari voting website?",
    desc: "Ya, nominasi most favorite akan dihitung sesuai dengan jumlah voting terbanyak yang dilakukan oleh seluruh mahasiswa Universitas Brawijaya.",
  },
  {
    id: 3,
    title: "Apakah akan ada awarding terkait nominasi yang disediakan?",
    desc: "Pasti ada, awarding akan dilaksanakan pada main event Brawijaya Appreciate 2026.",
  },
];

export const TIMELINE_DATA: TimelineItem[] = [
  {
    id: 1,
    title: "Technical Meeting 1",
    date: "7 Sept 2026",
    desc: "Technical Meeting 1 BEM & HIMA",
  },
  {
    id: 2,
    title: "Technical Meeting 2",
    date: "8 Sept 2026",
    desc: "Technical Meeting 2 UKM & DPM",
  },
  {
    id: 3,
    title: "Open Submission",
    date: "9 - 29 Sept 2026",
    desc: "Periode submission dimulai dari tanggal 9 Sept hingga 29 Sept 2026.",
  },
  {
    id: 4,
    title: "Open Voting",
    date: "1 - 22 Okt 2026",
    desc: "Periode voting dimulai dari tanggal 1 Oktober hingga 22 Oktober 2026.",
  },
  {
    id: 5,
    title: "Main Event Braciate 2026",
    date: "23 Okt 2026",
    desc: "Puncak acara Awarding Brawijaya Appreciate 2026",
  },
];

export const VOTE_GUIDE_DATA: VotingGuideItem[] = [
  {
    id: 1,
    desc: "Sign in using your official Universitas Brawijaya Email via Google OAuth",
  },
  {
    id: 2,
    desc: "Navigate to your preferred organization category: BEM, DPM, HIMA, or UKM.",
  },
  {
    id: 3,
    desc: "Select the most deserving candidate and cast your one-time digital vote.",
  },
];
