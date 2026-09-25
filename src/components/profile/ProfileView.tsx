import React, { useState } from 'react';
import {
  Scale,
  ShieldCheck,
  Building2,
  MapPin,
  GraduationCap,
  Briefcase,
  Users,
  CheckCircle2,
  UserPlus,
  Share2,
  Edit3,
  ArrowLeft,
  X,
  Compass,
} from 'lucide-react';
import { Lawyer, Post } from '../../types/index.ts';
import { PostCard } from '../feed/PostCard.tsx';
import { ConnectionButton } from '../common/ConnectionButton.tsx';

interface ProfileViewProps {
  lawyer: Lawyer;
  isCurrentUser: boolean;
  onUpdateProfile?: (updatedData: Partial<Lawyer>) => void;
  onConnect?: (lawyer: Lawyer) => void;
  isConnected?: boolean;
  isPending?: boolean;
  posts: Post[];
  onToggleAgree: (postId: string) => void;
  onToggleBookmark: (postId: string) => void;
  onAddComment: (postId: string, text: string) => void;
  onViewLawyerProfile: (lawyer: Lawyer) => void;
  onSharePost?: (postId: string) => void;
  onBack?: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  lawyer,
  isCurrentUser,
  onUpdateProfile,
  onConnect,
  isConnected,
  isPending,
  posts,
  onToggleAgree,
  onToggleBookmark,
  onAddComment,
  onViewLawyerProfile,
  onSharePost,
  onBack,
}) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);

  // Edit Profile Form State
  const [editName, setEditName] = useState(lawyer.name);
  const [editTitle, setEditTitle] = useState(lawyer.title);
  const [editFirm, setEditFirm] = useState(lawyer.firmOrChambers);
  const [editLocation, setEditLocation] = useState(lawyer.location);
  const [editBio, setEditBio] = useState(lawyer.bio);
  const [editPracticeAreas, setEditPracticeAreas] = useState(lawyer.practiceAreas.join(', '));
  const [editInterests, setEditInterests] = useState((lawyer.interests || []).join(', '));

  // Lawyer's posts
  const lawyerPosts = posts.filter((p) => p.author.id === lawyer.id);

  const handleShare = () => {
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2000);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!onUpdateProfile) return;

    const parsedPracticeAreas = editPracticeAreas
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const parsedInterests = editInterests
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    onUpdateProfile({
      name: editName.trim() || lawyer.name,
      title: editTitle.trim() || lawyer.title,
      firmOrChambers: editFirm.trim() || lawyer.firmOrChambers,
      location: editLocation.trim() || lawyer.location,
      bio: editBio.trim() || lawyer.bio,
      practiceAreas: parsedPracticeAreas.length > 0 ? parsedPracticeAreas : lawyer.practiceAreas,
      interests: parsedInterests.length > 0 ? parsedInterests : lawyer.interests,
    });

    setIsEditModalOpen(false);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Top Navigation Back Action when inspecting another lawyer */}
      {!isCurrentUser && onBack && (
        <div>
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back</span>
          </button>
        </div>
      )}

      {/* =========================================================================
          1. REFINED PROFILE HEADER (Restrained, Dignified, Highly Readable)
         ========================================================================= */}
      <section className="bg-[#10131a] border border-white/[0.08] rounded-lg p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-start gap-5">
            {/* Lawyer Monogram Avatar */}
            <div
              className={`w-20 h-20 sm:w-24 sm:h-24 rounded-lg flex items-center justify-center text-2xl font-serif-legal font-bold border shrink-0 ${lawyer.avatarColor}`}
            >
              {lawyer.avatarInitials}
            </div>

            {/* Profile Identity */}
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <h1 className="font-serif-legal text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  {lawyer.name}
                </h1>
                {lawyer.isVerified && (
                  <span title="Verified Legal Practitioner">
                    <ShieldCheck className="w-4 h-4 text-amber-300 shrink-0" />
                  </span>
                )}
              </div>

              <p className="text-sm font-medium text-slate-300">
                {lawyer.title}
              </p>

              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-400 pt-0.5">
                <span className="flex items-center gap-1 text-amber-200/90 font-mono">
                  <Building2 className="w-3.5 h-3.5 text-amber-400/80" />
                  {lawyer.firmOrChambers}
                </span>
                <span>&middot;</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-500" />
                  {lawyer.location}
                </span>
                <span>&middot;</span>
                <span className="font-mono text-slate-400">
                  {lawyer.barNumber}
                </span>
              </div>

              {/* Short Introduction Excerpt */}
              <p className="text-xs sm:text-sm text-slate-300 pt-2 leading-relaxed max-w-2xl font-sans-legal">
                {lawyer.bio}
              </p>
            </div>
          </div>

          {/* Primary Profile Actions */}
          <div className="flex items-center gap-2.5 shrink-0 self-start">
            {isCurrentUser ? (
              <>
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(true)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-100 hover:bg-white text-slate-950 text-xs font-medium rounded transition-colors shadow-sm cursor-pointer"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Edit Profile</span>
                </button>
                <button
                  type="button"
                  onClick={handleShare}
                  className="inline-flex items-center gap-1.5 px-3 py-2 bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-white text-xs font-medium rounded border border-white/[0.08] transition-colors cursor-pointer"
                  title="Share profile link"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">
                    {copiedShare ? 'Copied' : 'Share'}
                  </span>
                </button>
              </>
            ) : (
              <>
                {onConnect && (
                  <ConnectionButton
                    status={
                      isConnected
                        ? 'connected'
                        : isPending
                        ? 'pending'
                        : 'not_connected'
                    }
                    onConnect={() => onConnect(lawyer)}
                    size="md"
                  />
                )}
                <button
                  type="button"
                  onClick={handleShare}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-white text-xs font-semibold rounded-md border border-white/[0.08] transition-all cursor-pointer"
                  title="Share profile link"
                >
                  {copiedShare ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Share</span>
                    </>
                  )}
                </button>
              </>
            )}
          </div>
        </div>

        {/* Network Metrics Footer Bar */}
        <div className="pt-4 mt-6 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-4 text-slate-400">
            <span className="flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-amber-300" />
              <strong className="text-slate-100 font-mono font-medium">
                {lawyer.connectionsCount}
              </strong>{' '}
              Professional Colleagues
            </span>
            {!isCurrentUser && lawyer.mutualConnections > 0 && (
              <span>
                &middot; <strong className="text-slate-200 font-mono">{lawyer.mutualConnections}</strong> mutual
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono text-slate-400">Admitted:</span>
            <span className="text-xs text-slate-300 truncate max-w-xs">
              {lawyer.jurisdiction}
            </span>
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. PROFESSIONAL INFORMATION (Clean, Natural Scannable Layout)
         ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Main Column: About, Experience, Education */}
        <div className="lg:col-span-8 space-y-6">
          {/* Section: About */}
          <section className="bg-[#10131a] border border-white/[0.08] rounded-lg p-6">
            <h2 className="font-serif-legal text-lg font-semibold text-white mb-3">
              About
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans-legal whitespace-pre-line">
              {lawyer.bio}
            </p>
          </section>

          {/* Section: Professional Experience */}
          <section className="bg-[#10131a] border border-white/[0.08] rounded-lg p-6">
            <h2 className="font-serif-legal text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-amber-300/80" />
              <span>Professional Experience</span>
            </h2>
            <div className="space-y-5">
              {lawyer.experience.map((exp, idx) => (
                <div
                  key={idx}
                  className="pb-4 border-b border-white/[0.06] last:border-none last:pb-0"
                >
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-1">
                    <h3 className="text-sm font-semibold text-slate-100">
                      {exp.role}
                    </h3>
                    <span className="text-xs font-mono text-slate-400">
                      {exp.period}
                    </span>
                  </div>
                  <p className="text-xs font-mono text-amber-200/90 mb-1.5">
                    {exp.organization}
                  </p>
                  <p className="text-xs text-slate-300 leading-relaxed font-sans-legal">
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Section: Legal Education */}
          <section className="bg-[#10131a] border border-white/[0.08] rounded-lg p-6">
            <h2 className="font-serif-legal text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-amber-300/80" />
              <span>Education</span>
            </h2>
            <div className="space-y-4">
              {lawyer.education.map((edu, idx) => (
                <div key={idx} className="flex justify-between items-start gap-4">
                  <div>
                    <h3 className="text-sm font-semibold text-slate-100">
                      {edu.institution}
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {edu.degree}
                    </p>
                  </div>
                  <span className="text-xs font-mono text-slate-400 shrink-0">
                    {edu.year}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* =========================================================================
              3. PROFILE POSTS (Reusing shared PostCard component)
             ========================================================================= */}
          <section className="space-y-4">
            <div className="flex items-center justify-between pb-1 border-b border-white/[0.06]">
              <h2 className="font-serif-legal text-lg font-semibold text-white">
                Published Insights ({lawyerPosts.length})
              </h2>
              <span className="text-xs text-slate-400 font-mono">
                {lawyer.name}
              </span>
            </div>

            {lawyerPosts.length === 0 ? (
              <div className="bg-[#10131a] border border-white/[0.08] rounded-lg p-8 text-center space-y-2">
                <Scale className="w-6 h-6 text-slate-500 mx-auto" />
                <p className="text-xs text-slate-300 font-medium">
                  No professional insights published yet
                </p>
                <p className="text-[11px] text-slate-400">
                  {isCurrentUser
                    ? 'Publish a legal precedent analysis or court note from the Home feed.'
                    : 'This practitioner has not shared any public commentary yet.'}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {lawyerPosts.map((post) => (
                  <PostCard
                    key={post.id}
                    post={post}
                    onToggleAgree={onToggleAgree}
                    onToggleBookmark={onToggleBookmark}
                    onAddComment={onAddComment}
                    onViewLawyerProfile={onViewLawyerProfile}
                    onSharePost={onSharePost}
                  />
                ))}
              </div>
            )}
          </section>
        </div>

        {/* Side Column: Practice Areas, Interests, Admissions */}
        <aside className="lg:col-span-4 space-y-6">
          {/* Practice Areas */}
          <div className="bg-[#10131a] border border-white/[0.08] rounded-lg p-6">
            <h2 className="font-serif-legal text-base font-semibold text-white mb-3">
              Practice Areas
            </h2>
            <div className="flex flex-wrap gap-1.5">
              {lawyer.practiceAreas.map((area) => (
                <span
                  key={area}
                  className="px-2.5 py-1 bg-white/[0.03] border border-white/[0.06] text-slate-200 text-xs rounded"
                >
                  {area}
                </span>
              ))}
            </div>
          </div>

          {/* Professional Interests */}
          <div className="bg-[#10131a] border border-white/[0.08] rounded-lg p-6">
            <h2 className="font-serif-legal text-base font-semibold text-white mb-3 flex items-center gap-1.5">
              <Compass className="w-4 h-4 text-amber-300/80" />
              <span>Professional Interests</span>
            </h2>
            {lawyer.interests && lawyer.interests.length > 0 ? (
              <ul className="space-y-2 text-xs">
                {lawyer.interests.map((interest) => (
                  <li
                    key={interest}
                    className="flex items-start gap-2 text-slate-300 leading-snug"
                  >
                    <span className="text-amber-300/80">&bull;</span>
                    <span>{interest}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-xs text-slate-400 italic">
                No specific interests listed yet.
              </p>
            )}
          </div>

          {/* Bar Admissions */}
          <div className="bg-[#10131a] border border-white/[0.08] rounded-lg p-6">
            <h2 className="font-serif-legal text-base font-semibold text-white mb-3">
              Bar Admissions
            </h2>
            <ul className="space-y-2.5 text-xs">
              {lawyer.admissions.map((adm) => (
                <li
                  key={adm}
                  className="flex items-start gap-2 text-slate-300 leading-snug"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-300 shrink-0 mt-0.5" />
                  <span>{adm}</span>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>

      {/* =========================================================================
          EDIT PROFILE MODAL (Clean, Focused, Restrained)
         ========================================================================= */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#11141c] border border-white/[0.1] rounded-lg shadow-2xl max-w-xl w-full p-6 space-y-4 my-8">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
              <div>
                <h3 className="font-serif-legal text-lg font-semibold text-white">
                  Edit Professional Profile
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Update your counsel identity and legal focus areas
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsEditModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded hover:bg-white/[0.05]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    required
                    className="w-full bg-[#0a0c10] border border-white/[0.1] focus:border-amber-400/50 rounded-md px-3 py-1.5 text-xs text-slate-100 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">
                    Professional Title
                  </label>
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    required
                    className="w-full bg-[#0a0c10] border border-white/[0.1] focus:border-amber-400/50 rounded-md px-3 py-1.5 text-xs text-slate-100 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">
                    Firm or Chambers
                  </label>
                  <input
                    type="text"
                    value={editFirm}
                    onChange={(e) => setEditFirm(e.target.value)}
                    required
                    className="w-full bg-[#0a0c10] border border-white/[0.1] focus:border-amber-400/50 rounded-md px-3 py-1.5 text-xs text-slate-100 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    value={editLocation}
                    onChange={(e) => setEditLocation(e.target.value)}
                    required
                    className="w-full bg-[#0a0c10] border border-white/[0.1] focus:border-amber-400/50 rounded-md px-3 py-1.5 text-xs text-slate-100 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">
                  Professional Biography
                </label>
                <textarea
                  rows={4}
                  value={editBio}
                  onChange={(e) => setEditBio(e.target.value)}
                  required
                  className="w-full bg-[#0a0c10] border border-white/[0.1] focus:border-amber-400/50 rounded-md p-3 text-xs text-slate-100 focus:outline-none leading-relaxed transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">
                  Practice Areas <span className="text-slate-500">(comma separated)</span>
                </label>
                <input
                  type="text"
                  value={editPracticeAreas}
                  onChange={(e) => setEditPracticeAreas(e.target.value)}
                  className="w-full bg-[#0a0c10] border border-white/[0.1] focus:border-amber-400/50 rounded-md px-3 py-1.5 text-xs text-slate-100 focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">
                  Professional Interests <span className="text-slate-500">(comma separated)</span>
                </label>
                <input
                  type="text"
                  value={editInterests}
                  onChange={(e) => setEditInterests(e.target.value)}
                  className="w-full bg-[#0a0c10] border border-white/[0.1] focus:border-amber-400/50 rounded-md px-3 py-1.5 text-xs text-slate-100 focus:outline-none transition-colors"
                />
              </div>

              <div className="pt-3 border-t border-white/[0.08] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 text-xs text-slate-300 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] rounded-md transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-slate-100 hover:bg-white active:bg-slate-200 text-slate-950 font-semibold text-xs rounded-md transition-colors shadow-sm cursor-pointer"
                >
                  Save Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
