import { useQuery } from '@tanstack/react-query'

import type { Treatment } from '@shared/types'

import { axiosInstance } from '@/axiosInstance'
import { queryKeys } from '@/react-query/constants'

// for when we need a query function for useQuery
async function getTreatments() {
  const { data } = await axiosInstance.get<Treatment[]>('/treatments')
  return data
}

export function useTreatments() {
  const fallbackData: Treatment[] = []

  const { data = fallbackData } = useQuery({ queryKey: [queryKeys.treatments], queryFn: getTreatments })

  return data
}
