import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function ThreeScene() {
  const mountRef = useRef(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100)
    camera.position.set(0, 0, 7.4)
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8))
    renderer.setClearColor(0x000000, 0)
    mount.appendChild(renderer.domElement)

    const field = new THREE.Group()
    scene.add(field)
    const cyan = new THREE.Color('#22efff')
    const pink = new THREE.Color('#ff2b9d')
    const loops = []
    for (let layer = 0; layer < 22; layer += 1) {
      const points = []
      const radius = 0.55 + layer * 0.105
      for (let step = 0; step <= 96; step += 1) {
        const angle = (step / 96) * Math.PI * 2
        const wobble = Math.sin(angle * 3 + layer * 0.4) * 0.045 + Math.cos(angle * 5 - layer * 0.18) * 0.024
        const x = Math.cos(angle) * (radius + wobble)
        const y = Math.sin(angle) * (radius * 0.7 + wobble * 0.8)
        const z = Math.sin(angle * 2 + layer * 0.13) * 0.12 + (layer - 11) * 0.012
        points.push(new THREE.Vector3(x, y, z))
      }
      const geometry = new THREE.BufferGeometry().setFromPoints(points)
      const material = new THREE.LineBasicMaterial({ color: layer % 4 === 0 ? pink : cyan, transparent: true, opacity: 0.14 + (layer % 5) * 0.035 })
      const line = new THREE.LineLoop(geometry, material)
      line.rotation.z = layer * 0.018
      field.add(line)
      loops.push(line)
    }

    const particles = new THREE.BufferGeometry()
    const positions = new Float32Array(90 * 3)
    for (let i = 0; i < positions.length; i += 3) {
      positions[i] = (Math.random() - 0.5) * 6
      positions[i + 1] = (Math.random() - 0.5) * 4.8
      positions[i + 2] = (Math.random() - 0.5) * 1.5
    }
    particles.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    const particleCloud = new THREE.Points(particles, new THREE.PointsMaterial({ color: pink, size: 0.018, transparent: true, opacity: 0.75 }))
    scene.add(particleCloud)

    const pointer = new THREE.Vector2()
    const target = new THREE.Vector2()
    const onPointerMove = (event) => {
      const rect = mount.getBoundingClientRect()
      const source = event.touches?.[0] ?? event
      target.x = ((source.clientX - rect.left) / rect.width - 0.5) * 2
      target.y = -((source.clientY - rect.top) / rect.height - 0.5) * 2
    }
    mount.addEventListener('pointermove', onPointerMove, { passive: true })
    mount.addEventListener('touchmove', onPointerMove, { passive: true })

    const resize = () => {
      const width = mount.clientWidth || 1
      const height = mount.clientHeight || width
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height, false)
    }
    resize()
    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(mount)
    let frame
    const clock = new THREE.Clock()
    const render = () => {
      const elapsed = clock.getElapsedTime()
      pointer.lerp(target, 0.045)
      field.rotation.x += ((pointer.y * 0.18) - field.rotation.x) * 0.035
      field.rotation.y += ((pointer.x * 0.22) - field.rotation.y) * 0.035
      field.rotation.z = elapsed * 0.035
      loops.forEach((loop, index) => { loop.position.z = Math.sin(elapsed * 0.55 + index * 0.16) * 0.045 })
      particleCloud.rotation.y = elapsed * 0.018
      renderer.render(scene, camera)
      frame = requestAnimationFrame(render)
    }
    render()

    return () => {
      cancelAnimationFrame(frame)
      resizeObserver.disconnect()
      mount.removeEventListener('pointermove', onPointerMove)
      mount.removeEventListener('touchmove', onPointerMove)
      scene.traverse((object) => { if (object.geometry) object.geometry.dispose(); if (object.material) object.material.dispose() })
      renderer.dispose()
      renderer.domElement.remove()
    }
  }, [])

  return <div className="three-scene" ref={mountRef} aria-label="Interactive three-dimensional contour field" role="img" />
}
