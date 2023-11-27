import { API } from '@koh/api-client'
import { GetOrganizationResponse } from '@koh/common'
import useSWR, { responseInterface } from 'swr'

type organizationResponse = responseInterface<GetOrganizationResponse, any>

interface UseOrganizationReturn {
  organization?: organizationResponse['data']
  organizationError: organizationResponse['error']
  mutateOrganization: organizationResponse['mutate']
}

export function useOrganization(organizationId: number): UseOrganizationReturn {
  const {
    data: organization,
    error: organizationError,
    mutate: mutateOrganization,
  } = useSWR(
    organizationId && `/api/v1/organizations/${organizationId}`,
    async () => await API.organizations.get(organizationId),
  )

  return {
    organization,
    organizationError,
    mutateOrganization,
  }
}
