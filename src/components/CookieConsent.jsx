import { useEffect, useState } from 'react'

const STORAGE_KEY = 'farsan-cookie-choice'

export default function CookieConsent() {
  const [choice, setChoice] = useState(null)
  const [open, setOpen] = useState(false)

  useEffect(() => { setChoice(window.localStorage.getItem(STORAGE_KEY)) }, [])
  const save = (value) => { window.localStorage.setItem(STORAGE_KEY, value); setChoice(value); setOpen(false) }
  if (choice && !open) return <button className="privacy-fab" onClick={() => setOpen(true)}>privacy settings</button>

  return (
    <aside className={`cookie-card ${choice ? 'cookie-card--settings' : ''}`} aria-label="Cookie preferences">
      <div><span className="cookie-eyebrow">small privacy note</span><h2>{choice ? 'Change your preferences' : 'A small cookie note.'}</h2><p>This site uses one local cookie-style preference to remember your choice. No analytics or tracking scripts are running.</p></div>
      <div className="cookie-actions"><button className="cookie-secondary" onClick={() => save('necessary')}>only necessary</button><button className="cookie-primary" onClick={() => save('accepted')}>okay, got it</button><a href="/privacy">read privacy policy</a></div>
    </aside>
  )
}
