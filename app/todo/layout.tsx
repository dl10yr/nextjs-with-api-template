export default function TodosLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-wrap">
      <div className="w-full">{children}</div>
    </div>
  )
}
