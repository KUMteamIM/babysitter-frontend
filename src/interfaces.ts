export interface User {
  id: string
  first_name: string
  last_name: string
  email: string
  address: string
  gender: string
  phone: string
  smoker: boolean
  bio: string
  has_pets: boolean
  pay_rate: number
  qualifications: string[]
  locations: object[]
  photo: string
  languages: string[]
  favorites: User[]
  reviews: Rating[]
  average_rating: number
  type: string
  image: string
}

export interface Rating {
  review: string
  stars: number
  job: Job
}

export interface ReduxCurrentUserAction {
  type: string
  payload: User
}

export interface DefaultState {
  currentUser: User | null
}

export const jobtypes = [
  'draft',
  'available',
  'invisble',
  'booked',
  'canceled',
  'complete'
];

export type JobType = typeof jobtypes;

export interface Location {
  street: string
  street2: string
  zip: string
  city: string
  country: string
}

export interface Job {
  id: string
  status: string
  location: Location
  description: string
  infant_count: number
  toddler_count: number
  school_age_count: number
  pay_rate: number
  smoker: boolean
  required_qualifications: Qualification[]
  wanted_languages: string[]
  has_pets: boolean
  start_time: Date
  end_time: Date
  owner: User
  taker: User
  job_requests: JobRequest[]
}

export interface JobRequest {
  status: string
  type: string
  candidate: User
  job: Job
}

export interface Qualification {
  title: string
}


export interface GeoCode {
  lat: number
  lng: number
}
