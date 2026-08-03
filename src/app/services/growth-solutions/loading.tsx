export default function Loading() {
  return (
    <div className="fixed inset-0 bg-[#030305] z-50 flex items-center justify-center">
      <div className="flex flex-col items-center gap-6">
        {/* Logo */}
        <span className="text-white font-black text-2xl tracking-tighter">XENOTECT</span>
        {/* Animated progress bar */}
        <div className="w-48 h-[2px] bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-white rounded-full"
            style={{
              animation: "loadBar 1.2s ease-in-out infinite",
              width: "40%",
            }}
          />
        </div>
      </div>
      <style>{`
        @keyframes loadBar {
          0%   { transform: translateX(-120%); }
          100% { transform: translateX(400%); }
        }
      `}</style>
    </div>
  );
}
