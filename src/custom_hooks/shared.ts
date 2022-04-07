import React, { useEffect, useState } from "react";
import ax from "../axios";

export const useApiResponse = (path: string, method: string = 'get', params: any = null): Array<any> => {
  const [response, setResponse] = useState<any>(null)
  const [error, setError] = useState<Error|null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    if(!path) return
    let promise: any;
    setError(null)
    setLoading(true)

    console.log(`${method} from ${path}`)

    if(method === 'post') {
      promise = ax.post(path, params)
    } else {
      let urlParams: string = params ? `?${new URLSearchParams(params).toString()}` : ''
      promise = ax.get(`${path}${urlParams}`)
    }

    promise.then((res: any) => {
      setLoading(false)
      setResponse(res)
    })
    .catch((e:Error) => {
      setLoading(false)
      setError(e)
    })
  }, [path, params, method])

  return [response, loading, error]
}