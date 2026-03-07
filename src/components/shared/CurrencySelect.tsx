import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Currency, CurrencyCode } from "@/types/currency";
import { Select as SelectPrimitive } from "radix-ui";

interface CurrencySelectProps extends React.ComponentProps<
  typeof SelectPrimitive.Root
> {
  items: Currency[];
  onValueChange: (value: CurrencyCode) => void;
}

export function CurrencySelect({
  items,
  onValueChange,
  ...props
}: CurrencySelectProps) {
  return (
    <Select
      {...props}
      onValueChange={(value: string) => onValueChange(value as CurrencyCode)}
    >
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {items.map(({ code, symbol, name }) => (
          <SelectItem
            key={code}
            value={code}
            className="focus:bg-emerald-50 focus:text-emerald-700 cursor-pointer"
          >
            <span className="font-bold">
              {symbol} {code}
            </span>
            <span className="text-slate-500 font-medium">- {name}</span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
