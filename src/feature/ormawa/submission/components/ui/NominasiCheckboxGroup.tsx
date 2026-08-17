import { Checkbox } from "./Checkbox";
import { RequiredFilesInfo } from "./RequiredFilesInfo";

export interface NominasiCheckboxGroupProps {
  nominasiList: string[];
  nominationsRecord: Record<string, string[]>;
  selectedNominasi: string[];
  onChange: (selected: string[]) => void;
}

export function NominasiCheckboxGroup({
  nominasiList,
  nominationsRecord,
  selectedNominasi,
  onChange,
}: NominasiCheckboxGroupProps) {
  return (
    <div className="flex flex-col gap-4">
      {nominasiList.map((nominasi) => {
        const isChecked = selectedNominasi.includes(nominasi);
        return (
          <div key={nominasi} className="flex flex-col gap-2">
            <Checkbox
              label={nominasi}
              checked={isChecked}
              onChange={(e) =>
                onChange(
                  e.target.checked
                    ? [...selectedNominasi, nominasi]
                    : selectedNominasi.filter((n) => n !== nominasi),
                )
              }
            />
            <RequiredFilesInfo
              isVisible={isChecked}
              requiredFiles={nominationsRecord[nominasi] || []}
            />
          </div>
        );
      })}
    </div>
  );
}
