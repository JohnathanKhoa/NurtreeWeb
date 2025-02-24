interface Props {
  children: React.ReactNode;
}

export default function CardItemGrid({ children }: Props) {
  return <div className="grid items-stretch md:grid-cols-5 grid-cols-2 gap-6">{children}</div>;
}
