
function randomFloatFromRange(min, max) {
  return Math.random() * (max - min) + min
}

function randomIntFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function randomColor(colors) {
  return colors[Math.floor(Math.random() * colors.length)]
}

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2,
}

const PALETTES = [
  ['#588C7E', '#F2E394', '#F2AE72', '#D96459', '#8C4646'],
  ['#FCFFF5', '#D1DBBD', '#91AA9D', '#3E606F', '#193441'],
  ['#F6B1C3', '#F0788C', '#DE264C', '#BC0D35', '#A20D1E'],
  ['#FFBC67', '#DA727E', '#AC6C82', '#685C79', '#455C7B'],
]

const SCALE = 15
const SPEED_FACTOR = 0.03

// Event Listeners
addEventListener('mousemove', event => {
  mouse.x = event.clientX
  mouse.y = event.clientY
})

addEventListener('resize', () => {
  canvas.width = innerWidth
  canvas.height = innerHeight

  init()
})

addEventListener('click', () => {
  init()
})

// Objects
class Particle {
  constructor(x, y, radius, size, color) {
    this.x = x
    this.y = y
    this.radius = radius
    this.size = size
    this.radians = Math.random() * 2 * Math.PI
    this.velocity = randomFloatFromRange(Math.PI / 256, Math.PI / 128)
    this.distance = randomIntFromRange(size, size * SCALE)
    this.color = color
    this.prevMouse = { x, y }
  }

  draw(prev) {
    c.beginPath()
    c.moveTo(prev.x, prev.y)
    c.lineTo(this.x, this.y)
    c.strokeStyle = this.color
    c.lineWidth = this.radius
    c.stroke()
    c.closePath()
  }

  update() {
    const prev = { x: this.x, y: this.y }
    // Move points over time
    this.radians += this.velocity

    // Mouse drag
    this.prevMouse.x += (mouse.x - this.prevMouse.x) * SPEED_FACTOR
    this.prevMouse.y += (mouse.y - this.prevMouse.y) * SPEED_FACTOR

    // Circular motion
    this.x = this.prevMouse.x + Math.cos(this.radians) * this.distance
    this.y = this.prevMouse.y + Math.sin(this.radians) * this.distance
    this.draw(prev)
  }
}

let particles = []

// Implementation
function init() {
  const colors = randomColor(PALETTES)
  particles = [...Array(500)].map(() => {
    const radius = randomIntFromRange(2, 6)
    const size = 75
    const x = canvas.width / 2
    const y = canvas.height / 2
    return new Particle(x, y, radius, size, randomColor(colors))
  })
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate)
  c.fillStyle = 'rgba(0, 0, 0, 0.15)'
  c.fillRect(0, 0, canvas.width, canvas.height)
  particles.forEach(particle => particle.update())
}

init()
animate()


