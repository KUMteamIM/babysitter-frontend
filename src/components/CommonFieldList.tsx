import React from "react";

interface PropDefs {
  data: any
}

export const CommonFieldList = ({data}:PropDefs) => {
  if(!data) return null
  const dataEntries = Object.entries(data).map(([key, value]) => {
    console.log(key, value)
    if(typeof value !== 'object') return <li>{key}: {value}</li>
  })

  return <div><ul>
    {dataEntries}
    </ul></div>
}

export default CommonFieldList
