import { useQuery } from '@tanstack/react-query'
import { useCallback, useState } from 'react'

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

  const selectFn = useCallback((data: Staff[]) => (filter === 'all' ? data : filterByTreatment(data, filter)), [filter])

  const { data: staff = fallback } = useQuery({
    queryKey: [queryKeys.staff],
    queryFn: getStaff,
    select: selectFn,
  })

  return { staff, filter, setFilter }
}
