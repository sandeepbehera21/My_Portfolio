import Splash from './components/Splash'
import LandingHero from './components/LandingHero'
import Nav from './components/Nav'
import Spotlight from './components/Spotlight'
import BackToTop from './components/BackToTop'
import Hero from './sections/Hero'
import About from './sections/About'
import Skills from './sections/Skills'
import Projects from './sections/Projects'
import Experience from './sections/Experience'
import SystemDesign from './sections/SystemDesign'
import Contact from './sections/Contact'
import Footer from './sections/Footer'

export default function App() {
  return (
    <div className="min-h-screen">
      <a
        href="#home"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[10000] focus:px-4 focus:py-2 focus:rounded-lg btn-primary"
      >
        Skip to content
      </a>
      <Splash />
      <Spotlight />
      <LandingHero />
      <Nav />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <SystemDesign />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </div>
  )
}
