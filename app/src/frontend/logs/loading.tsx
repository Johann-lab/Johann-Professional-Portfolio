export default function Loading() {
  return (
    <div className="min-h-screen bg-[#F4F4F4] pt-24 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="h-12 bg-[#E2E8F0] rounded-sm w-64 mb-8 animate-pulse" />
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="bg-white rounded-sm border-b-4 border-[#E2E8F0] p-6"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#E2E8F0] rounded-sm animate-pulse" />
                <div className="flex-1">
                  <div className="h-6 bg-[#E2E8F0] rounded-sm w-1/2 mb-2" />
                  <div className="h-4 bg-[#E2E8F0] rounded-sm w-1/3" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}