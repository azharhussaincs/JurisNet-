import React, { useState } from 'react';
import { TopNav } from './navigation/TopNav.tsx';
import { MobileNav } from './navigation/MobileNav.tsx';
import { HomeFeed } from './feed/HomeFeed.tsx';
import { ProfileView } from './profile/ProfileView.tsx';
import { NetworkView } from './network/NetworkView.tsx';
import { DiscoverLawyersView } from './discover/DiscoverLawyersView.tsx';
import {
  currentLoggedInLawyer,
  sampleLawyers,
  initialPosts,
  initialConnections,
} from '../data/mockLegalData.ts';
import { NavSection, Lawyer, Post, ConnectionItem } from '../types/index.ts';
import { ArrowLeft, Scale } from 'lucide-react';

interface LawyerNetworkShellProps {
  onBackToIntro: () => void;
}

export const LawyerNetworkShell: React.FC<LawyerNetworkShellProps> = ({
  onBackToIntro,
}) => {
  // Navigation & View State
  const [currentSection, setCurrentSection] = useState<NavSection>('home');
  const [activeProfileLawyer, setActiveProfileLawyer] = useState<Lawyer | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPracticeFilter, setSelectedPracticeFilter] = useState('All Insights');

  // Application Data States
  const [currentUser, setCurrentUser] = useState<Lawyer>(currentLoggedInLawyer);
  const [lawyersList, setLawyersList] = useState<Lawyer[]>(sampleLawyers);
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [connections, setConnections] = useState<ConnectionItem[]>(initialConnections);

  // Connection Handler: Send connection request
  const handleConnectWithLawyer = (lawyer: Lawyer) => {
    setConnections((prev) => {
      const exists = prev.find((c) => c.lawyer.id === lawyer.id);
      if (exists) return prev;
      return [
        ...prev,
        {
          lawyer,
          status: 'pending_sent',
        },
      ];
    });
  };

  // Connection Handler: Accept received inquiry
  const handleAcceptConnection = (lawyerId: string) => {
    setConnections((prev) =>
      prev.map((c) => {
        if (c.lawyer.id === lawyerId) {
          return {
            ...c,
            status: 'connected',
            connectedDate: 'Today',
          };
        }
        return c;
      })
    );
    // Increase current user's connection count
    setCurrentUser((prev) => ({
      ...prev,
      connectionsCount: prev.connectionsCount + 1,
    }));
  };

  // Connection Handler: Decline received inquiry
  const handleDeclineConnection = (lawyerId: string) => {
    setConnections((prev) => prev.filter((c) => c.lawyer.id !== lawyerId));
  };

  // Connection Handler: Disconnect
  const handleRemoveConnection = (lawyerId: string) => {
    setConnections((prev) => prev.filter((c) => c.lawyer.id !== lawyerId));
    setCurrentUser((prev) => ({
      ...prev,
      connectionsCount: Math.max(0, prev.connectionsCount - 1),
    }));
  };

  // Post Actions: Add new post
  const handleAddPost = (newPostData: Omit<Post, 'id' | 'author' | 'timestamp' | 'agreesCount' | 'commentsCount' | 'sharesCount' | 'comments'>) => {
    const newPost: Post = {
      ...newPostData,
      id: `post-${Date.now()}`,
      author: currentUser,
      timestamp: 'Just now',
      agreesCount: 0,
      commentsCount: 0,
      sharesCount: 0,
      comments: [],
    };
    setPosts([newPost, ...posts]);
  };

  // Post Actions: Toggle Agree
  const handleToggleAgree = (postId: string) => {
    setPosts((prev) =>
      prev.map((post) => {
        if (post.id === postId) {
          const agreed = !post.userAgreed;
          return {
            ...post,
            userAgreed: agreed,
            agreesCount: agreed ? post.agreesCount + 1 : post.agreesCount - 1,
          };
        }
        return post;
      })
    );
  };

  // Post Actions: Toggle Bookmark
  const handleToggleBookmark = (postId: string) => {
    setPosts((prev) =>
      prev.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            userBookmarked: !post.userBookmarked,
          };
        }
        return post;
      })
    );
  };

  // Post Actions: Share Post
  const handleSharePost = (postId: string) => {
    setPosts((prev) =>
      prev.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            sharesCount: post.sharesCount + 1,
          };
        }
        return post;
      })
    );
  };

  // Post Actions: Add Comment
  const handleAddComment = (postId: string, text: string) => {
    setPosts((prev) =>
      prev.map((post) => {
        if (post.id === postId) {
          const newComment = {
            id: `c-${Date.now()}`,
            authorId: currentUser.id,
            authorName: currentUser.name,
            authorTitle: currentUser.title,
            authorInitials: currentUser.avatarInitials,
            content: text,
            timestamp: 'Just now',
            agreeCount: 0,
          };
          return {
            ...post,
            commentsCount: post.comments.length + 1,
            comments: [...post.comments, newComment],
          };
        }
        return post;
      })
    );
  };

  // Profile Update Handler
  const handleUpdateProfile = (updatedData: Partial<Lawyer>) => {
    setCurrentUser((prev) => {
      const updated = { ...prev, ...updatedData };
      if (activeProfileLawyer && activeProfileLawyer.id === prev.id) {
        setActiveProfileLawyer(updated);
      }
      return updated;
    });

    if (updatedData.name || updatedData.title || updatedData.firmOrChambers) {
      setPosts((prevPosts) =>
        prevPosts.map((post) => {
          if (post.author.id === currentUser.id) {
            return {
              ...post,
              author: {
                ...post.author,
                name: updatedData.name ?? post.author.name,
                title: updatedData.title ?? post.author.title,
                firmOrChambers: updatedData.firmOrChambers ?? post.author.firmOrChambers,
              },
            };
          }
          return post;
        })
      );
    }
  };

  // Profile View Handler
  const handleViewLawyerProfile = (lawyer: Lawyer) => {
    setActiveProfileLawyer(lawyer);
    setCurrentSection('profile');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Navigation Switching Handler
  const handleSelectSection = (section: NavSection) => {
    if (section === 'profile') {
      setActiveProfileLawyer(currentUser);
    } else {
      setActiveProfileLawyer(null);
    }
    setCurrentSection(section);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const displayedProfileLawyer = activeProfileLawyer || currentUser;
  const isProfileCurrentUser = displayedProfileLawyer.id === currentUser.id;
  const isProfileConnected = connections.some(
    (c) => c.lawyer.id === displayedProfileLawyer.id && c.status === 'connected'
  );
  const isProfilePending = connections.some(
    (c) => c.lawyer.id === displayedProfileLawyer.id && c.status === 'pending_sent'
  );

  return (
    <div className="min-h-screen w-full bg-[#0a0c10] text-slate-100 flex flex-col font-sans-legal pb-16 md:pb-6">
      {/* Top Header Navigation */}
      <TopNav
        currentSection={currentSection}
        onSelectSection={handleSelectSection}
        currentUser={currentUser}
        onBackToIntro={onBackToIntro}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onViewLawyerProfile={handleViewLawyerProfile}
      />

      {/* Main Content Area */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Section Views */}
        {currentSection === 'home' && (
          <HomeFeed
            currentUser={currentUser}
            posts={posts}
            onAddPost={handleAddPost}
            onToggleAgree={handleToggleAgree}
            onToggleBookmark={handleToggleBookmark}
            onAddComment={handleAddComment}
            onViewLawyerProfile={handleViewLawyerProfile}
            onConnectWithLawyer={handleConnectWithLawyer}
            onSharePost={handleSharePost}
            suggestedLawyers={lawyersList}
            connections={connections}
            selectedPracticeFilter={selectedPracticeFilter}
            onSelectPracticeFilter={setSelectedPracticeFilter}
          />
        )}

        {currentSection === 'profile' && (
          <ProfileView
            lawyer={displayedProfileLawyer}
            isCurrentUser={isProfileCurrentUser}
            onUpdateProfile={isProfileCurrentUser ? handleUpdateProfile : undefined}
            onConnect={handleConnectWithLawyer}
            isConnected={isProfileConnected}
            isPending={isProfilePending}
            posts={posts}
            onToggleAgree={handleToggleAgree}
            onToggleBookmark={handleToggleBookmark}
            onAddComment={handleAddComment}
            onViewLawyerProfile={handleViewLawyerProfile}
            onSharePost={handleSharePost}
            onBack={() => handleSelectSection('discover')}
          />
        )}

        {currentSection === 'network' && (
          <NetworkView
            connections={connections}
            onAcceptConnection={handleAcceptConnection}
            onDeclineConnection={handleDeclineConnection}
            onRemoveConnection={handleRemoveConnection}
            onViewLawyerProfile={handleViewLawyerProfile}
            onNavigateToDiscover={() => handleSelectSection('discover')}
          />
        )}

        {currentSection === 'discover' && (
          <DiscoverLawyersView
            lawyers={lawyersList}
            connections={connections}
            onConnect={handleConnectWithLawyer}
            onViewProfile={handleViewLawyerProfile}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
        )}
      </div>

      {/* Institutional Network Footer */}
      <footer className="w-full border-t border-white/[0.06] bg-[#090b0e] py-6 px-4 sm:px-6 lg:px-8 mt-12 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Scale className="w-4 h-4 text-amber-400/70" />
            <span className="font-serif-legal font-medium text-slate-300">
              JurisNet Legal Professional Network
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px] font-mono">
            <button
              onClick={onBackToIntro}
              type="button"
              className="text-slate-400 hover:text-amber-200 transition-colors cursor-pointer"
            >
              Developer Group
            </button>
            <span>&middot;</span>
            <span>Verified Bar Registry</span>
            <span>&middot;</span>
            <span>Confidentiality Protected</span>
          </div>
        </div>
      </footer>

      {/* Mobile Sticky Navigation Dock */}
      <MobileNav
        currentSection={currentSection}
        onSelectSection={handleSelectSection}
      />
    </div>
  );
};
