export default function Loading() {
  return (
    <div className="min-h-screen bg-[#F4F4F4] flex items-center justify-center">
      <div className="text-center">
        <div className="w-20 h-20 bg-[#FFCF00] border-4 border-[#CC9A00] rounded-sm flex items-center justify-center mx-auto mb-4 animate-pulse">
          <span className="text-4xl">🧱</span>
        </div>
        <p className="text-[#4A5568] font-bold text-lg">Loading...</p>
      </div>
    </div>
  );
}