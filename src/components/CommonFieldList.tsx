import React from "react";

interface PropDefs {
  data: any;
}

export const CommonFieldList = ({ data }: PropDefs) => {
  if (!data) return null;

  const buildData = () => {
    const entries = Object.entries(data).map(([key, value]) => {
      if (typeof value !== "object")
        return (
          <li key={key}>
            <>
              {key}: {value}
            </>
          </li>
        );
    });
    return entries;
  };

  return (
    <div>
      <ul>{buildData()}</ul>
    </div>
  );
};

export default CommonFieldList;
