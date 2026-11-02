import { useState } from 'react'

export default function Header({ onToggleAudio, isPlaying, theme, onToggleTheme }) {
  return (
    <header className="site-header" aria-label="Primary navigation">
      <a className="wordmark magnetic-link" href="#top" aria-label="Farsan home">
        <span className="wordmark-mark" aria-hidden="true">◌</span>
        <span>farsan<span className="wordmark-dot">.</span></span>
      </a>
      <nav className="nav-links">
        <a href="#work">work</a>
        <a href="#vibe">vibe</a>
        <a href="#contact">contact</a>
      </nav>
      <button className={`theme-switch theme-switch--${theme}`} onClick={onToggleTheme} aria-label={`Switch to ${theme === 'pink' ? 'blue' : 'magenta'} theme`} aria-pressed={theme === 'blue'}>
        <span className="theme-switch-dot" />
        <span className="theme-switch-label">{theme === 'pink' ? 'pink' : 'blue'}</span>
      </button>
      <button className={`audio-pill ${isPlaying ? 'is-playing' : ''}`} onClick={onToggleAudio} aria-pressed={isPlaying}>
        <span className="music-heart" aria-hidden="true">{isPlaying ? '♥' : '♡'}</span>
        <span className="audio-bars" aria-hidden="true"><i /><i /><i /></span>
        <span>{isPlaying ? 'little song on' : 'play a little song'}</span>
      </button>
    </header>
  )
}
