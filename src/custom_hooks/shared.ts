import React, { useEffect, useState } from "react";
import ax from "../axios";

export const useApiResponse = (path: string, method: string = 'get', params: any = null): Array<any> => {
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