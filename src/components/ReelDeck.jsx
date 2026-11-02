import { useRef, useState } from 'react'
import gsap from 'gsap'

const reels = [
  { number: '01', kicker: 'right now', title: 'making things\nbefore ready', body: 'A small place for experiments that are still finding their shape.', glyph: '✳' },
  { number: '02', kicker: 'on repeat', title: 'songs for\nopen tabs', body: 'Late-night soundtracks, half-finished ideas, and the tabs I keep returning to.', glyph: '◌' },
  { number: '03', kicker: 'next up', title: 'something\nworth sharing', body: 'The first real project is being made slowly. It will arrive here when it has a reason to exist.', glyph: '↗' },
]

export default function ReelDeck() {
  const [active, setActive] = useState(0)
  const startX = useRef(null)
  const deckRef = useRef(null)

  const goTo = (index) => {
    const next = (index + reels.length) % reels.length
    setActive(next)
    if (deckRef.current) gsap.fromTo(deckRef.current, { x: next > active ? 22 : -22 }, { x: 0, duration: .55, ease: 'power3.out' })
  }
  const onPointerDown = (event) => { startX.current = event.clientX }
  const onPointerUp = (event) => {
    if (startX.current === null) return
    const distance = event.clientX - startX.current
    if (Math.abs(distance) > 42) goTo(active + (distance < 0 ? 1 : -1))
    startX.current = null
  }

  return <div className="reel-deck" ref={deckRef} onPointerDown={onPointerDown} onPointerUp={onPointerUp} onPointerCancel={() => { startX.current = null }}>
    <div className="reel-viewport" aria-live="polite">
      {reels.map((reel, index) => {
        const distance = (index - active + reels.length) % reels.length
        const visibleDistance = Math.min(distance, 3)
        return <article className={`reel-card ${index === active ? 'is-active' : ''}`} key={reel.number} style={{ transform: `translate3d(${visibleDistance * 16}px, ${visibleDistance * -22}px, 0) scale(${1 - visibleDistance * .055})`, opacity: index === active ? 1 : Math.max(.08, 1 - visibleDistance * .33), zIndex: reels.length - visibleDistance, pointerEvents: index === active ? 'auto' : 'none' }}>
          <div className="reel-topline"><span>{reel.number} / 03</span><span>{reel.kicker}</span></div>
          <div className="reel-glyph" aria-hidden="true">{reel.glyph}</div>
          <h3 className="reel-bubble">{reel.title.split('\n').map((line) => <span key={line}>{line}</span>)}</h3>
          <p>{reel.body}</p>
          <span className="reel-swipe-note">swipe to drift <b>↔</b></span>
        </article>
      })}
    </div>
    <div className="reel-controls"><div className="reel-dots">{reels.map((reel, index) => <button key={reel.number} className={index === active ? 'is-active' : ''} onClick={() => goTo(index)} aria-label={`Show reel ${reel.number}`} />)}</div><div className="reel-arrows"><button onClick={() => goTo(active - 1)} aria-label="Previous reel">←</button><button onClick={() => goTo(active + 1)} aria-label="Next reel">→</button></div></div>
  </div>
}
