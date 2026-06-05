import type { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: React.ReactNode;
}

export function Input({ label, icon, className = '', ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-xs font-medium text-muted uppercase tracking-wider">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted">
            {icon}
          </div>
        )}
        <input
          className={`w-full bg-surface border border-border rounded-lg px-3 py-2 text-sm text-deep
            placeholder:text-muted/60
            focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent
            hover:border-muted transition-colors
            ${icon ? 'pl-9' : ''}
            ${className}`}
          {...props}
        />
      </div>
    </div>
  );
}
