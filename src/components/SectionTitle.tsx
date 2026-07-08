export default function SectionTitle({
  children,
  sub,
}: {
  children: React.ReactNode;
  sub?: string;
}) {
  return (
    <div className="mb-8 text-center">
      <h2 className="font-heading text-3xl font-bold text-brand">{children}</h2>
      {sub && <p className="mx-auto mt-2 max-w-xl opacity-80">{sub}</p>}
    </div>
  );
}
