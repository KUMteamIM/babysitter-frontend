import React from "react";
import { useCurrentUser } from "../custom_hooks/user";
import { Location } from "../interfaces";

interface PropDefs {
  location?: Location
}

export const LocationView = ({location}:PropDefs) => {

  const currentUser = useCurrentUser()

  if(!location) return null

  const calcDist = () => {
    if(!currentUser?.locations || location?.geo_code) return null
  }

  const { street, street2, zip, city, country } = location

  return (
    <p>
      {street}<br />
      {street2 && <>{street2}<br /></>}
      {zip} {city}<br />
      {country}<br />
      <br />
      <br />
      {calcDist()}
    </p>
  )
}

export default LocationView