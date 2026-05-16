export default function Loading() {
  return (
    <div className="min-h-screen bg-[#F4F4F4] pt-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="h-12 bg-[#E2E8F0] rounded-sm w-64 mb-8 animate-pulse" />
        <div className="h-48 bg-white rounded-sm border-b-4 border-[#E2E8F0] p-6 mb-6">
          <div className="h-8 bg-[#E2E8F0] rounded-sm w-1/3 mb-4" />
          <div className="h-4 bg-[#E2E8F0] rounded-sm w-2/3" />
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white rounded-sm border-b-4 border-[#E2E8F0]">
              <div className="h-40 bg-[#E2E8F0] animate-pulse" />
              <div className="p-6">
                <div className="h-6 bg-[#E2E8F0] rounded-sm w-3/4 mb-3" />
                <div className="h-4 bg-[#E2E8F0] rounded-sm w-full mb-2" />
                <div className="h-4 bg-[#E2E8F0] rounded-sm w-2/3" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}