import { QueryProvider } from '@/lib/react-query/QueryProvider'
import { InfinitePeople } from '@/people/InfinitePeople'
import { InfiniteSpecies } from '@/species/InfiniteSpecies'
import '@/App.css'

function App() {
  return (
    <QueryProvider>
      <div className="App">
        <h1>Infinite SWAPI</h1>
        {/* <InfinitePeople /> */}
        <InfiniteSpecies />
      </div>
    </QueryProvider>
  )
}

export default App
