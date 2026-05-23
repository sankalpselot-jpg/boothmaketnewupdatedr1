export default function Loading() {
  return (
    <div className="min-h-screen bg-cream flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-2 border-gold border-t-transparent rounded-full animate-spin"/>
        <p className="text-[#6B6B6B] text-sm">Loading...</p>
      </div>
    </div>
  )
}
