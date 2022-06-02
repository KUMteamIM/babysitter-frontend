import { AxiosPromise } from "axios"
import ax from "../axios"
import { Job } from "../interfaces"

export const updateJobListing = (details: Job):AxiosPromise => {
  return ax.patch(`/jobs/${details.id}`, details)
}
export const createJobListing = (details: Job):AxiosPromise => {
  return ax.post(`/jobs`, details)
}
