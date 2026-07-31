export type ROLE = 'CUSTOMER' | 'ADMIN' | 'TECHNICIAN'

export type UserStatus = "ACTIVE" | "BLOCKED"


export type LoginState = {
  success: boolean
  statuscode: number
  message: string
  data: {
    accessToken: string
    refreshToken: string
  }
}


export interface Service {
  id: string
  title: string
  description: string
  price: number
  duration: number
  type: string
  technician: {
    user: {
      firstName: true,
      lastName: true
    }
  },
  reviews: {
    rating: true
  }
}



export interface Technician {
  id: string
  firstName: string,
  lastName: string,
  profileImage: string,
  technicianProfile: {
    hourlyRate: number,
    completedJobs: number,
    reviews: {
      rating: number
    }
  }
}


export type TUser = {
  success: boolean
  message: string
  data: {
    id: string
    firstName: string
    lastName: string
    email: string
    phone: string
    profileImage?: string
    address?: string
    city?: string
    role: ROLE
    activeStatus: string
    status: UserStatus
    createdAt?: string
    updatedAt?: string
    technicianProfile?: {
      id: string
      userId: string
      bio?: string
      skills: string[]
      experience: number
      hourlyRate: number
      completedJobs: number
      availability: string[]
      createdAt: string
      updatedAt: string
    }
  }
}


export interface NavbarProps {
  user: TUser
}
