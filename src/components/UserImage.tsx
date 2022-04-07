import React from "react";
import Image from "react-bootstrap/Image";

interface PropDefs {
  src?: string
  type?: string
}

const UserImage = ({src, type}:PropDefs) => {
  return <Image src={src} className={`profile-picture ${type}`} />
}

UserImage.defaultProps = { src: '/images/default-user.png', type: 'small' }

export default UserImage