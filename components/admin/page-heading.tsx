type IProps = {
  section: string;
  title: string;
};

export function PageHeading({ section, title }: IProps) {
  return (
    <div>
      <p className="text-sm font-medium text-muted-foreground">{section}</p>
      <h1 className="mt-1 text-3xl font-bold tracking-tight">{title}</h1>
    </div>
  );
}
