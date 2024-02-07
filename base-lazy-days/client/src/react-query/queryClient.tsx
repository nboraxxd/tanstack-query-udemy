import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import { toast } from '@/components/app/toast'

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => errorHandler(error.message),
  }),
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
})

export default function QueryProvider({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

function errorHandler(errorMsg: string) {
  // https://chakra-ui.com/docs/components/toast#preventing-duplicate-toast
  // one message per page load, not one message per query
  // the user doesn't care that there were three failed queries on the staff page
  //    (staff, treatments, user)
  const id = 'react-query-toast'

  if (!toast.isActive(id)) {
    const action = 'fetch'
    const title = `could not ${action} data: ${errorMsg ?? 'error connecting to server'}`
    toast({ id, title, status: 'error', variant: 'subtle', isClosable: true })
  }
}
