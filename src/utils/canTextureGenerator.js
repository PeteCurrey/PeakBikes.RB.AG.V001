// ========================================================
// RED BULL 3D CAN TEXTURE GENERATOR
// Creates high-resolution canvas textures for Three.js
// ========================================================

export const CAN_FLAVORS = [
  {
    id: 'original',
    name: 'Red Bull Energy Drink',
    shortName: 'Original',
    edition: 'Original',
    baseColor: '#002654',
    secondaryColor: '#C0C7CE',
    accentColor: '#db0a40',
    ambientGlow: 'rgba(0, 70, 180, 0.35)',
    glowHex: 0x0044aa,
    lightColor: 0x4488ff,
    flavorNotes: 'Original crisp, invigorating classic taste with alpine freshness',
    calories: '110 kcal / 250ml',
    caffeine: '80 mg',
  },
  {
    id: 'sugarfree',
    name: 'Red Bull Sugarfree',
    shortName: 'Sugarfree',
    edition: 'Sugarfree',
    baseColor: '#789BB8',
    secondaryColor: '#D8DEE4',
    accentColor: '#00529B',
    ambientGlow: 'rgba(90, 160, 230, 0.35)',
    glowHex: 0x5599dd,
    lightColor: 0x66bbff,
    flavorNotes: 'Wiiings without sugar — only 5 calories with same vitalizing effect',
    calories: '5 kcal / 250ml',
    caffeine: '80 mg',
  },
  {
    id: 'zero',
    name: 'Red Bull Zero',
    shortName: 'Zero',
    edition: 'Zero Sugar',
    baseColor: '#0A1118',
    secondaryColor: '#283645',
    accentColor: '#00B4D8',
    ambientGlow: 'rgba(0, 180, 216, 0.35)',
    glowHex: 0x00a3cc,
    lightColor: 0x00d4ff,
    flavorNotes: 'Zero sugar, zero calories, with a distinct smooth original taste profile',
    calories: '2 kcal / 250ml',
    caffeine: '80 mg',
  },
  {
    id: 'red',
    name: 'The Red Edition',
    shortName: 'Red Edition',
    edition: 'Watermelon',
    baseColor: '#B80D2D',
    secondaryColor: '#930822',
    accentColor: '#ffffff',
    ambientGlow: 'rgba(219, 10, 64, 0.4)',
    glowHex: 0xdb0a40,
    lightColor: 0xff3366,
    flavorNotes: 'Refreshing taste of crisp, juicy summer watermelon with full energy',
    calories: '115 kcal / 250ml',
    caffeine: '80 mg',
  },
  {
    id: 'yellow',
    name: 'The Yellow Edition',
    shortName: 'Yellow Edition',
    edition: 'Tropical',
    baseColor: '#F5A600',
    secondaryColor: '#CC7A00',
    accentColor: '#ffffff',
    ambientGlow: 'rgba(255, 170, 0, 0.4)',
    glowHex: 0xffaa00,
    lightColor: 0xffcc33,
    flavorNotes: 'Exotic blend of tropical fruits, passionfruit and mango vibes',
    calories: '115 kcal / 250ml',
    caffeine: '80 mg',
  },
  {
    id: 'summer',
    name: 'The Summer Edition',
    shortName: 'Summer Edition',
    edition: 'Curuba Elderflower',
    baseColor: '#00A86B',
    secondaryColor: '#007A4D',
    accentColor: '#FFF275',
    ambientGlow: 'rgba(0, 168, 107, 0.4)',
    glowHex: 0x00a86b,
    lightColor: 0x33e89b,
    flavorNotes: 'Exotic curuba melon complemented by delicate floral elderflower notes',
    calories: '110 kcal / 250ml',
    caffeine: '80 mg',
  },
]

/**
 * Draws the Red Bull double bulls logo onto a 2D canvas context
 */
function drawRedBullsLogo(ctx, cx, cy, scale = 1) {
  ctx.save()
  ctx.translate(cx, cy)
  ctx.scale(scale, scale)

  // Golden Sun
  const sunGrad = ctx.createRadialGradient(0, 0, 2, 0, 0, 36)
  sunGrad.addColorStop(0, '#FFF59D')
  sunGrad.addColorStop(0.6, '#FFCC00')
  sunGrad.addColorStop(1, '#FF9900')
  ctx.fillStyle = sunGrad
  ctx.beginPath()
  ctx.arc(0, 0, 36, 0, Math.PI * 2)
  ctx.fill()

  // Left Charging Bull (Red silhouette with muscular contours)
  ctx.fillStyle = '#DB0A40'
  ctx.beginPath()
  ctx.moveTo(-10, 8)
  ctx.bezierCurveTo(-25, 4, -40, -10, -55, -8)
  ctx.bezierCurveTo(-70, -6, -85, 8, -95, 2)
  ctx.bezierCurveTo(-105, -4, -110, -18, -120, -15)
  // Horns
  ctx.bezierCurveTo(-125, -25, -135, -35, -145, -38)
  ctx.bezierCurveTo(-140, -25, -130, -18, -125, -10)
  ctx.bezierCurveTo(-135, -2, -140, 10, -135, 18)
  // Forelegs
  ctx.bezierCurveTo(-120, 24, -100, 28, -85, 32)
  ctx.bezierCurveTo(-75, 36, -65, 42, -50, 38)
  // Underbelly and Hind Legs
  ctx.bezierCurveTo(-35, 34, -20, 28, -10, 20)
  ctx.closePath()
  ctx.fill()

  // Right Charging Bull
  ctx.beginPath()
  ctx.moveTo(10, 8)
  ctx.bezierCurveTo(25, 4, 40, -10, 55, -8)
  ctx.bezierCurveTo(70, -6, 85, 8, 95, 2)
  ctx.bezierCurveTo(105, -4, 110, -18, 120, -15)
  // Horns
  ctx.bezierCurveTo(125, -25, 135, -35, 145, -38)
  ctx.bezierCurveTo(140, -25, 130, -18, 125, -10)
  ctx.bezierCurveTo(135, -2, 140, 10, 135, 18)
  // Forelegs
  ctx.bezierCurveTo(120, 24, 100, 28, 85, 32)
  ctx.bezierCurveTo(75, 36, 65, 42, 50, 38)
  // Underbelly and Hind Legs
  ctx.bezierCurveTo(35, 34, 20, 28, 10, 20)
  ctx.closePath()
  ctx.fill()

  ctx.restore()
}

/**
 * Procedurally generates a 1024x512 can label texture
 */
export function createCanTexture(flavorId = 'original') {
  const flavor = CAN_FLAVORS.find(f => f.id === flavorId) || CAN_FLAVORS[0]
  const width = 1024
  const height = 512

  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')

  // Background base
  ctx.fillStyle = flavor.baseColor
  ctx.fillRect(0, 0, width, height)

  // Subtle brushed metallic horizontal streaks
  ctx.fillStyle = 'rgba(255, 255, 255, 0.035)'
  for (let y = 0; y < height; y += 4) {
    if (Math.random() > 0.4) {
      ctx.fillRect(0, y, width, 1.5)
    }
  }

  // DIAGONAL BLUE & SILVER QUADRANTS (Original and Sugarfree)
  if (flavor.id === 'original' || flavor.id === 'sugarfree') {
    ctx.save()
    ctx.fillStyle = flavor.secondaryColor

    // Authentic 4-quadrant diamond/diagonal cut
    ctx.beginPath()
    ctx.moveTo(120, 0)
    ctx.lineTo(440, height)
    ctx.lineTo(260, height)
    ctx.lineTo(0, 180)
    ctx.lineTo(0, 0)
    ctx.closePath()
    ctx.fill()

    ctx.beginPath()
    ctx.moveTo(380, 0)
    ctx.lineTo(700, height)
    ctx.lineTo(540, height)
    ctx.lineTo(220, 0)
    ctx.closePath()
    ctx.fill()

    ctx.beginPath()
    ctx.moveTo(640, 0)
    ctx.lineTo(960, height)
    ctx.lineTo(820, height)
    ctx.lineTo(500, 0)
    ctx.closePath()
    ctx.fill()

    ctx.restore()
  } else {
    // Solid Edition styles with brushed metallic sheen gradient
    const grad = ctx.createLinearGradient(0, 0, width, 0)
    grad.addColorStop(0, flavor.secondaryColor)
    grad.addColorStop(0.3, flavor.baseColor)
    grad.addColorStop(0.6, flavor.secondaryColor)
    grad.addColorStop(1, flavor.baseColor)
    ctx.fillStyle = grad
    ctx.fillRect(0, 0, width, height)
  }

  // Vertical highlight reflection strip (simulating cylindrical gloss)
  const gloss = ctx.createLinearGradient(0, 0, width, 0)
  gloss.addColorStop(0, 'rgba(255,255,255,0)')
  gloss.addColorStop(0.35, 'rgba(255,255,255,0.18)')
  gloss.addColorStop(0.42, 'rgba(255,255,255,0.02)')
  gloss.addColorStop(0.85, 'rgba(255,255,255,0.12)')
  gloss.addColorStop(1, 'rgba(255,255,255,0)')
  ctx.fillStyle = gloss
  ctx.fillRect(0, 0, width, height)

  // ── FRONT OF THE CAN (Centered around x = 380) ──
  const frontX = 360

  // 1. Double Bulls Logo
  drawRedBullsLogo(ctx, frontX, 160, 0.72)

  // 2. "Red Bull" Wordmark
  ctx.save()
  ctx.fillStyle = '#FFFFFF'
  ctx.font = '900 52px "Barlow Condensed", "Arial Black", sans-serif'
  ctx.textAlign = 'center'
  ctx.letterSpacing = '1px'
  ctx.shadowColor = 'rgba(0, 0, 0, 0.45)'
  ctx.shadowBlur = 6
  ctx.shadowOffsetY = 2
  ctx.fillText('Red Bull', frontX, 235)

  // 3. Category / Flavor Subtitle
  if (flavor.id === 'original') {
    ctx.fillStyle = '#DB0A40'
    ctx.font = '800 24px "Barlow Condensed", Arial, sans-serif'
    ctx.letterSpacing = '4px'
    ctx.fillText('ENERGY DRINK', frontX, 270)
  } else if (flavor.id === 'sugarfree') {
    ctx.fillStyle = '#00529B'
    ctx.font = '800 24px "Barlow Condensed", Arial, sans-serif'
    ctx.letterSpacing = '4px'
    ctx.fillText('SUGARFREE', frontX, 270)
  } else if (flavor.id === 'zero') {
    ctx.fillStyle = '#00B4D8'
    ctx.font = '800 24px "Barlow Condensed", Arial, sans-serif'
    ctx.letterSpacing = '4px'
    ctx.fillText('ZERO SUGAR', frontX, 270)
  } else {
    ctx.fillStyle = '#FFFFFF'
    ctx.font = '800 22px "Barlow Condensed", Arial, sans-serif'
    ctx.letterSpacing = '3px'
    ctx.fillText(flavor.edition.toUpperCase(), frontX, 268)

    ctx.fillStyle = '#FFE566'
    ctx.font = '700 15px "Barlow Condensed", Arial, sans-serif'
    ctx.letterSpacing = '2px'
    ctx.fillText('THE ' + flavor.shortName.toUpperCase(), frontX, 290)
  }

  // 4. "Vitalizes body and mind ®"
  ctx.fillStyle = 'rgba(255, 255, 255, 0.85)'
  ctx.font = 'italic 500 15px "Barlow", sans-serif'
  ctx.letterSpacing = '0.5px'
  ctx.fillText('Vitalizes body and mind. ®', frontX, 335)

  // 5. Volume "250 ml"
  ctx.fillStyle = 'rgba(255, 255, 255, 0.7)'
  ctx.font = '600 14px "Barlow", sans-serif'
  ctx.fillText('250 ml ℮ (8.4 FL OZ)', frontX, 470)
  ctx.restore()

  // ── BACK OF THE CAN (Nutrition & Ingredients, x = 860) ──
  const backX = 860
  ctx.save()
  ctx.fillStyle = 'rgba(255, 255, 255, 0.8)'
  ctx.font = '700 13px "Barlow Condensed", Arial, sans-serif'
  ctx.letterSpacing = '1px'
  ctx.textAlign = 'left'
  ctx.fillText('NUTRITION FACTS / INGREDIENTS', backX - 110, 80)

  // Table borders
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)'
  ctx.lineWidth = 1
  ctx.strokeRect(backX - 110, 92, 220, 160)

  // Nutritional items
  ctx.font = '500 11px "Barlow", sans-serif'
  const items = [
    ['Serving size', '1 can (250ml)'],
    ['Calories', flavor.calories],
    ['Total Fat', '0 g'],
    ['Sodium', '105 mg'],
    ['Total Carb.', flavor.id.includes('zero') || flavor.id.includes('sugar') ? '0 g' : '27 g'],
    ['Sugars', flavor.id.includes('zero') || flavor.id.includes('sugar') ? '0 g' : '27 g'],
    ['Protein', '0 g'],
    ['Caffeine', flavor.caffeine],
    ['Taurine', '1000 mg'],
    ['Vitamin B6', '250% DV'],
    ['Vitamin B12', '80% DV'],
  ]

  let rowY = 110
  items.forEach(([label, val]) => {
    ctx.fillStyle = 'rgba(255, 255, 255, 0.75)'
    ctx.fillText(label, backX - 100, rowY)
    ctx.fillStyle = '#FFFFFF'
    ctx.textAlign = 'right'
    ctx.fillText(val, backX + 100, rowY)
    ctx.textAlign = 'left'
    rowY += 13
  })

  // Barcode mock
  ctx.fillStyle = '#FFFFFF'
  ctx.fillRect(backX - 80, 310, 160, 48)
  ctx.fillStyle = '#000000'
  for (let b = backX - 70; b < backX + 70; b += 4) {
    const barW = Math.random() > 0.5 ? 2 : 1
    ctx.fillRect(b, 314, barW, 36)
  }
  ctx.font = '9px monospace'
  ctx.textAlign = 'center'
  ctx.fillText('9 002490 100070', backX, 366)

  // Alpine water certification stamp
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)'
  ctx.beginPath()
  ctx.arc(backX, 430, 26, 0, Math.PI * 2)
  ctx.stroke()
  ctx.fillStyle = 'rgba(255, 255, 255, 0.75)'
  ctx.font = '700 8px "Barlow Condensed", sans-serif'
  ctx.fillText('AUSTRIAN ALPS', backX, 428)
  ctx.fillText('SPRING WATER', backX, 438)

  ctx.restore()

  return canvas
}
