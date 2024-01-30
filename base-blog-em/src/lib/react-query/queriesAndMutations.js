import productsApi from '@/apis/products.api'
import { useQuery } from '@tanstack/react-query'

export function useGetProducts() {
  return useQuery({ queryKey: ['products'], queryFn: productsApi.getProducts })
}
