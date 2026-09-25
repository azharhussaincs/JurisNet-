import React, { useState } from 'react';
import {
  ShieldCheck,
  ThumbsUp,
  MessageSquare,
  Share2,
  Bookmark,
  BookOpen,
  Check,
  Send,
} from 'lucide-react';
import { Lawyer, Post } from '../../types/index.ts';

interface PostCardProps {
  post: Post;
  onToggleAgree: (postId: string) => void;
  onToggleBookmark: (postId: string) => void;
  onAddComment: (postId: string, text: string) => void;
  onViewLawyerProfile: (lawyer: Lawyer) => void;
  onSharePost?: (postId: string) => void;
}

export const PostCard: React.FC<PostCardProps> = ({
  post,
  onToggleAgree,
  onToggleBookmark,
  onAddComment,
  onViewLawyerProfile,
  onSharePost,
}) => {
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);
  const [commentInput, setCommentInput] = useState('');
  const [copiedShare, setCopiedShare] = useState(false);
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);

  const handleShareClick = () => {
    setCopiedShare(true);
    if (onSharePost) {
      onSharePost(post.id);
    }
    // Professional inline clipboard copy simulation without window.alert
    try {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(
          `${window.location.origin}#post-${post.id}`
        );
      }
    } catch {
      // Fallback silently if clipboard permissions are restricted
    }
    setTimeout(() => {
      setCopiedShare(false);
    }, 2000);
  };

  const handleCommentSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!commentInput.trim() || isSubmittingComment) return;

    setIsSubmittingComment(true);
    onAddComment(post.id, commentInput.trim());
    setCommentInput('');
    setIsSubmittingComment(false);
  };

  return (
    <article className="bg-[#10131a] border border-white/[0.08] hover:border-white/[0.14] rounded-lg p-5 sm:p-6 transition-all duration-150 shadow-sm">
      {/* Post Header: Author Identity & Classification */}
      <div className="flex items-start justify-between gap-4 mb-3.5">
        <button
          type="button"
          onClick={() => onViewLawyerProfile(post.author)}
          className="flex items-start gap-3 text-left group cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-400/50 rounded"
        >
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-mono font-medium border shrink-0 group-hover:border-amber-400/40 transition-colors ${post.author.avatarColor}`}
          >
            {post.author.avatarInitials}
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="font-serif-legal text-base font-semibold text-slate-100 group-hover:text-amber-200 transition-colors">
                {post.author.name}
              </h3>
              {post.author.isVerified && (
                <span title="Verified Legal Practitioner">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                </span>
              )}
            </div>
            <p className="text-xs text-slate-400 leading-tight">
              {post.author.title} &middot; {post.author.firmOrChambers}
            </p>
            <div className="flex items-center gap-2 text-[11px] text-slate-400 font-mono mt-0.5">
              <span>{post.author.barNumber}</span>
              <span>&middot;</span>
              <span>{post.timestamp}</span>
            </div>
          </div>
        </button>

        <div className="flex flex-col items-end gap-1 shrink-0">
          <span className="text-[11px] font-medium text-amber-200/90 bg-amber-400/[0.06] border border-amber-400/20 rounded px-2.5 py-0.5 whitespace-nowrap">
            {post.practiceTag}
          </span>
          {post.postType && (
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
              {post.postType === 'symposium'
                ? 'Symposium'
                : post.postType === 'research'
                ? 'Scholarly'
                : post.postType === 'development'
                ? 'Precedent'
                : 'Insight'}
            </span>
          )}
        </div>
      </div>

      {/* Precedent / Statutory Citation Authority */}
      {post.precedentCitation && (
        <div className="mb-3.5 inline-flex items-center gap-2 px-3 py-1.5 bg-white/[0.02] border border-white/[0.08] rounded text-xs font-mono text-slate-300">
          <BookOpen className="w-3.5 h-3.5 text-amber-300/80 shrink-0" />
          <span className="text-amber-200 font-medium">Authority:</span>
          <span className="text-slate-300">{post.precedentCitation}</span>
        </div>
      )}

      {/* Main Legal Content */}
      <div className="text-xs sm:text-sm text-slate-200 leading-relaxed space-y-3 whitespace-pre-line mb-4 font-sans-legal">
        {post.content}
      </div>

      {/* Optional Attached Media */}
      {post.imageUrl && (
        <div className="mb-4 overflow-hidden rounded-md border border-white/[0.08] bg-[#0c0e14]">
          <img
            src={post.imageUrl}
            alt={post.imageCaption || 'Legal proceedings document'}
            className="w-full max-h-72 object-cover"
            loading="lazy"
          />
          {post.imageCaption && (
            <div className="px-3 py-2 border-t border-white/[0.06] bg-[#0c0e14]/90 flex items-center justify-between text-[11px] text-slate-400 font-mono">
              <span>{post.imageCaption}</span>
              <span className="text-[10px] text-amber-300/70">Verified Record</span>
            </div>
          )}
        </div>
      )}

      {/* Core Social Interactions Bar: Like, Comment, Share, Save */}
      <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* 1. LIKE / AGREE BUTTON */}
          <button
            type="button"
            onClick={() => onToggleAgree(post.id)}
            aria-label={post.userAgreed ? 'Unlike this post' : 'Like this post'}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-150 cursor-pointer focus-visible:ring-2 focus-visible:ring-amber-400/50 focus:outline-none ${
              post.userAgreed
                ? 'bg-amber-400/[0.14] text-amber-200 border border-amber-400/35 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.05] border border-transparent'
            }`}
          >
            <ThumbsUp
              className={`w-3.5 h-3.5 transition-transform duration-150 ${
                post.userAgreed ? 'text-amber-300 fill-amber-300 scale-105' : ''
              }`}
            />
            <span>Like</span>
            <span className="font-mono text-[11px]">({post.agreesCount})</span>
          </button>

          {/* 2. COMMENT / DISCUSSION BUTTON */}
          <button
            type="button"
            onClick={() => setIsCommentsOpen(!isCommentsOpen)}
            aria-label={isCommentsOpen ? 'Close comments' : 'Open comments'}
            aria-expanded={isCommentsOpen}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-150 cursor-pointer focus-visible:ring-2 focus-visible:ring-amber-400/50 focus:outline-none ${
              isCommentsOpen
                ? 'bg-white/[0.1] text-white border border-white/[0.15] shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.05] border border-transparent'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Comment</span>
            <span className="font-mono text-[11px]">({post.comments.length})</span>
          </button>
        </div>

        <div className="flex items-center gap-1.5">
          {/* 3. SHARE BUTTON */}
          <button
            type="button"
            onClick={handleShareClick}
            aria-label="Share post citation link"
            className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs transition-all duration-150 cursor-pointer focus-visible:ring-2 focus-visible:ring-amber-400/50 focus:outline-none ${
              copiedShare
                ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.05] border border-transparent'
            }`}
          >
            {copiedShare ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="font-medium text-[11px]">Link Copied</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Share</span>
                {post.sharesCount > 0 && (
                  <span className="font-mono text-[11px]">({post.sharesCount})</span>
                )}
              </>
            )}
          </button>

          {/* 4. BOOKMARK / SAVE BUTTON */}
          <button
            type="button"
            onClick={() => onToggleBookmark(post.id)}
            aria-label={post.userBookmarked ? 'Remove bookmark' : 'Bookmark post'}
            className={`p-1.5 sm:px-2.5 sm:py-1.5 rounded-md text-xs transition-all duration-150 cursor-pointer focus-visible:ring-2 focus-visible:ring-amber-400/50 focus:outline-none ${
              post.userBookmarked
                ? 'text-amber-300 bg-amber-400/[0.1] border border-amber-400/25'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.05] border border-transparent'
            }`}
          >
            <Bookmark
              className={`w-3.5 h-3.5 ${post.userBookmarked ? 'fill-amber-300' : ''}`}
            />
          </button>
        </div>
      </div>

      {/* EXPANDED COMMENTS SECTION */}
      {isCommentsOpen && (
        <div className="mt-4 pt-4 border-t border-white/[0.06] space-y-3.5">
          {/* Comments List */}
          {post.comments.length > 0 ? (
            <div className="space-y-2.5">
              {post.comments.map((comment) => (
                <div
                  key={comment.id}
                  className="bg-[#0b0e14] border border-white/[0.05] rounded-md p-3 text-xs"
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-slate-800 border border-white/[0.1] flex items-center justify-center text-[10px] font-mono font-medium text-slate-300">
                        {comment.authorInitials}
                      </div>
                      <span className="font-semibold text-slate-200">
                        {comment.authorName}
                      </span>
                      <span className="text-[10px] text-slate-400 hidden sm:inline">
                        &middot; {comment.authorTitle}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400">
                      {comment.timestamp}
                    </span>
                  </div>
                  <p className="text-slate-300 leading-relaxed font-sans-legal pl-7">
                    {comment.content}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-[#0b0e14] border border-white/[0.04] rounded-md p-3 text-center">
              <p className="text-xs text-slate-400 italic">
                No comments yet. Start the legal discussion.
              </p>
            </div>
          )}

          {/* Add Comment Input Form */}
          <form onSubmit={handleCommentSubmit} className="flex items-center gap-2 pt-1">
            <input
              type="text"
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
              placeholder="Write a comment as verified counsel..."
              aria-label="Write a comment"
              className="flex-1 bg-[#0a0c10] border border-white/[0.1] focus:border-amber-400/50 rounded-md px-3.5 py-2 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none transition-colors"
            />
            <button
              type="submit"
              disabled={!commentInput.trim() || isSubmittingComment}
              className="px-3.5 py-2 bg-slate-100 hover:bg-white active:bg-slate-200 disabled:opacity-40 disabled:cursor-not-allowed text-slate-950 text-xs font-semibold rounded-md transition-all duration-150 cursor-pointer inline-flex items-center gap-1.5 shadow-sm shrink-0"
            >
              <Send className="w-3 h-3" />
              <span>Comment</span>
            </button>
          </form>
        </div>
      )}
    </article>
  );
};
