import ax from "../axios"

export const loadJob = async (id: number) => {
  const response = await ax.get('/jobs/' + id.toString())
  return response
}

export const loadJobs = async (params: any ) => {
  const response = await ax.get(`/jobs?${new URLSearchParams(params).toString()}`);
  return response
}
