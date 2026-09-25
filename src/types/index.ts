export type NavSection = 'home' | 'profile' | 'network' | 'discover';

export interface Lawyer {
  id: string;
  name: string;
  title: string;
  firmOrChambers: string;
  practiceAreas: string[];
  jurisdiction: string;
  barNumber: string;
  location: string;
  bio: string;
  connectionsCount: number;
  mutualConnections: number;
  avatarInitials: string;
  avatarColor: string;
  isVerified: boolean;
  education: {
    institution: string;
    degree: string;
    year: string;
  }[];
  experience: {
    role: string;
    organization: string;
    period: string;
    description: string;
  }[];
  honors?: string[];
  admissions: string[];
  interests?: string[];
}

export interface PostComment {
  id: string;
  authorId: string;
  authorName: string;
  authorTitle: string;
  authorInitials: string;
  content: string;
  timestamp: string;
  agreeCount: number;
  userAgreed?: boolean;
}

export interface Post {
  id: string;
  author: Lawyer;
  timestamp: string;
  content: string;
  practiceTag: string;
  precedentCitation?: string;
  imageUrl?: string;
  imageCaption?: string;
  postType?: 'development' | 'insight' | 'achievement' | 'symposium' | 'research';
  agreesCount: number;
  commentsCount: number;
  sharesCount: number;
  userAgreed?: boolean;
  userBookmarked?: boolean;
  comments: PostComment[];
}

export interface ConnectionItem {
  lawyer: Lawyer;
  status: 'connected' | 'pending_received' | 'pending_sent';
  connectedDate?: string;
  note?: string;
}
