import ax from "../axios"

export const loadJob = async (id: number) => {
  const response = await ax.get('/jobs/' + id.toString())
  return response
}

export const loadJobs = async (params: any ) => {
  if(params.status === 'all') delete params.status
  const response = await ax.get(`/jobs?${new URLSearchParams(params).toString()}`);
  return response
}
export const loadJobRequests = async (params: any = null) => {
  let urlParams = params ? `?${new URLSearchParams(params).toString()}` : ''
  const response = await ax.get(`/job_requests${urlParams}`);
  return response
}
