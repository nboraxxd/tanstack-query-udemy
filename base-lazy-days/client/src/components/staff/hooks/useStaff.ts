import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

import type { Staff } from '@shared/types'

import { axiosInstance } from '@/axiosInstance'
import { filterByTreatment } from '@/components/staff/utils'
import { queryKeys } from '@/react-query/constants'

// query function for useQuery
async function getStaff() {
  const { data } = await axiosInstance.get<Promise<Staff[]>>('/staff')
  return data
}

export function useStaff() {
  // for filtering staff by treatment
  const [filter, setFilter] = useState('all')

  // TODO: get data from server via useQuery
  const fallback: Staff[] = []

  const { data = fallback } = useQuery({ queryKey: [queryKeys.staff], queryFn: getStaff })

  // filter staff by treatment
  const filteredStaff = filter === 'all' ? data : filterByTreatment(data, filter)

  return { staff: filteredStaff, filter, setFilter }
}
