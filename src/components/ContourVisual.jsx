import { useMemo } from 'react'

const cyanPaths = [
  'M 42 250 C 72 122, 144 46, 252 44 C 368 42, 452 112, 468 224 C 481 318, 412 410, 298 444 C 184 477, 67 420, 40 322 C 33 297, 34 273, 42 250 Z',
  'M 62 249 C 91 140, 151 67, 250 64 C 350 61, 423 119, 446 222 C 466 307, 396 384, 300 416 C 201 449, 89 405, 62 316 C 54 292, 55 270, 62 249 Z',
  'M 84 247 C 110 159, 166 88, 249 84 C 337 79, 397 130, 425 221 C 449 298, 385 360, 301 391 C 213 422, 111 389, 84 311 C 77 289, 77 269, 84 247 Z',
  'M 106 244 C 131 176, 179 110, 249 106 C 322 102, 373 143, 403 221 C 428 286, 372 339, 302 366 C 226 396, 135 374, 108 307 C 98 285, 99 263, 106 244 Z',
  'M 127 242 C 149 188, 193 130, 250 128 C 309 125, 350 158, 381 221 C 406 273, 360 318, 303 342 C 240 368, 159 356, 133 301 C 122 279, 120 260, 127 242 Z',
  'M 149 239 C 169 200, 206 151, 249 150 C 296 147, 329 172, 359 221 C 384 262, 348 297, 304 318 C 254 341, 183 335, 157 294 C 144 274, 141 257, 149 239 Z',
]

const magentaPaths = [
  'M 207 85 C 300 40, 405 86, 447 175 C 479 244, 448 327, 377 386',
  'M 220 105 C 297 72, 382 105, 418 178 C 445 232, 423 298, 372 344',
  'M 232 127 C 292 104, 358 128, 390 181 C 411 221, 398 270, 364 307',
  'M 242 148 C 287 134, 337 151, 363 185 C 381 214, 371 249, 349 273',
  'M 101 325 C 163 401, 276 439, 371 403',
  'M 82 344 C 151 430, 280 469, 389 421',
]

export default function ContourVisual({ compact = false }) {
  const noiseDots = useMemo(() => Array.from({ length: compact ? 12 : 24 }), [compact])
  return (
    <div className={`contour-wrap ${compact ? 'contour-wrap--compact' : ''}`} aria-label="Abstract contour line portrait in cyan and fluorescent magenta">
      <div className="contour-orbit contour-orbit--one" />
      <div className="contour-orbit contour-orbit--two" />
      <svg className="contour-svg" viewBox="0 0 500 500" role="img" aria-hidden="true">
        <g className="contour-cyan">
          {cyanPaths.map((path, index) => <path key={`cyan-${index}`} d={path} style={{ '--line-index': index }} />)}
        </g>
        <g className="contour-magenta">
          {magentaPaths.map((path, index) => <path key={`pink-${index}`} d={path} style={{ '--line-index': index }} />)}
        </g>
        <ellipse className="contour-core" cx="252" cy="245" rx="56" ry="76" />
        <path className="contour-cut" d="M208 246 C224 218, 273 207, 301 226 C317 238, 317 258, 300 278 C274 306, 224 302, 207 274" />
      </svg>
      <div className="contour-caption">volume study / 01</div>
      <div className="contour-dots" aria-hidden="true">
        {noiseDots.map((_, index) => <span key={index} style={{ '--dot-index': index }} />)}
      </div>
    </div>
  )
}
