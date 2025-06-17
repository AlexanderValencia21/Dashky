'use client'
import clsx from "clsx"
interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  fullScreen?: boolean
  className?: string
}

export default function LoadingSpinner({
  size = 'md',
  fullScreen = false,
  className = ''
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'h-6 w-6 border-2',
    md: 'h-8 w-8 border-2',
    lg: 'h-12 w-12 border-[3px]'
  }

  return (
    <div className={clsx(
      "flex items-center justify-center",
      fullScreen ? 'min-h-screen w-full' : '',
      className
    )}>
      <div
        className={clsx(
          "animate-spin rounded-full border-t-transparent",
          sizeClasses[size],
          "border-corporate-slate" // Usa tu color corporativo
        )}
      />
    </div>
  )
}