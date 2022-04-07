import React from "react";

interface PropDefs {
  average?: number
}
export const Stars = ({average}:PropDefs) => {
  return <div>
    {average}
  </div>
}

export default Stars
