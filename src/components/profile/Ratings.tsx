import { faStar } from "@fortawesome/free-solid-svg-icons"
import React, { useEffect } from "react"
import { useApiResponse } from "../../custom_hooks/shared"
import { Rating } from "../../interfaces"
import ContentContainer from "../ContentContainer"

interface PropDefs {
  id?: string
}

export const Ratings = ({id}:PropDefs) => {
  const [response, loading, error] = useApiResponse(id ? `/users/${id}/ratings` : '')
  return  <ContentContainer title="ratings" icon={faStar}>

  </ContentContainer>
}

