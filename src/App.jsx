import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { Flip, ScrollTrigger } from 'gsap/all'
import Lenis from 'lenis'
import Header from './components/Header.jsx'
import ContourVisual from './components/ContourVisual.jsx'
import CookieConsent from './components/CookieConsent.jsx'
import SectionLabel from './components/SectionLabel.jsx'
import MagneticLink from './components/MagneticLink.jsx'
import ReelDeck from './components/ReelDeck.jsx'

gsap.registerPlugin(ScrollTrigger, Flip)
const ThreeScene = lazy(() => import('./components/ThreeScene.jsx'))

export default function App() {
  const appRef = useRef(null)
  const audioRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [formSent, setFormSent] = useState(false)
  const [theme, setTheme] = useState(() => window.localStorage.getItem('farsan-theme') || 'pink')

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const lenis = new Lenis({
      duration: 1.15,
      smoothWheel: !reduceMotion,
      syncTouch: !reduceMotion,
      touchMultiplier: 0.8,
    })
    const raf = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)
    lenis.on('scroll', ScrollTrigger.update)

    const ctx = gsap.context(() => {
      if (!reduceMotion) {
        gsap.timeline({ defaults: { ease: 'power3.out' } })
          .from('.hero-kicker', { y: 22, opacity: 0, duration: 0.7, delay: 0.15 })
          .from('.hero-title .line', { yPercent: 110, opacity: 0, rotate: 2, stagger: 0.1, duration: 1.05 }, '-=0.35')
          .from('.hero-deck, .hero-actions', { y: 18, opacity: 0, duration: 0.7 }, '-=0.45')
          .from('.hero-visual', { scale: 0.88, opacity: 0, duration: 1.2 }, '-=0.85')
        gsap.to('.hero-visual', { y: -18, rotate: 1.3, duration: 5, ease: 'sine.inOut', repeat: -1, yoyo: true })
        gsap.to('.scan-beam', { xPercent: 115, duration: 5.5, ease: 'none', repeat: -1 })
        gsap.utils.toArray('[data-reveal]').forEach((element) => {
          gsap.from(element, {
            y: 46,
            opacity: 0,
            duration: 0.85,
            ease: 'power3.out',
            scrollTrigger: { trigger: element, start: 'top 84%', once: true },
          })
        })
        gsap.from('.about-quote', { x: -28, opacity: 0, duration: 0.9, scrollTrigger: { trigger: '.about-quote', start: 'top 82%', once: true } })
      } else {
        gsap.set('[data-reveal], .hero-kicker, .hero-title .line, .hero-deck, .hero-actions, .hero-visual', { opacity: 1, y: 0 })
      }
    }, appRef)

    const moveOrb = (event) => {
      const x = (event.clientX / window.innerWidth) * 100
      const y = (event.clientY / window.innerHeight) * 100
      appRef.current?.style.setProperty('--pointer-x', `${x}%`)
      appRef.current?.style.setProperty('--pointer-y', `${y}%`)
    }
    window.addEventListener('pointermove', moveOrb, { passive: true })
    return () => {
      window.removeEventListener('pointermove', moveOrb)
      ctx.revert()
      lenis.destroy()
      gsap.ticker.remove(raf)
    }
  }, [])

  const toggleAudio = () => {
    if (!audioRef.current) audioRef.current = new Audio('/song.mp3')
    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false))
    }
  }

  const toggleTheme = () => {
    const nextTheme = theme === 'pink' ? 'blue' : 'pink'
    setTheme(nextTheme)
    window.localStorage.setItem('farsan-theme', nextTheme)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setFormSent(true)
    event.currentTarget.reset()
  }

  return (
    <div className={`app theme-${theme}`} ref={appRef} id="top">
      <div className="pointer-aura" aria-hidden="true" />
      <div className="noise-layer" aria-hidden="true" />
      <Header onToggleAudio={toggleAudio} isPlaying={isPlaying} theme={theme} onToggleTheme={toggleTheme} />

      <main>
        <section className="hero section-pad" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="hero-kicker eyebrow"><span className="status-dot" /> Farsan / 11th standard / making notes</p>
            <h1 className="hero-title" id="hero-title"><span className="line">making things</span><span className="line hero-title--outline">before I’m</span><span className="line">ready<span className="pink">.</span></span></h1>
            <p className="hero-deck">I’m Farsan — a student, tinkerer, and curious person on the internet. This is where I keep the things I’m learning in public.</p>
            <div className="hero-actions">
              <a className="button button--solid" href="#work">see the work <span>↓</span></a>
              <a className="text-link" href="#vibe">a little more about me <span>↗</span></a>
            </div>
          </div>
          <div className="hero-visual" data-reveal>
            <div className="visual-index">01 <span>—</span> 04</div>
            <Suspense fallback={<div className="three-loading" aria-label="Loading interactive contour field" /> }><ThreeScene /></Suspense>
            <div className="three-fallback"><ContourVisual /></div>
            <div className="visual-note">move slowly<br />look closer</div>
          </div>
          <div className="hero-footerline"><span>01 — introduction</span><span>scroll to drift <b>↓</b></span></div>
        </section>

        <section className="marquee-band" aria-label="Site themes"><div className="marquee-track"><span>curious by default</span><i>✳</i><span>made between homework</span><i>✳</i><span>curious by default</span><i>✳</i><span>made between homework</span><i>✳</i></div></section>

        <section className="work section-pad" id="work" aria-labelledby="work-title">
          <div className="section-heading"><SectionLabel index="02" eyebrow="a small reel of the present">the things i’m into</SectionLabel><p id="work-title">Not finished projects. Just the ideas, sounds, and small obsessions shaping what I make next.</p></div>
          <ReelDeck />
        </section>

        <section className="vibe section-pad" id="vibe" aria-labelledby="vibe-title">
          <SectionLabel index="03" eyebrow="a short transmission">the vibe</SectionLabel>
          <div className="vibe-grid">
            <div className="about-quote"><span className="quote-mark">“</span><p>Maybe the point is not to arrive. Maybe it is to notice the strange, glowing little things on the way there.</p><span className="quote-credit">— a note from the late hours</span></div>
            <div className="about-copy" data-reveal>
              <h2 id="vibe-title">No grand plan.<br /><span>Just good questions.</span></h2>
              <p>I like the moment a new idea stops feeling impossible. Chess taught me to look for patterns. Building things taught me that the first version is allowed to be a little strange.</p>
              <p>Right now I’m exploring code, visual design, music, and anything that makes a screen feel more considered.</p>
              <div className="about-signature"><span>Farsan</span><small>trying things since forever</small></div>
            </div>
          </div>
          <div className="vibe-divider"><span /><span /><span /></div>
        </section>

        <section className="contact section-pad" id="contact" aria-labelledby="contact-title">
          <div className="contact-heading"><SectionLabel index="04" eyebrow="leave a signal">say hello</SectionLabel><h2 id="contact-title">Have a strange<br /><span>idea?</span></h2><p>Send it over. I’m usually somewhere between a chess puzzle and a browser tab.</p></div>
          <div className="contact-grid">
            <form className="contact-form glass-card" onSubmit={handleSubmit}>
              <label>Name<input required name="name" placeholder="what should I call you?" /></label>
              <label>Signal<input required type="email" name="email" placeholder="your@email.com" /></label>
              <label>Message<textarea required name="message" rows="4" placeholder="tell me the interesting part..." /></label>
              <button className="button button--solid" type="submit">{formSent ? 'signal received ✓' : 'send the signal ↗'}</button>
            </form>
            <div className="socials">
              <p className="eyebrow">elsewhere on the internet</p>
              <MagneticLink href="https://instagram.com/shepzyy" label="Instagram" detail="@shepzyy" />
              <MagneticLink href="https://t.me/shepzyy" label="Telegram" detail="t.me/shepzyy" />
              <MagneticLink href="https://github.com/vizmorax" label="GitHub" detail="/vizmorax" />
              <MagneticLink href="https://www.chess.com/member/shifuttan" label="Chess.com" detail="/shifuttan" />
              <MagneticLink href="https://open.spotify.com/user/31zweoeachkst725zgcdb5ybgi4u" label="Spotify" detail="late-night rotation" />
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer"><a className="wordmark" href="#top"><span className="wordmark-mark" aria-hidden="true">◌</span> farsan<span className="wordmark-dot">.</span></a><span>© 2026 — made with curiosity</span><span className="footer-links"><a href="/privacy">privacy</a><a href="#top">back to top ↑</a></span></footer>
      <CookieConsent />
    </div>
  )
}
