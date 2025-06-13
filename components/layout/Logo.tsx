import Image from "next/image";
import clsx from "clsx";

type LogoProps = {
  compact?: boolean;  // Parámetro opcional
};

export default function Logo({ compact }: LogoProps) {
  return (
    <div className={clsx(
      "p-3 border-b border-white/20",
      compact ? "px-2" : "px-4"  // Ajuste de padding
    )}>
      <div className={clsx(
        "relative transition-all duration-300",
        compact ? "w-10 h-10" : "w-12 h-12"  // Dos tamaños posibles
      )}>
        <Image
          src="/images/logoLogin.png"
          alt="Logo de la App"
          fill  // Usamos fill en lugar de width/height
          className="object-contain"
          priority
        />
      </div>
      
      {/* Texto opcional (para versión desktop expandida) */}
      {!compact && (
        <p className="mt-2 text-center text-white text-xs font-medium hidden md:block">
          Dashky 
        </p>
      )}
    </div>
  );
}