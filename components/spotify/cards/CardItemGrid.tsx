interface Props {
  children: React.ReactNode;
}

export default function CardItemGrid({ children }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-6 shadow-4xl">
      {children}
    </div>
  );
}
