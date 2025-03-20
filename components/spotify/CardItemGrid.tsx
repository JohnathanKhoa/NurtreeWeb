interface Props {
  children: React.ReactNode;
}

export default function CardItemGrid({ children }: Props) {
  let keycount = 0;
  return (
    <div key={keycount++} className="grid  md:grid-cols-5 grid-cols-1 gap-6">
      {children}
    </div>
  );
}
