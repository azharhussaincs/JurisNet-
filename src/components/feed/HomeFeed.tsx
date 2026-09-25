import React, { useState } from 'react';
import {
  Scale,
  ShieldCheck,
  Send,
  MessageSquare,
  ThumbsUp,
  Bookmark,
  Share2,
  CheckCircle2,
  UserPlus,
  BookOpen,
  Filter,
  Image as ImageIcon,
  RotateCw,
  Sparkles,
  Award,
  Calendar,
  GraduationCap,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  FileText,
  Building2,
  X,
} from 'lucide-react';
import { Lawyer, Post, ConnectionItem } from '../../types/index.ts';
import { PostCard } from './PostCard.tsx';
import { ConnectionButton } from '../common/ConnectionButton.tsx';

interface HomeFeedProps {
  currentUser: Lawyer;
  posts: Post[];
  onAddPost: (newPost: Omit<Post, 'id' | 'author' | 'timestamp' | 'agreesCount' | 'commentsCount' | 'sharesCount' | 'comments'>) => void;
  onToggleAgree: (postId: string) => void;
  onToggleBookmark: (postId: string) => void;
  onAddComment: (postId: string, text: string) => void;
  onViewLawyerProfile: (lawyer: Lawyer) => void;
  onConnectWithLawyer: (lawyer: Lawyer) => void;
  onSharePost?: (postId: string) => void;
  suggestedLawyers: Lawyer[];
  connections: ConnectionItem[];
  selectedPracticeFilter: string;
  onSelectPracticeFilter: (filter: string) => void;
}

export const HomeFeed: React.FC<HomeFeedProps> = ({
  currentUser,
  posts,
  onAddPost,
  onToggleAgree,
  onToggleBookmark,
  onAddComment,
  onViewLawyerProfile,
  onConnectWithLawyer,
  onSharePost,
  suggestedLawyers,
  connections,
  selectedPracticeFilter,
  onSelectPracticeFilter,
}) => {
  // Post Creation States
  const [isEditorExpanded, setIsEditorExpanded] = useState(false);
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostPracticeTag, setNewPostPracticeTag] = useState('Appellate Advocacy');
  const [newPostCitation, setNewPostCitation] = useState('');
  const [newPostType, setNewPostType] = useState<Post['postType']>('insight');
  const [newPostImageUrl, setNewPostImageUrl] = useState('');
  const [newPostImageCaption, setNewPostImageCaption] = useState('');
  const [showCitationInput, setShowCitationInput] = useState(false);
  const [showImageInput, setShowImageInput] = useState(false);

  // Feed Interaction States
  const [isRefreshingFeed, setIsRefreshingFeed] = useState(false);
  const [feedSort, setFeedSort] = useState<'latest' | 'endorsed' | 'precedents'>('latest');

  const practiceFilterOptions = [
    'All Insights',
    'Commercial Chancery',
    'Appellate Advocacy',
    'Antitrust Litigation',
    'White Collar Defense',
    'Constitutional Law',
    'Energy & Cross-Border',
    'IP & Patents',
  ];

  const trendingTopics = [
    { title: 'Chabra Freezing Jurisdiction', court: 'UK Supreme Court', tag: 'Commercial Chancery', count: '14 citations' },
    { title: 'Algorithmic Pricing Conspiracy', court: 'US 9th Circuit', tag: 'Antitrust Litigation', count: '28 discussions' },
    { title: '120-Day Whistleblower Protocol', court: 'DOJ Enforcement', tag: 'White Collar Defense', count: '19 briefs' },
    { title: 'Article III Standing Splinter', court: 'SCOTUS Cert Watch', tag: 'Constitutional Law', count: '32 analyses' },
  ];

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostContent.trim()) return;

    onAddPost({
      content: newPostContent.trim(),
      practiceTag: newPostPracticeTag,
      precedentCitation: newPostCitation.trim() || undefined,
      postType: newPostType,
      imageUrl: newPostImageUrl.trim() || undefined,
      imageCaption: newPostImageCaption.trim() || undefined,
      userAgreed: false,
      userBookmarked: false,
    });

    // Reset editor
    setNewPostContent('');
    setNewPostCitation('');
    setNewPostImageUrl('');
    setNewPostImageCaption('');
    setShowCitationInput(false);
    setShowImageInput(false);
    setIsEditorExpanded(false);
  };

  const handleSimulateRefresh = () => {
    setIsRefreshingFeed(true);
    setTimeout(() => {
      setIsRefreshingFeed(false);
    }, 450);
  };

  // Filter and sort posts
  let filteredPosts = posts.filter((post) => {
    if (selectedPracticeFilter === 'All Insights') return true;
    return post.practiceTag === selectedPracticeFilter;
  });

  if (feedSort === 'endorsed') {
    filteredPosts = [...filteredPosts].sort((a, b) => b.agreesCount - a.agreesCount);
  } else if (feedSort === 'precedents') {
    filteredPosts = filteredPosts.filter((p) => Boolean(p.precedentCitation));
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      {/* =========================================================================
          LEFT SIDEBAR: LAWYER IDENTITY & PRACTICE DOMAINS
         ========================================================================= */}
      <aside className="hidden lg:block lg:col-span-3 space-y-5">
        {/* Current Lawyer Identity Card */}
        <div className="bg-[#10131a] border border-white/[0.08] rounded-lg p-5">
          <div className="flex flex-col items-center text-center pb-4 border-b border-white/[0.06]">
            <div
              className={`w-16 h-16 rounded-full flex items-center justify-center text-base font-mono font-medium border mb-3 ${currentUser.avatarColor}`}
            >
              {currentUser.avatarInitials}
            </div>
            <div className="flex items-center gap-1.5">
              <h2 className="font-serif-legal text-base font-semibold text-white tracking-tight">
                {currentUser.name}
              </h2>
              {currentUser.isVerified && (
                <span title="Verified Practitioner">
                  <ShieldCheck className="w-4 h-4 text-amber-300 shrink-0" />
                </span>
              )}
            </div>
            <p className="text-xs text-slate-400 mt-1 line-clamp-1">
              {currentUser.title}
            </p>
            <p className="text-[11px] text-slate-400 font-mono mt-0.5">
              {currentUser.firmOrChambers}
            </p>
            <div className="mt-2.5 inline-block px-2 py-0.5 bg-amber-400/[0.06] border border-amber-400/20 rounded text-[10px] font-mono text-amber-200">
              {currentUser.barNumber}
            </div>
          </div>

          <div className="pt-3.5 space-y-2 text-xs">
            <div className="flex justify-between items-center text-slate-400">
              <span>Jurisdiction</span>
              <span className="text-slate-200 text-right truncate max-w-[130px]">
                {currentUser.jurisdiction}
              </span>
            </div>
            <div className="flex justify-between items-center text-slate-400">
              <span>Verified Network</span>
              <span className="text-amber-200 font-mono font-medium">
                {currentUser.connectionsCount} Colleagues
              </span>
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-white/[0.06]">
            <button
              type="button"
              onClick={() => onViewLawyerProfile(currentUser)}
              className="w-full py-2 bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] hover:border-white/[0.15] text-xs font-semibold text-slate-200 rounded-md transition-colors text-center cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-400/50"
            >
              View Counsel Profile
            </button>
          </div>
        </div>

        {/* Practice Focus Domains */}
        <div className="bg-[#10131a] border border-white/[0.08] rounded-lg p-5">
          <div className="flex items-center justify-between pb-3 border-b border-white/[0.06] mb-3">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5 text-slate-400" />
              <span>Practice Domains</span>
            </span>
            {selectedPracticeFilter !== 'All Insights' && (
              <button
                type="button"
                onClick={() => onSelectPracticeFilter('All Insights')}
                className="text-[10px] font-mono text-amber-300 hover:text-amber-200 underline cursor-pointer"
              >
                Reset
              </button>
            )}
          </div>
          <div className="flex flex-col gap-1">
            {practiceFilterOptions.map((filter) => {
              const isSelected = selectedPracticeFilter === filter;
              return (
                <button
                  key={filter}
                  type="button"
                  onClick={() => onSelectPracticeFilter(filter)}
                  className={`text-left px-2.5 py-1.5 rounded text-xs transition-colors cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? 'bg-amber-400/[0.1] text-amber-200 font-medium border border-amber-400/20'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.03]'
                  }`}
                >
                  <span className="truncate">{filter}</span>
                  {isSelected && (
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </aside>

      {/* =========================================================================
          CENTER COLUMN: CREATE POST & SOCIAL FEED CARDS
         ========================================================================= */}
      <main className="col-span-1 lg:col-span-6 space-y-5">
        {/* CREATE POST AREA */}
        <div className="bg-[#10131a] border border-white/[0.08] hover:border-white/[0.12] rounded-lg p-4 sm:p-5 transition-colors shadow-sm">
          <div className="flex items-start gap-3 mb-3">
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-mono font-medium border shrink-0 mt-0.5 ${currentUser.avatarColor}`}
            >
              {currentUser.avatarInitials}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-slate-200">
                  {currentUser.name}
                </span>
                <span className="text-[10px] font-mono text-amber-300/80 bg-amber-400/[0.06] border border-amber-400/20 px-1.5 py-0.5 rounded">
                  Legal Roster
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Share an insight, court proceeding, or precedent with verified counsel
              </p>
            </div>
          </div>

          <form onSubmit={handlePublish} className="space-y-3">
            <textarea
              rows={isEditorExpanded ? 4 : 2}
              value={newPostContent}
              onFocus={() => setIsEditorExpanded(true)}
              onChange={(e) => setNewPostContent(e.target.value)}
              placeholder="Examine a precedent, appellate oral argument, statutory development, or professional announcement..."
              className="w-full bg-[#0a0c10] border border-white/[0.08] focus:border-amber-400/40 rounded-md p-3 text-xs sm:text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none resize-none leading-relaxed transition-all"
            />

            {/* Optional Citation Input Drawer */}
            {showCitationInput && (
              <div className="flex items-center gap-2 bg-[#0c0e14] border border-white/[0.06] rounded-md p-2 text-xs">
                <BookOpen className="w-3.5 h-3.5 text-amber-300/80 shrink-0" />
                <span className="font-mono text-slate-400 text-[11px] whitespace-nowrap">
                  Citation:
                </span>
                <input
                  type="text"
                  value={newPostCitation}
                  onChange={(e) => setNewPostCitation(e.target.value)}
                  placeholder="e.g. [2026] UKSC 18 or 144 F.3d 211 / Fed. R. Civ. P. 69"
                  className="w-full bg-transparent text-amber-200 placeholder:text-slate-500 text-xs font-mono focus:outline-none"
                />
                {newPostCitation && (
                  <button
                    type="button"
                    onClick={() => setNewPostCitation('')}
                    className="text-slate-500 hover:text-slate-300"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            )}

            {/* Optional Image Reference Input */}
            {showImageInput && (
              <div className="space-y-2 bg-[#0c0e14] border border-white/[0.06] rounded-md p-3 text-xs">
                <div className="flex items-center gap-2">
                  <ImageIcon className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <input
                    type="url"
                    value={newPostImageUrl}
                    onChange={(e) => setNewPostImageUrl(e.target.value)}
                    placeholder="Image URL (e.g. courtroom photo, symposium keynote, legal archive)..."
                    className="w-full bg-transparent text-slate-200 placeholder:text-slate-500 text-xs focus:outline-none"
                  />
                  {newPostImageUrl && (
                    <button
                      type="button"
                      onClick={() => setNewPostImageUrl('')}
                      className="text-slate-500 hover:text-slate-300"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
                {newPostImageUrl && (
                  <input
                    type="text"
                    value={newPostImageCaption}
                    onChange={(e) => setNewPostImageCaption(e.target.value)}
                    placeholder="Image caption / proceedings attribution (optional)..."
                    className="w-full bg-transparent border-t border-white/[0.05] pt-1.5 text-slate-400 placeholder:text-slate-500 text-[11px] focus:outline-none font-mono"
                  />
                )}
              </div>
            )}

            {/* Controls Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-white/[0.06]">
              <div className="flex flex-wrap items-center gap-2">
                {/* Practice Area selector */}
                <select
                  value={newPostPracticeTag}
                  onChange={(e) => setNewPostPracticeTag(e.target.value)}
                  aria-label="Practice Area"
                  className="bg-[#0a0c10] border border-white/[0.08] text-slate-300 text-xs rounded-md px-2.5 py-1.5 focus:outline-none focus:border-amber-400/40 cursor-pointer"
                >
                  <option value="Appellate Advocacy">Appellate Advocacy</option>
                  <option value="Commercial Chancery">Commercial Chancery</option>
                  <option value="Antitrust Litigation">Antitrust Litigation</option>
                  <option value="White Collar Defense">White Collar Defense</option>
                  <option value="Constitutional Law">Constitutional Law</option>
                  <option value="Energy & Cross-Border">Energy & Cross-Border</option>
                  <option value="IP & Patents">IP & Patents</option>
                </select>

                {/* Post Type Selector */}
                <select
                  value={newPostType}
                  onChange={(e) => setNewPostType(e.target.value as Post['postType'])}
                  aria-label="Post Classification"
                  className="bg-[#0a0c10] border border-white/[0.08] text-slate-300 text-xs rounded-md px-2 py-1.5 focus:outline-none focus:border-amber-400/40 cursor-pointer hidden sm:inline-block"
                >
                  <option value="insight">Insight</option>
                  <option value="development">Legal Development</option>
                  <option value="symposium">Symposium</option>
                  <option value="research">Scholarly Research</option>
                  <option value="achievement">Announcement</option>
                </select>

                {/* Add Citation Button */}
                <button
                  type="button"
                  onClick={() => setShowCitationInput(!showCitationInput)}
                  className={`text-xs px-2.5 py-1.5 rounded-md border transition-colors cursor-pointer flex items-center gap-1 ${
                    showCitationInput || newPostCitation
                      ? 'bg-amber-400/10 border-amber-400/30 text-amber-200'
                      : 'border-white/[0.08] text-slate-400 hover:text-slate-200 hover:bg-white/[0.03]'
                  }`}
                >
                  <BookOpen className="w-3 h-3" />
                  <span className="hidden sm:inline">Citation</span>
                </button>

                {/* Add Media Button */}
                <button
                  type="button"
                  onClick={() => setShowImageInput(!showImageInput)}
                  className={`text-xs px-2.5 py-1.5 rounded-md border transition-colors cursor-pointer flex items-center gap-1 ${
                    showImageInput || newPostImageUrl
                      ? 'bg-amber-400/10 border-amber-400/30 text-amber-200'
                      : 'border-white/[0.08] text-slate-400 hover:text-slate-200 hover:bg-white/[0.03]'
                  }`}
                >
                  <ImageIcon className="w-3 h-3" />
                  <span className="hidden sm:inline">Media</span>
                </button>
              </div>

              <div className="flex items-center gap-2">
                {isEditorExpanded && (
                  <button
                    type="button"
                    onClick={() => {
                      if (!newPostContent.trim()) {
                        setIsEditorExpanded(false);
                      }
                    }}
                    className="text-xs text-slate-400 hover:text-slate-200 px-2.5 py-1.5 rounded-md transition-colors"
                  >
                    Cancel
                  </button>
                )}

                <button
                  type="submit"
                  disabled={!newPostContent.trim()}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-white active:bg-slate-200 disabled:opacity-40 disabled:hover:bg-slate-100 text-slate-950 font-semibold text-xs rounded-md transition-all cursor-pointer disabled:cursor-not-allowed shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-400/50"
                >
                  <span>Publish Insight</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* FEED HEADER CONTROLS (Sorting & Refresh State) */}
        <div className="flex items-center justify-between pb-1 border-b border-white/[0.06] text-xs">
          <div className="flex items-center gap-2">
            <span className="font-mono text-slate-400 uppercase tracking-wider text-[11px]">
              Feed View:
            </span>
            <div className="flex items-center gap-1 bg-[#10131a] p-0.5 rounded-md border border-white/[0.06]">
              <button
                type="button"
                onClick={() => setFeedSort('latest')}
                className={`px-2.5 py-1 rounded-md text-xs transition-colors cursor-pointer ${
                  feedSort === 'latest'
                    ? 'bg-white/[0.1] text-white font-medium shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Latest
              </button>
              <button
                type="button"
                onClick={() => setFeedSort('endorsed')}
                className={`px-2.5 py-1 rounded-md text-xs transition-colors cursor-pointer ${
                  feedSort === 'endorsed'
                    ? 'bg-white/[0.1] text-white font-medium shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Top Endorsed
              </button>
              <button
                type="button"
                onClick={() => setFeedSort('precedents')}
                className={`px-2.5 py-1 rounded-md text-xs transition-colors cursor-pointer ${
                  feedSort === 'precedents'
                    ? 'bg-white/[0.1] text-white font-medium shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                With Precedents
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={handleSimulateRefresh}
            className="flex items-center gap-1.5 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
            title="Refresh docket feed"
          >
            <RotateCw className={`w-3.5 h-3.5 ${isRefreshingFeed ? 'animate-spin text-amber-300' : ''}`} />
            <span className="hidden sm:inline font-mono text-[11px]">
              {isRefreshingFeed ? 'Refreshing...' : 'Refresh'}
            </span>
          </button>
        </div>

        {/* Active Practice Filter Notice */}
        {selectedPracticeFilter !== 'All Insights' && (
          <div className="flex items-center justify-between px-3.5 py-2 bg-amber-400/[0.04] border border-amber-400/20 rounded-md text-xs">
            <span className="text-amber-200 font-medium">
              Filtered domain: <strong className="text-white">{selectedPracticeFilter}</strong>
            </span>
            <button
              type="button"
              onClick={() => onSelectPracticeFilter('All Insights')}
              className="text-slate-400 hover:text-slate-200 underline text-[11px] cursor-pointer"
            >
              Show all domains
            </button>
          </div>
        )}

        {/* LOADING SKELETON STATE SIMULATION */}
        {isRefreshingFeed ? (
          <div className="space-y-4">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="bg-[#10131a] border border-white/[0.08] rounded-lg p-5 animate-pulse space-y-3"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-800" />
                  <div className="space-y-1.5 flex-1">
                    <div className="h-3.5 bg-slate-800 rounded w-1/3" />
                    <div className="h-2.5 bg-slate-800/60 rounded w-1/2" />
                  </div>
                </div>
                <div className="h-16 bg-slate-800/40 rounded w-full" />
              </div>
            ))}
          </div>
        ) : (
          /* SOCIAL FEED POST CARDS */
          <div className="space-y-5">
            {filteredPosts.length === 0 ? (
              /* EMPTY STATE */
              <div className="bg-[#10131a] border border-white/[0.08] rounded-lg p-10 text-center space-y-3">
                <Scale className="w-8 h-8 text-slate-500 mx-auto" />
                <h3 className="font-serif-legal text-lg font-medium text-slate-200">
                  No legal insights found
                </h3>
                <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
                  There are currently no discussions published under {selectedPracticeFilter} in this view.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    onSelectPracticeFilter('All Insights');
                    setFeedSort('latest');
                  }}
                  className="px-3.5 py-1.5 bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] rounded text-xs text-amber-200 transition-colors cursor-pointer"
                >
                  Reset Feed to All Insights
                </button>
              </div>
            ) : (
              filteredPosts.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  onToggleAgree={onToggleAgree}
                  onToggleBookmark={onToggleBookmark}
                  onAddComment={onAddComment}
                  onViewLawyerProfile={onViewLawyerProfile}
                  onSharePost={onSharePost}
                />
              ))
            )}
          </div>
        )}
      </main>

      {/* =========================================================================
          RIGHT CONTEXTUAL COLUMN: TRENDING DISCUSSIONS & NETWORKING SUGGESTIONS
         ========================================================================= */}
      <aside className="hidden lg:block lg:col-span-3 space-y-5">
        {/* Suggested Colleagues for Networking */}
        <div className="bg-[#10131a] border border-white/[0.08] rounded-lg p-5">
          <div className="pb-3 border-b border-white/[0.06] mb-3 flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
              Colleagues to Connect With
            </span>
          </div>
          <div className="space-y-4">
            {suggestedLawyers.slice(0, 3).map((lawyer) => {
              const isAlreadyConnected = connections.some(
                (c) => c.lawyer.id === lawyer.id && c.status === 'connected'
              );
              const isPending = connections.some(
                (c) => c.lawyer.id === lawyer.id && c.status === 'pending_sent'
              );

              return (
                <div key={lawyer.id} className="flex items-start justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => onViewLawyerProfile(lawyer)}
                    className="flex items-start gap-2.5 text-left group cursor-pointer flex-1 min-w-0"
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-mono font-medium border shrink-0 ${lawyer.avatarColor}`}
                    >
                      {lawyer.avatarInitials}
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-slate-200 group-hover:text-amber-200 truncate">
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

                  <ConnectionButton
                    status={
                      isAlreadyConnected
                        ? 'connected'
                        : isPending
                        ? 'pending'
                        : 'not_connected'
                    }
                    onConnect={() => onConnectWithLawyer(lawyer)}
                    size="sm"
                    className="shrink-0"
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Trending Legal Discussions & Precedents */}
        <div className="bg-[#10131a] border border-white/[0.08] rounded-lg p-5">
          <div className="pb-3 border-b border-white/[0.06] mb-3 flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-amber-300/80" />
              <span>Trending Legal Issues</span>
            </span>
          </div>
          <div className="space-y-3.5 text-xs">
            {trendingTopics.map((topic) => (
              <button
                key={topic.title}
                type="button"
                onClick={() => onSelectPracticeFilter(topic.tag)}
                className="w-full text-left group cursor-pointer space-y-1 block"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-amber-300/80">
                    {topic.court}
                  </span>
                  <span className="text-[10px] font-mono text-slate-500">
                    {topic.count}
                  </span>
                </div>
                <p className="font-serif-legal font-medium text-slate-200 group-hover:text-amber-200 transition-colors text-sm leading-snug">
                  {topic.title}
                </p>
                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span>{topic.tag}</span>
                  <ChevronRight className="w-3 h-3 text-slate-500 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
};
