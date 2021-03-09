let snake, food;
const SIZE = 50

class Snake {
  tail = []
  yDelta = 0
  xDelta = 1
  speed = 4
  MAX_SPEED = 15
  constructor() {
    this.tail.push({
      x: 2,
      y: 0,
    })
  }

  get head() {
    return this.tail[this.tail.length - 1]
  }

  show() {
    for (let i = 0; i < this.tail.length; i++) {
      fill('white')
      if (i == this.tail.length - 1) {
        fill('red')
      }
      rect(this.tail[i].x * SIZE, this.tail[i].y * SIZE, SIZE, SIZE)
    }
  }
  move() {
    for (let i = 0; i < this.tail.length - 1; i++) {
      this.tail[i].x = this.tail[i + 1].x;
      this.tail[i].y = this.tail[i + 1].y;
    }

    this.head.x += this.xDelta
    this.head.y += this.yDelta

    for (let particle of this.tail) {
      if (particle.x * SIZE >= width) {
        particle.x = 0
      }
      if (particle.x < 0) {
        particle.x = width / SIZE
      }
      if (particle.y * SIZE >= height) {
        particle.y = 0
      }
      if (particle.y < 0) {
        particle.y = height / SIZE
      }
    }
  }
  changeDir(key) {
    switch (key) {
      case "ArrowDown":
        this.xDelta = 0
        this.yDelta = 1
        break
      case "ArrowUp":
        this.xDelta = 0
        this.yDelta = -1
        break
      case "ArrowRight":
        this.xDelta = 1
        this.yDelta = 0
        break
      case "ArrowLeft":
        this.xDelta = -1
        this.yDelta = 0
    }
  }
  isEaten(food) {
    return this.head.x == food.x && this.head.y == food.y
  }

  addTailParticle() {
    this.tail.unshift({
      x: this.tail[0].x,
      y: this.tail[0].y
    })
  }
  speedUp() {
    if (this.speed < this.MAX_SPEED) {
      this.speed += this.speed / 10;
    }
  }
  isLost() {
    for (let i = 0; i < this.tail.length - 2; i++) {
      if (this.tail[i].x == this.head.x && this.tail[i].y == this.head.y) {
        return true
      }
    }
    return false
  }
}


class Food {
  constructor() {
    this.setNewPosition()
  }
  show() {
    fill('blue')
    rect(this.x * SIZE, this.y * SIZE, SIZE, SIZE)
  }
  setNewPosition() {
    this.x = floor(random(0, width / SIZE))
    this.y = floor(random(0, height / SIZE))
  }
}


function setup() {
  createCanvas(500, 500)
  snake = new Snake()
  food = new Food()
}

function draw() {

  if (snake.isLost()) {
    noLoop()
    alert('you have lost')
    return;
  }

  frameRate(snake.speed)
  background(0)
  snake.show()
  food.show()

  snake.move()
  if (snake.isEaten(food)) {
    snake.addTailParticle()
    snake.speedUp()
    food.setNewPosition()
  }
}

function keyPressed(e) {
  snake.changeDir(e.key)
}


