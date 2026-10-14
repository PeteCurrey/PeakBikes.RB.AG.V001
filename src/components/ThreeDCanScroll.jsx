import { useEffect, useRef, useState, useMemo } from 'react'
import * as THREE from 'three'
import { ArrowRight, Sparkles, Droplets, Zap, ShieldCheck, RefreshCw } from 'lucide-react'
import { CAN_FLAVORS, createCanTexture } from '../utils/canTextureGenerator'

export default function ThreeDCanScroll() {
  const containerRef = useRef(null)
  const mountRef = useRef(null)

  // Scroll phase state
  const [scrollProgress, setScrollProgress] = useState(0)
  const [currentFlavorIndex, setCurrentFlavorIndex] = useState(0)
  const [isOpened, setIsOpened] = useState(false)
  const [isDragging, setIsDragging] = useState(false)

  // Interactive mouse tracking
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 })
  const dragRef = useRef({ isDown: false, startX: 0, rotY: 0 })

  // Active flavor object
  const activeFlavor = CAN_FLAVORS[currentFlavorIndex]

  // Refs for Three.js objects
  const sceneRef = useRef(null)
  const rendererRef = useRef(null)
  const canGroupRef = useRef(null)
  const canBodyMeshRef = useRef(null)
  const pullTabRef = useRef(null)
  const particlesRef = useRef(null)
  const rimLightRef = useRef(null)
  const keyLightRef = useRef(null)
  const ambientLightRef = useRef(null)
  const textureCacheRef = useRef({})

  // Texture generator with caching
  const getTexture = (flavorId) => {
    if (!textureCacheRef.current[flavorId]) {
      const canvas = createCanTexture(flavorId)
      const texture = new THREE.CanvasTexture(canvas)
      texture.anisotropy = 8
      texture.needsUpdate = true
      textureCacheRef.current[flavorId] = texture
    }
    return textureCacheRef.current[flavorId]
  }

  // ── INITIALIZE THREE.JS SCENE ──
  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const width = mount.clientWidth
    const height = mount.clientHeight

    // 1. Scene
    const scene = new THREE.Scene()
    sceneRef.current = scene

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100)
    camera.position.set(0, 0, 7.8)

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.3
    mount.appendChild(renderer.domElement)
    rendererRef.current = renderer

    // 4. Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2)
    scene.add(ambientLight)
    ambientLightRef.current = ambientLight

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.5)
    keyLight.position.set(4, 5, 5)
    scene.add(keyLight)
    keyLightRef.current = keyLight

    const rimLight = new THREE.DirectionalLight(0x4488ff, 3.0)
    rimLight.position.set(-5, 2, -3)
    scene.add(rimLight)
    rimLightRef.current = rimLight

    const bottomFillLight = new THREE.DirectionalLight(0xffffff, 0.8)
    bottomFillLight.position.set(0, -4, 2)
    scene.add(bottomFillLight)

    // 5. 3D CAN MODEL BUILD
    const canGroup = new THREE.Group()
    canGroupRef.current = canGroup
    scene.add(canGroup)

    // Materials
    const chromeMaterial = new THREE.MeshStandardMaterial({
      color: 0xcccccc,
      metalness: 0.95,
      roughness: 0.18,
    })

    const lidMaterial = new THREE.MeshStandardMaterial({
      color: 0xb5bcc4,
      metalness: 0.9,
      roughness: 0.25,
    })

    const initialTexture = getTexture('original')
    const bodyMaterial = new THREE.MeshStandardMaterial({
      map: initialTexture,
      metalness: 0.82,
      roughness: 0.28,
    })

    // (A) Main Cylinder Body
    const bodyGeo = new THREE.CylinderGeometry(0.92, 0.92, 3.7, 64, 1, true)
    const bodyMesh = new THREE.Mesh(bodyGeo, bodyMaterial)
    bodyMesh.position.y = 0
    canGroup.add(bodyMesh)
    canBodyMeshRef.current = bodyMesh

    // (B) Tapered Upper Neck
    const neckGeo = new THREE.CylinderGeometry(0.85, 0.92, 0.28, 64, 1, false)
    const neckMesh = new THREE.Mesh(neckGeo, chromeMaterial)
    neckMesh.position.y = 1.99
    canGroup.add(neckMesh)

    // (C) Top Chime / Thick Rim Ring
    const chimeGeo = new THREE.CylinderGeometry(0.87, 0.85, 0.08, 64)
    const chimeMesh = new THREE.Mesh(chimeGeo, chromeMaterial)
    chimeMesh.position.y = 2.16
    canGroup.add(chimeMesh)

    // (D) Recessed Lid Surface
    const lidGeo = new THREE.CylinderGeometry(0.83, 0.83, 0.04, 48)
    const lidMesh = new THREE.Mesh(lidGeo, lidMaterial)
    lidMesh.position.y = 2.14
    canGroup.add(lidMesh)

    // (E) Pull Tab
    const tabGroup = new THREE.Group()
    tabGroup.position.set(0, 2.18, 0)
    pullTabRef.current = tabGroup

    const tabRingGeo = new THREE.TorusGeometry(0.24, 0.035, 12, 32)
    tabRingGeo.rotateX(Math.PI / 2)
    const tabRingMesh = new THREE.Mesh(tabRingGeo, chromeMaterial)
    tabRingMesh.position.set(0, 0, 0.25)
    tabGroup.add(tabRingMesh)

    const tabPlateGeo = new THREE.BoxGeometry(0.2, 0.02, 0.35)
    const tabPlateMesh = new THREE.Mesh(tabPlateGeo, chromeMaterial)
    tabPlateMesh.position.set(0, 0, 0.08)
    tabGroup.add(tabPlateMesh)

    // Tab center rivet
    const rivetGeo = new THREE.CylinderGeometry(0.045, 0.045, 0.04, 16)
    const rivetMesh = new THREE.Mesh(rivetGeo, chromeMaterial)
    rivetMesh.position.set(0, 0.015, -0.05)
    tabGroup.add(rivetMesh)

    canGroup.add(tabGroup)

    // (F) Bottom Taper and Dome Base
    const bottomTaperGeo = new THREE.CylinderGeometry(0.92, 0.78, 0.32, 64)
    const bottomTaperMesh = new THREE.Mesh(bottomTaperGeo, chromeMaterial)
    bottomTaperMesh.position.y = -2.01
    canGroup.add(bottomTaperMesh)

    const baseDomeGeo = new THREE.CylinderGeometry(0.76, 0.76, 0.05, 32)
    const baseDomeMesh = new THREE.Mesh(baseDomeGeo, chromeMaterial)
    baseDomeMesh.position.y = -2.18
    canGroup.add(baseDomeMesh)

    // (G) Micro Condensation Droplets (Sparkle specks)
    const dropletsCount = 90
    const dropletGeo = new THREE.SphereGeometry(0.016, 8, 8)
    const dropletMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      metalness: 0.2,
      roughness: 0.1,
      transparent: true,
      opacity: 0.85,
    })
    const dropletInstanced = new THREE.InstancedMesh(dropletGeo, dropletMat, dropletsCount)
    const dummy = new THREE.Object3D()
    for (let i = 0; i < dropletsCount; i++) {
      const theta = Math.random() * Math.PI * 2
      const y = (Math.random() - 0.5) * 3.4
      const r = 0.925
      dummy.position.set(Math.cos(theta) * r, y, Math.sin(theta) * r)
      const scale = 0.6 + Math.random() * 0.9
      dummy.scale.set(scale, scale * 1.4, scale)
      dummy.updateMatrix()
      dropletInstanced.setMatrixAt(i, dummy.matrix)
    }
    dropletInstanced.instanceMatrix.needsUpdate = true
    canGroup.add(dropletInstanced)

    // (H) Ambient Floating Particles / Energy Bubbles
    const particleCount = 45
    const particleGeo = new THREE.BufferGeometry()
    const pPositions = new Float32Array(particleCount * 3)
    const pVelocities = []
    for (let i = 0; i < particleCount; i++) {
      pPositions[i * 3] = (Math.random() - 0.5) * 5
      pPositions[i * 3 + 1] = (Math.random() - 0.5) * 6
      pPositions[i * 3 + 2] = (Math.random() - 0.5) * 4
      pVelocities.push({
        y: 0.008 + Math.random() * 0.015,
        x: (Math.random() - 0.5) * 0.004,
      })
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(pPositions, 3))
    const particleMat = new THREE.PointsMaterial({
      color: 0x44aaff,
      size: 0.065,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    })
    const particleSystem = new THREE.Points(particleGeo, particleMat)
    scene.add(particleSystem)
    particlesRef.current = { system: particleSystem, velocities: pVelocities }

    // Initial pose
    canGroup.rotation.y = -0.4
    canGroup.rotation.x = 0.15

    // ── ANIMATION RENDER LOOP ──
    let animationFrameId
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)

      // Smooth mouse tilt lerp
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.08
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.08

      // Float bubbles upward
      if (particlesRef.current) {
        const positions = particlesRef.current.system.geometry.attributes.position.array
        const vels = particlesRef.current.velocities
        for (let i = 0; i < particleCount; i++) {
          positions[i * 3 + 1] += vels[i].y
          positions[i * 3] += vels[i].x
          if (positions[i * 3 + 1] > 4) {
            positions[i * 3 + 1] = -4
            positions[i * 3] = (Math.random() - 0.5) * 5
          }
        }
        particlesRef.current.system.geometry.attributes.position.needsUpdate = true
      }

      renderer.render(scene, camera)
    }
    animate()

    // Resize handler
    const handleResize = () => {
      if (!mount) return
      const w = mount.clientWidth
      const h = mount.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', handleResize)
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement)
      }
      renderer.dispose()
    }
  }, [])

  // ── UPDATE CAN ON FLAVOR CHANGE ──
  useEffect(() => {
    if (!canBodyMeshRef.current) return
    const newTexture = getTexture(activeFlavor.id)
    canBodyMeshRef.current.material.map = newTexture
    canBodyMeshRef.current.material.needsUpdate = true

    if (rimLightRef.current) {
      rimLightRef.current.color.setHex(activeFlavor.lightColor)
    }
  }, [currentFlavorIndex, activeFlavor])

  // ── SCROLL SYNCHRONIZATION ──
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const totalScrollable = containerRef.current.offsetHeight - window.innerHeight
      const currentScroll = -rect.top
      const progress = Math.max(0, Math.min(1, currentScroll / totalScrollable))
      setScrollProgress(progress)

      if (!canGroupRef.current) return
      const can = canGroupRef.current

      // Mouse tilt offsets
      const tiltX = mouseRef.current.y * 0.25
      const tiltY = mouseRef.current.x * 0.35

      // ── 4 SCROLL PHASES ──
      // Phase 0: Hero Entry (0.00 - 0.25)
      if (progress < 0.25) {
        const p = progress / 0.25
        can.position.x = -1.2 * (1 - p) + (p * 0)
        can.position.y = -0.4 + p * 0.4
        can.position.z = 0.5 + p * 0.3
        can.rotation.y = -0.8 + p * 1.0 + tiltY
        can.rotation.x = 0.22 - p * 0.08 + tiltX
        can.rotation.z = -0.08 + p * 0.08
        can.scale.setScalar(0.95 + p * 0.12)
      }
      // Phase 1: Ingredients & Nutrition Backside (0.25 - 0.50)
      else if (progress < 0.50) {
        const p = (progress - 0.25) / 0.25
        // Can glides to the right, showing 360 rotation to the nutrition back
        can.position.x = 1.35 * Math.min(1, p * 1.5)
        can.position.y = 0.05
        can.position.z = 0.75
        can.rotation.y = 0.2 + p * (Math.PI * 1.1) + tiltY
        can.rotation.x = 0.14 + tiltX
        can.rotation.z = -0.12 * p
        can.scale.setScalar(1.07)
      }
      // Phase 2: 3D Flavor Showcase (0.50 - 0.75)
      else if (progress < 0.75) {
        const p = (progress - 0.50) / 0.25
        can.position.x = 1.35 * (1 - p)
        can.position.y = 0.1
        can.position.z = 0.8
        // Multi-rotation spin between editions
        can.rotation.y = Math.PI * 1.3 + p * (Math.PI * 2.0) + tiltY
        can.rotation.x = 0.14 - p * 0.06 + tiltX
        can.rotation.z = -0.12 * (1 - p)
        can.scale.setScalar(1.08)

        // Automatically cycle flavor with scroll if desired
        const autoFlavorIdx = Math.min(
          CAN_FLAVORS.length - 1,
          Math.floor(p * CAN_FLAVORS.length)
        )
        if (autoFlavorIdx !== currentFlavorIndex) {
          setCurrentFlavorIndex(autoFlavorIdx)
        }
      }
      // Phase 3: Can Opening & Finale Burst (0.75 - 1.00)
      else {
        const p = (progress - 0.75) / 0.25
        can.position.x = 0
        can.position.y = 0.15 - p * 0.1
        can.position.z = 0.85
        can.rotation.y = Math.PI * 3.3 + p * 0.6 + tiltY
        can.rotation.x = 0.25 + tiltX
        can.rotation.z = 0.08
        can.scale.setScalar(1.08 + p * 0.06)

        // Pull Tab Pop Animation
        if (pullTabRef.current) {
          if (p > 0.35) {
            pullTabRef.current.rotation.x = -Math.min(0.65, (p - 0.35) * 2.2)
            setIsOpened(true)
          } else {
            pullTabRef.current.rotation.x = 0
            setIsOpened(false)
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [currentFlavorIndex])

  // ── MOUSE / TOUCH INTERACTIVITY ──
  const handleMouseMove = (e) => {
    const { clientX, clientY } = e
    const cx = (clientX / window.innerWidth) * 2 - 1
    const cy = (clientY / window.innerHeight) * 2 - 1
    mouseRef.current.targetX = cx
    mouseRef.current.targetY = -cy
  }

  // ── DRAG TO ROTATE IN 3D ──
  const handleMouseDown = (e) => {
    dragRef.current.isDown = true
    dragRef.current.startX = e.clientX
    dragRef.current.rotY = canGroupRef.current ? canGroupRef.current.rotation.y : 0
    setIsDragging(true)
  }

  const handleGlobalMouseMove = (e) => {
    if (!dragRef.current.isDown || !canGroupRef.current) return
    const deltaX = e.clientX - dragRef.current.startX
    canGroupRef.current.rotation.y = dragRef.current.rotY + deltaX * 0.015
  }

  const handleMouseUp = () => {
    dragRef.current.isDown = false
    setIsDragging(false)
  }

  useEffect(() => {
    window.addEventListener('mousemove', handleGlobalMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
    return () => {
      window.removeEventListener('mousemove', handleGlobalMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [])

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative bg-rb-navy text-white selection:bg-rb-red selection:text-white"
      style={{ height: '380vh' }}
    >
      {/* ── PINNED STICKY VIEWPORT ── */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">

        {/* Dynamic Background Glow matching flavor */}
        <div
          className="absolute inset-0 pointer-events-none transition-all duration-700 ease-out"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${activeFlavor.ambientGlow} 0%, rgba(0,15,30,0.85) 65%, #000f1e 100%)`,
          }}
        />

        {/* Ambient Grid overlay for sports high-tech feel */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        {/* ── 3D CANVAS MOUNT ── */}
        <div
          ref={mountRef}
          onMouseDown={handleMouseDown}
          className={`absolute inset-0 z-10 ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
          title="Click and drag to rotate the 3D can"
        />

        {/* ── STAGE OVERLAY CONTENT ── */}
        <div className="relative z-20 w-full max-w-screen-2xl mx-auto px-6 lg:px-16 pointer-events-none h-full flex flex-col justify-between py-24">

          {/* Top Stage Indicator & Drag Hint */}
          <div className="flex items-center justify-between pointer-events-auto">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-rb-red live-pulse" />
              <span className="font-mono text-xs uppercase tracking-widest text-white/60">
                3D Interactive Experience • Scroll to Explore
              </span>
            </div>

            <div className="hidden md:flex items-center gap-2 bg-white/8 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 text-xs text-white/70">
              <RefreshCw size={12} className="animate-spin text-rb-yellow" style={{ animationDuration: '4s' }} />
              <span>Drag to rotate 360°</span>
            </div>
          </div>

          {/* ── STAGE 0 (0.00 - 0.25): ICONIC INTRODUCTION ── */}
          <div
            className={`transition-all duration-500 max-w-xl ${
              scrollProgress < 0.25
                ? 'opacity-100 translate-y-0 pointer-events-auto'
                : 'opacity-0 -translate-y-8 pointer-events-none absolute'
            }`}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-rb-red/20 border border-rb-red/40 text-rb-red font-bold text-xs uppercase tracking-widest mb-4">
              <Zap size={13} fill="currentColor" />
              Formula for Peak Performance
            </div>
            <h2
              className="rb-title text-white tracking-tight leading-[0.95] mb-4"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 4.8rem)' }}
            >
              VITALIZES <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/60">
                BODY & MIND.
              </span>
            </h2>
            <p className="text-white/70 text-base lg:text-lg leading-relaxed mb-6 max-w-md">
              Appreciated worldwide by top athletes, busy professionals, university students, and travelers on long journeys.
            </p>
            <div className="flex items-center gap-6 text-sm font-semibold">
              <div className="flex items-center gap-2 text-white/80">
                <span className="text-rb-yellow font-black text-xl">80mg</span>
                <span className="text-xs uppercase tracking-wider text-white/50">Caffeine<br />per can</span>
              </div>
              <div className="w-px h-8 bg-white/20" />
              <div className="flex items-center gap-2 text-white/80">
                <span className="text-white font-black text-xl">100%</span>
                <span className="text-xs uppercase tracking-wider text-white/50">Recyclable<br />Aluminum</span>
              </div>
            </div>
          </div>

          {/* ── STAGE 1 (0.25 - 0.50): INGREDIENTS HOTSPOTS ── */}
          <div
            className={`transition-all duration-500 max-w-md ${
              scrollProgress >= 0.25 && scrollProgress < 0.50
                ? 'opacity-100 translate-y-0 pointer-events-auto'
                : 'opacity-0 translate-y-8 pointer-events-none absolute'
            }`}
          >
            <span className="rb-tag mb-3">Formula Breakdown</span>
            <h3
              className="rb-title text-white text-3xl lg:text-4xl uppercase mb-6"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              What's Inside The Can
            </h3>

            <div className="space-y-4">
              {/* Ingredient 1: Caffeine */}
              <div className="p-4 rounded bg-rb-navy-card/80 backdrop-blur-md border border-white/10 hover:border-rb-yellow/50 transition-colors">
                <div className="flex items-center gap-3 mb-1">
                  <div className="w-6 h-6 rounded-full bg-rb-yellow/20 flex items-center justify-center text-rb-yellow text-xs font-bold">1</div>
                  <h4 className="font-bold text-white text-sm uppercase tracking-wide">Caffeine (80 mg)</h4>
                </div>
                <p className="text-white/60 text-xs pl-9 leading-relaxed">
                  Roughly the same amount as a home-brewed cup of coffee. Promotes alertness and cognitive quickness.
                </p>
              </div>

              {/* Ingredient 2: Taurine */}
              <div className="p-4 rounded bg-rb-navy-card/80 backdrop-blur-md border border-white/10 hover:border-rb-red/50 transition-colors">
                <div className="flex items-center gap-3 mb-1">
                  <div className="w-6 h-6 rounded-full bg-rb-red/20 flex items-center justify-center text-rb-red text-xs font-bold">2</div>
                  <h4 className="font-bold text-white text-sm uppercase tracking-wide">Taurine</h4>
                </div>
                <p className="text-white/60 text-xs pl-9 leading-relaxed">
                  An amino acid naturally occurring in the human body and present in daily diets.
                </p>
              </div>

              {/* Ingredient 3: B-Group Vitamins */}
              <div className="p-4 rounded bg-rb-navy-card/80 backdrop-blur-md border border-white/10 hover:border-blue-400/50 transition-colors">
                <div className="flex items-center gap-3 mb-1">
                  <div className="w-6 h-6 rounded-full bg-blue-400/20 flex items-center justify-center text-blue-400 text-xs font-bold">3</div>
                  <h4 className="font-bold text-white text-sm uppercase tracking-wide">B-Group Vitamins</h4>
                </div>
                <p className="text-white/60 text-xs pl-9 leading-relaxed">
                  Niacin, pantothenic acid, Vitamin B6 and B12 essential for normal energy metabolism.
                </p>
              </div>

              {/* Ingredient 4: Alpine Water */}
              <div className="p-4 rounded bg-rb-navy-card/80 backdrop-blur-md border border-white/10 hover:border-cyan-400/50 transition-colors">
                <div className="flex items-center gap-3 mb-1">
                  <div className="w-6 h-6 rounded-full bg-cyan-400/20 flex items-center justify-center text-cyan-400 text-xs font-bold">4</div>
                  <h4 className="font-bold text-white text-sm uppercase tracking-wide">Alpine Spring Water</h4>
                </div>
                <p className="text-white/60 text-xs pl-9 leading-relaxed">
                  Pure water sourced directly from high-altitude springs in the Austrian and Swiss Alps.
                </p>
              </div>
            </div>
          </div>

          {/* ── STAGE 2 (0.50 - 0.75): 3D FLAVOR SELECTOR ── */}
          <div
            className={`transition-all duration-500 flex flex-col items-center text-center ${
              scrollProgress >= 0.50 && scrollProgress < 0.75
                ? 'opacity-100 translate-y-0 pointer-events-auto'
                : 'opacity-0 translate-y-8 pointer-events-none absolute left-0 right-0'
            }`}
          >
            <span className="rb-tag mb-2">3D Flavour Lab</span>
            <h3
              className="rb-title text-white text-3xl lg:text-5xl uppercase mb-2"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              {activeFlavor.name}
            </h3>
            <p className="text-white/65 text-sm max-w-lg mb-6">
              {activeFlavor.flavorNotes}
            </p>

            {/* Flavor Switcher Pills */}
            <div className="flex flex-wrap justify-center gap-2 p-2 rounded-full bg-black/40 backdrop-blur-xl border border-white/10 pointer-events-auto">
              {CAN_FLAVORS.map((f, idx) => (
                <button
                  key={f.id}
                  onClick={() => setCurrentFlavorIndex(idx)}
                  className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-2 ${
                    currentFlavorIndex === idx
                      ? 'bg-white text-rb-navy shadow-lg scale-105'
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                  style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                >
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ background: f.baseColor, border: '1px solid rgba(255,255,255,0.4)' }}
                  />
                  {f.shortName}
                </button>
              ))}
            </div>
          </div>

          {/* ── STAGE 3 (0.75 - 1.00): CAN OPENING & FINALE ── */}
          <div
            className={`transition-all duration-500 text-center flex flex-col items-center ${
              scrollProgress >= 0.75
                ? 'opacity-100 translate-y-0 pointer-events-auto'
                : 'opacity-0 translate-y-8 pointer-events-none absolute left-0 right-0'
            }`}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-rb-yellow/20 text-rb-yellow font-bold text-xs uppercase tracking-widest mb-3">
              <Sparkles size={13} />
              {isOpened ? 'Can Opened — Ready to Drink' : 'Scroll to Pop the Tab'}
            </div>

            <h2
              className="rb-title text-white tracking-tight leading-none mb-3"
              style={{ fontSize: 'clamp(2.8rem, 6.5vw, 5.5rem)' }}
            >
              RED BULL GIVES YOU WIIINGS.
            </h2>
            <p className="text-white/70 text-base max-w-md mb-6">
              Choose your taste, grab a cold can, and elevate every moment.
            </p>

            <div className="flex flex-wrap justify-center gap-4 pointer-events-auto">
              <a href="#drinks" className="rb-btn-primary">
                Explore All Products <ArrowRight size={15} />
              </a>
              <a href="#events" className="rb-btn-outline">
                Experience Red Bull Events
              </a>
            </div>
          </div>

          {/* ── BOTTOM PROGRESS SCRUBBER ── */}
          <div className="w-full flex items-center justify-between text-xs text-white/40 pt-6 border-t border-white/10 pointer-events-auto">
            <span className="font-mono">STAGE {Math.min(4, Math.floor(scrollProgress * 4) + 1)} / 4</span>

            {/* Stage Step Indicators */}
            <div className="flex items-center gap-2">
              {['Iconic Can', 'Formula', 'Flavours', 'Wiiings'].map((label, idx) => {
                const isActive = Math.floor(scrollProgress * 4) === idx
                return (
                  <span
                    key={label}
                    className={`text-xs uppercase font-semibold tracking-wider transition-colors ${
                      isActive ? 'text-white' : 'text-white/30'
                    }`}
                  >
                    {label} {idx < 3 && '•'}
                  </span>
                )
              })}
            </div>

            <span className="font-mono">{Math.round(scrollProgress * 100)}%</span>
          </div>
        </div>
      </div>
    </section>
  )
}
