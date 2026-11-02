export default function SectionLabel({ index, eyebrow, children }) {
  return (
    <div className="section-label">
      <span className="section-index">{index}</span>
      <span className="section-line" />
      <span className="eyebrow">{eyebrow}</span>
      <span className="section-title">{children}</span>
    </div>
  )
}
