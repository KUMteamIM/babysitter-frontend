import React from "react";

interface PropDefs {
  data: any
}

export const CommonFieldList = ({data}:PropDefs) => {
  if(!data) return null
  const dataEntries = Object.entries(data).map(([key, value]) => {
    if(typeof value !== 'object') return <li key={key}>{key}: {value}</li>
  })

  return <div><ul>
    {dataEntries}
    </ul></div>
}

export default CommonFieldList
