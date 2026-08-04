import { StatisticProps } from "../../types/statistic";

export default function Statistic({ cards }: StatisticProps) {
  return (
    <div className="flex justify-between">
      {cards.map((item) => {
        const Icon = item.icon;
        return (
          <div
            key={item.id}
            className="flex border border-[#A6A6A6] rounded-[12px] h-[132px] space-x-4 p-7 items-center"
          >
            <div className=" bg-[#E0E0E0] rounded-[8px] p-3">
              <Icon className="text-[#8A8A8A] text-[24px]" />
            </div>
            <div>
              <h1 className="text-[14px] text-[#434343] font-medium text-wrap">
                jumlah
              </h1>
              <h1 className="text-[14px] text-[#434343] font-medium text-wrap">
                {item.label}
              </h1>
              <p className="text-[24px] text-[#676767] font-bold">
                {item.value}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
