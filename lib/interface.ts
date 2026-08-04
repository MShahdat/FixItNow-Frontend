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


export interface AuthResponse<T> {
  success: boolean
  statusCode?: number
  message?: string
  data?: T | null
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


export interface IUser {
  id: string
  role: ROLE
  fullName: string
  email: string
  phone: string
  profileImage?: string
  address?: string
  city?: string
  status: UserStatus
  profileId: string
  bio?: string
  skills: string[]
  experience: number
  hourlyRate: number
  completedJobs: number
  availability: string[]
  createdAt: string
  updatedAt: string
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
  description: string
  status: 'ACTIVE' | "IN_ACTIVE"
}



export interface IServiceCreate {
  categoryId: string
  cover: string,
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




export interface IBookingService {
  title: string
  description: string
  duration: string
  location: string[]
}


export interface IBooking {
  id: string
  scheduledDate: string
  address: string
  note?: string
  totalAmount: string
  status: BookingStatus
  cancelReason?: string
  acceptedAt?: string
  canceledAt?: string
  service: IBookingService
}




export interface ITechnicianService {
  id: string;
  technicianProfileId: string;
  categoryId: string;
  cover: string;
  title: string;
  description: string;
  price: string;
  type: string;
  duration: string;
  location: string[];
  availableAt: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ITechnicianProfile {
  bio: string;
  availability: string[];
  experience: number;
  hourlyRate: string;
  skills: string[];
  services: ITechnicianService[];
}

export interface ITechnicianReview {
  id: string
  rating: number
  comment: string
}

export interface ITechnician {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  profileImage: string;
  address: string;
  city: string;
  role: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  technicianProfile: ITechnicianProfile;
  reviews: ITechnicianReview[];
}

export interface ITechnicianResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: ITechnician;
}



export interface IPaymentHistory {
  bookingId: string;
  customerName: string;
  technicianName: string;
  serviceTitle: string;
  serviceType: string;
  amount: number;
  status: PaymentStatus;
  transactionId: string;
  paymentIntentId: string;
  paidAt: string;
}