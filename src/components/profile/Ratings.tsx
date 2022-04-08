import { faStar } from "@fortawesome/free-solid-svg-icons"
import React, { useEffect } from "react"
import { useApiResponse } from "../../custom_hooks/shared"
import { Rating } from "../../interfaces"
import ContentContainer from "../ContentContainer"
import Stars from "../Stars"

interface PropDefs {
  id?: string
}
export const Ratings = ({id}:PropDefs) => {
  const result = useApiResponse(id ? `/users/${id}/ratings` : '')

  return  <ContentContainer result={result} title="ratings" icon={faStar}>
    {result && result[0] && result[0].length ? result[0].map((rating:Rating) => {
      return <div>
        <Stars average={rating.stars} />
        <i>{rating.review}</i><br />
      </div>
    }) : ( <p>Keine Ratings</p>)}
  </ContentContainer>
}

