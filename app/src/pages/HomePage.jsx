import SliderSection from '../components/SliderSection'
import WelcomeSection from '../components/WelcomeSection'
import GallerySection from '../components/GallerySection'
import LatestBlogSection from '../components/LatestBlogSection'
import OnviewSection from '../components/OnviewSection'

function HomePage() {
  return (
    <>
      <SliderSection />
      <WelcomeSection />
      <OnviewSection showReadMore />
      <GallerySection />
      <LatestBlogSection />
    </>
  )
}

export default HomePage
