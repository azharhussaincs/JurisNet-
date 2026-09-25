import React from 'react';
import { UserPlus, Clock, CheckCircle2 } from 'lucide-react';

export type ConnectionStatus = 'connected' | 'pending' | 'not_connected';

interface ConnectionButtonProps {
  status: ConnectionStatus;
  onConnect: () => void;
  size?: 'sm' | 'md';
  className?: string;
  showIcon?: boolean;
}

export const ConnectionButton: React.FC<ConnectionButtonProps> = ({
  status,
  onConnect,
  size = 'sm',
  className = '',
  showIcon = true,
}) => {
  const isConnected = status === 'connected';
  const isPending = status === 'pending';
  const isNotConnected = status === 'not_connected';

  const sizeClasses =
    size === 'md'
      ? 'px-4 py-2 text-xs font-semibold'
      : 'px-3 py-1.5 text-xs font-medium';

  if (isConnected) {
    return (
      <span
        aria-label="Connected with this colleague"
        className={`inline-flex items-center justify-center gap-1.5 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 cursor-default select-none ${sizeClasses} ${className}`}
      >
        {showIcon && <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />}
        <span>Connected</span>
      </span>
    );
  }

  if (isPending) {
    return (
      <span
        aria-label="Connection invitation is pending"
        className={`inline-flex items-center justify-center gap-1.5 rounded-md bg-amber-400/10 text-amber-300 border border-amber-400/30 cursor-default select-none ${sizeClasses} ${className}`}
      >
        {showIcon && <Clock className="w-3.5 h-3.5 shrink-0 animate-pulse" />}
        <span>Pending</span>
      </span>
    );
  }

  return (
    <button
      type="button"
      onClick={onConnect}
      aria-label="Send connection invitation"
      className={`inline-flex items-center justify-center gap-1.5 rounded-md bg-slate-100 hover:bg-white active:bg-slate-200 text-slate-950 shadow-sm font-semibold transition-all duration-150 cursor-pointer focus-visible:ring-2 focus-visible:ring-amber-400/60 focus:outline-none ${sizeClasses} ${className}`}
    >
      {showIcon && <UserPlus className="w-3.5 h-3.5 shrink-0" />}
      <span>Connect</span>
    </button>
  );
};
