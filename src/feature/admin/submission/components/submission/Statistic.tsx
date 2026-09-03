import { StatisticProps } from "../../types/statistic";

export default function Statistic({ cards }: StatisticProps) {
  return (
    <div className="flex justify-between">
      {cards.map((item) => {
        const Icon = item.icon;
        return (
          <div
            key={item.id}
            className="flex border-2 border-yellow-500 bg-yellow-100 rounded-[12px] h-[132px] space-x-4 p-7 items-center"
          >
            <div className=" border-2 border-blue-900 p600 rounded-[8px] p-3">
              <Icon className="text-blue-900 text-[24px]" />
            </div>
            <div>
              <h1 className="text-[14px] text-blue-900 font-medium text-wrap">
                jumlah
              </h1>
              <h1 className="text-[14px] text-blue-900 font-medium text-wrap">
                {item.label}
              </h1>
              <p className="text-[24px] text-blue-900 font-bold">
                {item.value}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
