import type {
  VotingCategory,
  VotingCategoryId,
  VotingResultItem,
  VotingStatistic,
} from "../types/voting";

export const VOTING_CATEGORIES: VotingCategory[] = [
  {
    id: "bem",
    label: "BEM",
  },
  {
    id: "dpm",
    label: "DPM",
  },
  {
    id: "hima",
    label: "HIMA",
  },
  {
    id: "ukm",
    label: "UKM",
  },
];

export const DEFAULT_VOTING_CATEGORY_ID: VotingCategoryId = "bem";

export const DUMMY_VOTING_ITEMS: Record<VotingCategoryId, VotingResultItem[]> =
  {
    bem: [
      {
        rank: 1,
        id: "bem-1",
        name: "BEM Fakultas Ilmu Komputer",
        totalVote: 100,
      },
      {
        rank: 2,
        id: "bem-2",
        name: "BEM Fakultas Teknik",
        totalVote: 46,
      },
      {
        rank: 3,
        id: "bem-3",
        name: "BEM Fakultas Hukum",
        totalVote: 46,
      },
      {
        rank: 4,
        id: "bem-4",
        name: "BEM Fakultas Pertanian",
        totalVote: 46,
      },
      {
        rank: 5,
        id: "bem-5",
        name: "BEM Fakultas Kedokteran",
        totalVote: 46,
      },
      {
        rank: 6,
        id: "bem-6",
        name: "BEM Fakultas MIPA",
        totalVote: 46,
      },
      {
        rank: 7,
        id: "bem-7",
        name: "BEM Fakultas Peternakan",
        totalVote: 46,
      },
      {
        rank: 8,
        id: "bem-8",
        name: "BEM Fakultas Perikanan",
        totalVote: 46,
      },
      {
        rank: 9,
        id: "bem-9",
        name: "BEM Fakultas Vokasi",
        totalVote: 46,
      },
      {
        rank: 10,
        id: "bem-10",
        name: "BEM Fakultas Ekonomi",
        totalVote: 46,
      },
    ],

    dpm: [
      {
        rank: 1,
        id: "dpm-1",
        name: "DPM FILKOM",
        totalVote: 72,
      },
      {
        rank: 2,
        id: "dpm-2",
        name: "DPM FT",
        totalVote: 60,
      },
      {
        rank: 3,
        id: "dpm-3",
        name: "DPM FH",
        totalVote: 55,
      },
    ],

    hima: [
      {
        rank: 1,
        id: "hima-1",
        name: "HIMA Teknik Informatika",
        totalVote: 98,
      },
      {
        rank: 2,
        id: "hima-2",
        name: "HIMA Sistem Informasi",
        totalVote: 86,
      },
      {
        rank: 3,
        id: "hima-3",
        name: "HIMA Teknologi Informasi",
        totalVote: 74,
      },
    ],

    ukm: [
      {
        rank: 1,
        id: "ukm-1",
        name: "UKM Badminton",
        totalVote: 81,
      },
      {
        rank: 2,
        id: "ukm-2",
        name: "UKM Basket",
        totalVote: 67,
      },
      {
        rank: 3,
        id: "ukm-3",
        name: "UKM Robotik",
        totalVote: 58,
      },
    ],
  };

export const DUMMY_VOTING_STATISTIC: Record<VotingCategoryId, VotingStatistic> =
  {
    bem: {
      totalVoting: 6767,
      bestCandidateName: "BEM Fakultas Ilmu Komputer",
    },
    dpm: {
      totalVoting: 1890,
      bestCandidateName: "DPM FILKOM",
    },
    hima: {
      totalVoting: 2418,
      bestCandidateName: "HIMA Teknik Informatika",
    },
    ukm: {
      totalVoting: 3587,
      bestCandidateName: "UKM Badminton",
    },
  };
