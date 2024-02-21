import { UserOutlined } from '@ant-design/icons'
import { Avatar } from 'antd'
import React, { ReactElement } from 'react'
import { useProfile } from '../../hooks/useProfile'
import AvatarWithInitals from './AvatarWithInitials'

type SelfAvatarProps = {
  size: number
  style?: any
  className?: string
}

type KOHAvatarProps = {
  size: number
  photoURL: string
  name: string
  style?: any
  className?: string
}

export default function SelfAvatar({
  size,
  style,
  className,
}: SelfAvatarProps): ReactElement {
  const profile = useProfile()

  return (
    <KOHAvatar
      size={size}
      photoURL={profile?.photoURL}
      name={profile?.name}
      style={style}
      className={className}
    />
  )
}

export function KOHAvatar({
  size,
  photoURL,
  name,
  style,
  className,
}: KOHAvatarProps): ReactElement {
  return photoURL ? (
    <Avatar
      icon={<UserOutlined />}
      src={
        photoURL && photoURL.startsWith('http')
          ? photoURL
          : '/api/v1/profile/get_picture/' + photoURL
      }
      size={size}
      style={style}
      className={className}
    />
  ) : (
    <AvatarWithInitals
      name={name}
      size={size}
      fontSize={(3 / 7) * size}
      style={style}
      className={className}
    />
  )
}
