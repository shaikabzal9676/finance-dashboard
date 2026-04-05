export default function Card({ children, className = "" }) {
  return (
    <div
      className={`
        bg-white/10 backdrop-blur-lg 
        border border-white/10 
        rounded-2xl p-5 
        shadow-xl 
        transition-all duration-300 hover:scale-[1.02]
        ${className}
      `}
    >
      {children}
    </div>
  );
}