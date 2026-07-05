import { LucideIcon } from "lucide-react";

export default function Statistic() {
  interface PerformanceCard {
    id: number;
    label: string;
    value: number;
    icon?: LucideIcon;
  }

  const PerformanceCards: PerformanceCard[] = [
    {
      id: 1,
      label: "Jumlah Ormawa",
      value: 1284,
    },
    {
      id: 2,
      label: "Jumlah BEM",
      value: 760,
    },
    {
      id: 3,
      label: "Jumlah DPM",
      value: 130,
    },
    {
      id: 4,
      label: "Jumlah HIMA",
      value: 590,
    },
    {
      id: 5,
      label: "Jumlah Ormawa",
      value: 899,
    },
  ];

  return (
    <div className="flex justify-between">
      {PerformanceCards.map((item) => {
        return (
          <div
            key={item.id}
            className="flex border text-gray-600 border-gray-400 rounded-[12px] h-[132px] space-x-4 px-4 py-7 items-center"
          >
            <div className="w-9 h-9 bg-gray-300 rounded-[8px]"></div>
            <div className="">
              <h1 className="text-[14px] font-medium text-wrap">
                {item.label}
              </h1>
              <p className="text-[24px] font-bold">{item.value}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
