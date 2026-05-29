// app/loading.tsx
export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      {/* يمكنك وضع Spinner من مكتبة مثل lucide-react أو SVG بسيط */}
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-green-700 font-bold text-xl animate-pulse">Loading...</p>
      </div>
    </div>
  );
}