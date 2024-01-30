import { Posts } from './Posts'
import './App.css'
import { QueryProvider } from '@/lib/react-query/QueryProvider'

function App() {
  return (
    // provide React Query client to App
    <QueryProvider>
      <div className="App">
        <h1>Blog &apos;em Ipsum</h1>
        <Posts />
      </div>
    </QueryProvider>
  )
}

export default App
