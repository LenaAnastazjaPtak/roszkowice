import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './Layout'
import HomePage from './pages/HomePage'
import BlogPage from './pages/BlogPage'
import BlogSinglePage from './pages/BlogSinglePage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="blog" element={<BlogPage />} />
          <Route path="blog/post" element={<BlogSinglePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
