import Image from "next/image";
import clsx from "clsx";

type LogoProps = {
  compact?: boolean;  // Parámetro opcional
};

export default function Logo({ compact }: LogoProps) {
  return (
    <div className={clsx(
      "p-3 border-b border-white/20",
      compact ? "px-2" : "px-3",
      "flex justify-center"  // Ajuste de padding
    )}>
      <div className={clsx(
        "relative ",
        compact ? "w-8 h-8" : "w-6 h-6"  // Dos tamaños posibles
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
        <p className="font-raleway mt-2 ml-8 text-center text-white text-lg font-medium hidden md:block">
          Dashky 
        </p>
      )}
    </div>
  );
}