export interface User {
  id: string
  title: string,
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
  locations: Location[]
  photo: string
  languages: string[]
  favorites: User[]
  reviews: Rating[]
  jobs: Job[]
  average_rating: number
  type: UserType
  image: string
  availability: Availability
}

export type UserType = 'owner' | 'taker'

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

export interface Location {
  id: number
  street: string
  street2: string
  zip: string
  city: string
  country: string
  geo_code?: GeoCode
}

export interface Job {
  id: string
  status: JobStatus
  location?: Location
  description: string
  infant_count: number
  toddler_count: number
  school_age_count: number
  pay_rate: number
  smoker: boolean
  required_qualifications?: Qualification[]
  wanted_languages?: string[]
  has_pets: boolean
  start_time: Date|string
  end_time: Date|string
  owner?: User|null
  taker?: User|null
  job_requests?: JobRequest[]
}

export interface Availability {
  start_time: Date|string
  end_time: Date|string
  repeats: boolean
  days: string[]
  status: AvailabilityStatus
}

export type AvailabilityStatus = 'not_available' | 'available' | 'on_request'

export interface JobRequest {
  id: number
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

export type JobStatus =  'draft' | 'available' | 'invisble' | 'booked' | 'canceled' | 'complete'
export type JobRequestStatus =  'open' | 'canceled' | 'expired' | 'declined' | 'accepted'
export type JobRequestType =  'offer' | 'request'

export interface JobDetails {
  start_time: Date
  end_time: Date
  hours: number
  minutes: number
  milliseconds: number
  total_pay: number
  total_kids: number
  pay_rate: number
}

export interface RequestParams {
  status?: JobStatus
  limit?: number
  page?: number
  query?: string
  start_time?: Date
  end_time?: Date
  start_hour?: number
  end_hour?: number
  user_id?: number|string
}

export interface ApiResponse {
  status: number,
  message: string,
  errors?: string[]
}

export interface ApiHook extends Array<object|Job|Array<object>|boolean|Error|null>{0:Array<object>|Array<Job>|object|null; 1:boolean, 2:Error|null}

export interface ApiDataResponse {
  data: object
}

export interface JobHook extends Array<Job|boolean|Error|null>{0:Job|null, 1:boolean, 2:Error|null}
export interface UserHook extends Array<User|boolean|Error|null>{0:User|null, 1:boolean, 2:Error|null}
export interface RatingsHook extends Array<Array<Rating>|boolean|Error|null>{0:Array<Rating>|null, 1:boolean, 2:Error|null}