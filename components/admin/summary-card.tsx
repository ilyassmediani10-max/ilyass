import { Card, CardContent } from "@/components/ui/card";

type IProps = {
  className?: string;
  label: string;
  value: string;
};

export function SummaryCard({ className = "", label, value }: IProps) {
  return (
    <Card className={className}>
      <CardContent>
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="mt-2 text-3xl font-bold tracking-tight text-foreground">{value}</p>
      </CardContent>
    </Card>
  );
}
