export type ROLE = 'CUSTOMER' | 'ADMIN' | 'TECHNICIAN'


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
