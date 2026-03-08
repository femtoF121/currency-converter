import { Card } from "@/components/ui/card";
import { ConvertorContent } from "./ConverterContent";
import { ConverterHeader } from "./ConverterHeader";

export const Converter = () => {
  return (
    <Card className="shadow-2xl w-full max-w-xl">
      <div className="h-2 bg-linear-to-r from-emerald-500 to-amber-200" />
      <ConverterHeader />
      <ConvertorContent />
    </Card>
  );
};
