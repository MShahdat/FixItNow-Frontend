export type TechnicianRatingBreakdown = Record<1 | 2 | 3 | 4 | 5, number>

export interface TechnicianReviewCustomer {
  id: string
  name: string
  avatarUrl?: string
}

export interface TechnicianReview {
  id: string
  rating: number
  comment: string
  createdAt: string
  customer: TechnicianReviewCustomer
}

export type TechnicianServiceCategory = "REPAIR" | "INSTALL" | "EMERGENCY" | string

export interface TechnicianService {
  id: string
  name: string
  description: string
  category: TechnicianServiceCategory
  hourlyRate: number
}

export interface TechnicianProfileData {
  id: string
  name: string
  avatarUrl?: string
  isVerified?: boolean
  isTopRated?: boolean
  city?: string
  yearsOfExperience?: number
  avgRating: number
  totalReviews: number
  hourlyRate: number
  bio?: string
  skills?: string[]
  services: TechnicianService[]
  reviews: TechnicianReview[]
  ratingBreakdown: TechnicianRatingBreakdown
}
