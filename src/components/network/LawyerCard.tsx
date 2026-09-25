import React from 'react';
import {
  ShieldCheck,
  MapPin,
  Building2,
  Users,
  CheckCircle2,
  UserPlus,
  Clock,
  ExternalLink,
} from 'lucide-react';
import { Lawyer } from '../../types/index.ts';

export type ConnectionState = 'connect' | 'pending' | 'connected';

export interface LawyerCardProps {
  lawyer: Lawyer;
  connectionStatus: ConnectionState;
  onConnect: (lawyer: Lawyer) => void;
  onViewProfile: (lawyer: Lawyer) => void;
  variant?: 'standard' | 'compact';
}

export const LawyerCard: React.FC<LawyerCardProps> = ({
  lawyer,
  connectionStatus,
  onConnect,
  onViewProfile,
  variant = 'standard',
}) => {
  if (variant === 'compact') {
    return (
      <div className="flex items-start justify-between gap-3 group">
        <button
          type="button"
          onClick={() => onViewProfile(lawyer)}
          className="flex items-start gap-2.5 text-left cursor-pointer flex-1 min-w-0"
        >
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-mono font-medium border shrink-0 transition-colors ${lawyer.avatarColor}`}
          >
            {lawyer.avatarInitials}
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold text-slate-200 group-hover:text-amber-200 transition-colors truncate">
              {lawyer.name}
            </p>
            <p className="text-[11px] text-slate-400 truncate">
              {lawyer.title}
            </p>
            <p className="text-[10px] text-amber-300/80 font-mono">
              {lawyer.practiceAreas[0]}
            </p>
          </div>
        </button>

        <button
          type="button"
          onClick={() => onConnect(lawyer)}
          disabled={connectionStatus === 'connected' || connectionStatus === 'pending'}
          className={`shrink-0 p-1.5 rounded transition-colors text-xs cursor-pointer ${
            connectionStatus === 'connected'
              ? 'text-emerald-400 bg-emerald-400/10 cursor-default'
              : connectionStatus === 'pending'
              ? 'text-amber-300 bg-amber-400/10 cursor-default'
              : 'text-slate-300 hover:text-white bg-white/[0.04] hover:bg-white/[0.1] border border-white/[0.08]'
          }`}
          title={
            connectionStatus === 'connected'
              ? 'Connected'
              : connectionStatus === 'pending'
              ? 'Request Pending'
              : 'Send Connection Request'
          }
        >
          {connectionStatus === 'connected' ? (
            <CheckCircle2 className="w-3.5 h-3.5" />
          ) : connectionStatus === 'pending' ? (
            <span className="text-[10px] font-mono px-1">Pending</span>
          ) : (
            <UserPlus className="w-3.5 h-3.5" />
          )}
        </button>
      </div>
    );
  }

  // Standard Card (Used in Network and Discover Lawyers)
  return (
    <div className="bg-[#10131a] border border-white/[0.08] hover:border-white/[0.15] rounded-lg p-5 flex flex-col justify-between transition-colors shadow-sm">
      <div>
        {/* Top Header: Avatar & Bar Credential */}
        <div className="flex items-start justify-between gap-3 mb-3.5">
          <button
            type="button"
            onClick={() => onViewProfile(lawyer)}
            className="cursor-pointer"
          >
            <div
              className={`w-12 h-12 rounded-lg flex items-center justify-center text-sm font-mono font-medium border transition-colors ${lawyer.avatarColor}`}
            >
              {lawyer.avatarInitials}
            </div>
          </button>

          <span className="text-[10px] font-mono text-amber-200/90 bg-amber-400/[0.06] border border-amber-400/20 px-2 py-0.5 rounded">
            {lawyer.barNumber}
          </span>
        </div>

        {/* Lawyer Identity: Name, Title & Chambers */}
        <div className="mb-3">
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => onViewProfile(lawyer)}
              className="font-serif-legal text-base sm:text-lg font-semibold text-slate-100 hover:text-amber-200 transition-colors text-left cursor-pointer"
            >
              {lawyer.name}
            </button>
            {lawyer.isVerified && (
              <span title="Verified Legal Practitioner">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-300 shrink-0" />
              </span>
            )}
          </div>
          <p className="text-xs text-slate-300 mt-0.5 leading-snug">
            {lawyer.title}
          </p>
          <p className="text-[11px] font-mono text-amber-300/80 mt-1 flex items-center gap-1">
            <Building2 className="w-3 h-3 text-amber-400/70 shrink-0" />
            <span className="truncate">{lawyer.firmOrChambers}</span>
          </p>
        </div>

        {/* Location & Jurisdiction */}
        <div className="space-y-1 text-xs text-slate-400 mb-3.5">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
            <span className="truncate">{lawyer.location}</span>
          </div>
        </div>

        {/* Short Professional Biography */}
        <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-4 font-sans-legal">
          {lawyer.bio}
        </p>

        {/* Practice Areas */}
        <div className="flex flex-wrap gap-1 mb-4">
          {lawyer.practiceAreas.slice(0, 2).map((area) => (
            <span
              key={area}
              className="text-[10px] text-slate-300 bg-white/[0.03] border border-white/[0.06] px-2 py-0.5 rounded"
            >
              {area}
            </span>
          ))}
          {lawyer.practiceAreas.length > 2 && (
            <span className="text-[10px] text-slate-500 font-mono self-center">
              +{lawyer.practiceAreas.length - 2}
            </span>
          )}
        </div>
      </div>

      {/* Footer Actions: View Profile & Connect */}
      <div className="pt-3 border-t border-white/[0.06]">
        <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
          <span className="flex items-center gap-1 text-[11px]">
            <Users className="w-3 h-3 text-slate-500" />
            <span>{lawyer.connectionsCount} Colleagues</span>
          </span>
          {lawyer.mutualConnections > 0 && (
            <span className="text-[11px] text-amber-300/80 font-mono">
              {lawyer.mutualConnections} Mutual
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {/* View Profile Action */}
          <button
            type="button"
            onClick={() => onViewProfile(lawyer)}
            className="flex-1 py-2 px-2.5 bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-white text-xs font-medium rounded border border-white/[0.08] transition-colors text-center cursor-pointer inline-flex items-center justify-center gap-1"
          >
            <span>View Profile</span>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </button>

          {/* Connect Action Button with distinct states: Connect | Pending | Connected */}
          <button
            type="button"
            onClick={() => onConnect(lawyer)}
            disabled={connectionStatus === 'connected' || connectionStatus === 'pending'}
            className={`flex-1 py-2 px-2.5 text-xs font-medium rounded transition-all cursor-pointer inline-flex items-center justify-center gap-1.5 ${
              connectionStatus === 'connected'
                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 cursor-default'
                : connectionStatus === 'pending'
                ? 'bg-amber-400/10 text-amber-300 border border-amber-400/30 cursor-default'
                : 'bg-slate-100 hover:bg-white text-slate-950 font-semibold shadow-sm'
            }`}
          >
            {connectionStatus === 'connected' ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Connected</span>
              </>
            ) : connectionStatus === 'pending' ? (
              <>
                <Clock className="w-3.5 h-3.5 animate-pulse" />
                <span>Pending</span>
              </>
            ) : (
              <>
                <UserPlus className="w-3.5 h-3.5" />
                <span>Connect</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
