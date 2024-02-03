import InfiniteScroll from 'react-infinite-scroller'
import { Person } from './Person'
import { useInfiniteQuery } from '@tanstack/react-query'

const initialUrl = 'https://swapi.dev/api/people/'
const fetchUrl = async (url) => {
  const response = await fetch(url)
  return response.json()
}

export function InfinitePeople() {
  // TODO: get data for InfiniteScroll via React Query
  const { data, fetchNextPage, hasNextPage, isFetching, isLoading, isError } = useInfiniteQuery({
    queryKey: ['sw-people'],
    queryFn: ({ pageParam = initialUrl }) => fetchUrl(pageParam),
    getNextPageParam: (lastPage) => lastPage.next || undefined,
  })

  if (isLoading) return <p className="loading">Loading...</p>

  if (isError) return <p>Something went wrong</p>

  return (
    <>
    {isFetching && <p className="loading">Loading...</p>}
    {!hasNextPage && <p className="loading">No more people to load</p>}
      <InfiniteScroll
        loadMore={() => {
          if (!isFetching) fetchNextPage()
        }}
        hasMore={hasNextPage}
      >
        {data.pages.map((page) =>
          page.results.map((person) => (
            <Person key={person.name} name={person.name} eyeColor={person.eye_color} hairColor={person.hair_color} />
          ))
        )}
      </InfiniteScroll>
    </>
  )
}
