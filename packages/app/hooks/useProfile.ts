import useSWR from 'swr'
import { API } from '@koh/api-client'
import Router, { useRouter } from 'next/router'
import { User } from '@koh/common'

type Hook = () => User

export const useProfile: Hook = () => {
  const { pathname } = useRouter()
  const { data, error } = useSWR(
    `api/v1/profile`,
    async () => await API.profile.index(),
  )

  if (error?.response?.status === 401 && pathname !== '/login') {
    Router.push('/login')
  } else if (error?.response?.status === 403 && pathname !== '/login') {
    Router.push('/api/v1/logout')
  } else if (data) {
    return data
  }
}
