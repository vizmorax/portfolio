import { Link } from './RouteLink.jsx'
import ContourVisual from './ContourVisual.jsx'

export default function NotFoundPage() {
  return <div className="not-found-page"><div className="not-found-copy"><p className="eyebrow"><span className="status-dot" /> error / wrong turn</p><h1>404<span>.</span></h1><p>This page wandered off somewhere between the idea and the final version.</p><Link className="button button--solid" href="/">return to the good part <span>↗</span></Link></div><div className="not-found-art"><ContourVisual compact /></div></div>
}
