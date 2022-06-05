import React, { useEffect, useState } from "react";
import ax from "../axios";
import { ApiHook, Job, User } from "../interfaces";

export const useApiResponse = (path: string, method: string = 'get', params: any = null): ApiHook => {
  const [response, setResponse] = useState<any>(null)
  const [error, setError] = useState<Error|null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [myParams, setMyParams] = useState<any>(null)

  useEffect(() => {
    if(!path) return

    let promise: any;
    setError(null)
    setLoading(true)

    if(method === 'post') {
      promise = ax.post(path, params)
    } else {
      let urlParams: string = params ? `?${new URLSearchParams(params).toString()}` : ''
      promise = ax.get(`${path}.json${urlParams}`)
    }

    promise.then((res: any) => {
      setLoading(false)
      setResponse(res.data)
    })
    .catch((e:Error) => {
      setLoading(false)
      setError(e)
    })
  }, [path, method, myParams])

  useEffect(() => {
    if(JSON.stringify(params) !== JSON.stringify(myParams)) {
      setMyParams(params)
    }
  }, [params])

  return [response, loading, error]
}

export const useUser = (id:string|number|undefined):ApiHook => {
  const result = useApiResponse(id ? `users/${id}` : '')
  if(result[0] && result[0].hasOwnProperty('data')) {
    const giveAttribute: any = result[0]
    return [giveAttribute.data as User, result[1], result[2]]
  }
  return result
}

export const useJob = (id:string|number|undefined):ApiHook => {
  const result = useApiResponse(id ? `/jobs/${id}` : '')
  return [result[0] as Job, result[1], result[2]]
}

export const useUserJobs = (id:string|number|undefined, params: any = null):ApiHook => {
  const result = useApiResponse(id ? `jobs` : '', 'get', { user_id: id, status: 'booked' })
  return [result[0] as Job[], result[1], result[2]]
}

export const useLocation = (id:string|number|null):ApiHook => {
  const result = useApiResponse(id ? `/location/${id}` : '')
  return [result[0] as Location, result[1], result[2]]
}