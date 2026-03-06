import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './Layout'
import HomePage from './pages/HomePage'
import BlogPage from './pages/BlogPage'
import BlogSinglePage from './pages/BlogSinglePage'
import ContactPage from './pages/ContactPage'
import RegulaminPage from './pages/RegulaminPage'
import PolitykaPrywatnosciPage from './pages/PolitykaPrywatnosciPage'
import GalleryPage from './pages/GalleryPage'
import AboutPage from './pages/AboutPage'
import NotFoundPage from './pages/NotFoundPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="blog" element={<BlogPage />} />
          <Route path="blog/post" element={<BlogSinglePage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="gallery" element={<GalleryPage />} />
          <Route path="terms" element={<RegulaminPage />} />
          <Route path="privacy-policy" element={<PolitykaPrywatnosciPage />} />
          <Route path="404" element={<NotFoundPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
