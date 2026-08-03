export type ROLE = 'CUSTOMER' | 'ADMIN' | 'TECHNICIAN'

export type UserStatus = "ACTIVE" | "BLOCKED"

export type BookingStatus = "REQUESTED" | "ACCEPTED" | "DECLINED" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED";


export type PaymentStatus = "PAID" | "PENDING" | "FAILED" | "REFUND";


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
  cover: string
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



export type Meta = {
  total: number
  page: number
  limit: number
  totalPage: number
}

export type PaginationsProps = {
  meta: Meta
}



export interface MY_SERVICE {
  id: string
  technicianProfileId: string
  categoryId: string
  cover: string
  title: string
  description: string
  price: string
  type: string
  duration: string
  location: string[]
  availableAt: string[]
  isActive: boolean
}


export interface Review {
  id: string
  rating: number
  comment: string
  createdAt: string
  updatedAt: string
}


export interface Booking {
  id: string
  serviceTitle: string
  technicianName: string
  type: "one-time" | "recurring" | "package"
  duration: string
  scheduledDate: string
  status: BookingStatus
  totalAmount: number
  review: Review
}



export interface Categories {
  id: string
  name: string
}



export interface IServiceCreate {
  categoryId: string
  // cover: string,
  title: string
  description: string
  price: number
  type: string
  location: string[]
  duration: string
  availableAt: string[]
}




export interface IServiceUpdate {
  title?: string
  cover?: string
  description?: string
  type?: string,
  price?: number
  location?: string[]
  duration?: string
  availableAt?: string[]
}




export interface BookingTech {
  id: string
  customer: {
    firstName: string
    lastName: string
  }
  totalAmount: string
  service: {
    title: string
    duration: string
    type: string
  }
  scheduledDate: string
  status: BookingStatus
}


export interface IBookingPaymentDetails {
  id: string;
  transactionId: string;
  paymentIntentId: string;
  amount: string;
  paymentStatus: PaymentStatus;
  paidAt: string;
  bookingStatus: BookingStatus;
  scheduledDate: string;
}



export interface IncomingBook {
  bookingId: string
  profileImage: string
  customerName: string
  serviceName: string
  scheduledDate: string
  totalAmount: string
}