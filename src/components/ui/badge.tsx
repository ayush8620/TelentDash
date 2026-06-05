interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
  className?: string;
}

export function Badge({ children, variant = 'default', className = '' }: BadgeProps) {
  const variants = {
    default: 'bg-background text-body',
    success: 'bg-[#008A05]/10 text-[#008A05]',
    warning: 'bg-[#FFB400]/10 text-[#FFB400]',
    error: 'bg-[#D93025]/10 text-[#D93025]',
    info: 'bg-[#0369A1]/10 text-[#0369A1]',
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
