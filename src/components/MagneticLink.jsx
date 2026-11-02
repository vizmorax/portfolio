export default function MagneticLink({ href, label, detail }) {
  const handleMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const x = (event.clientX - rect.left - rect.width / 2) * 0.18
    const y = (event.clientY - rect.top - rect.height / 2) * 0.18
    event.currentTarget.style.setProperty('--mag-x', `${x}px`)
    event.currentTarget.style.setProperty('--mag-y', `${y}px`)
  }
  const reset = (event) => {
    event.currentTarget.style.setProperty('--mag-x', '0px')
    event.currentTarget.style.setProperty('--mag-y', '0px')
  }
  return (
    <a className="social-link" href={href} target="_blank" rel="noreferrer" onPointerMove={handleMove} onPointerLeave={reset}>
      <span>{label}</span><small>{detail}</small><b aria-hidden="true">↗</b>
    </a>
  )
}
