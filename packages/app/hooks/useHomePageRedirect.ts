import { User } from '@koh/common'
import Router from 'next/router'
import { useProfile } from './useProfile'

/**
 * Redirect user to the course apply page if they are a prof with pending courses,
 * or to the today page for their default course.
 */
export function useHomePageRedirect(): boolean {
  const profile: User = useProfile()
  if (profile && profile.pendingCourses && profile.pendingCourses.length > 0) {
    Router.push('/apply')
    return true
  }
  if (profile && profile.courses.length > 0) {
    Router.push('/courses')
    return true
  }
  return false
}
