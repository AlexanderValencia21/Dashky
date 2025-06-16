import Image from "next/image";
import clsx from "clsx";

type LogoProps = {
  compact?: boolean; 
};

export default function Logo({ compact }: LogoProps) {
  return (
    <div className={clsx(
      "border-b border-white/20",
      "flex items-center",
      compact ? "p-3 justify-center" : "p-4 px-5",
    )}>
      <div className={clsx(
        "relative flex-shrink-0",
        compact ? "w-7 h-7" : "w-7 h-7" 
      )}>
        <Image
          src="/images/logoLogin.png"
          alt="Logo de la App"
          fill
          className="object-contain"
          priority
        />
      </div>
      
      {!compact && (
        <p className="font-raleway ml-4 text-white text-lg font-medium hidden md:block">
          Dashky 
        </p>
      )}
    </div>
  );
}