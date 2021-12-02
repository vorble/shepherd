'use strict'

const readline = require('readline')

let quit = false
let waiting_for_return = []
let all_tasks = []
let scheduled = false

function isKeyQuit(key) { return key.name == 'q' || key.sequence == '\x03' } // ctrl+c
function isKeyReturn(key) { return key.name == 'return' }
function isKeySkip(key) { return key.name == 'n' }
process.stdin.on('keypress', (chunk, key) => {
  if (isKeyQuit(key)) {
    quit = true
    function skipskipskip() {
      if (waiting_for_return.length > 0) {
        waiting_for_return.pop()[1]() // Gets a reject function, then calls it. "Skip".
      }
      setTimeout(skipskipskip, 1)
    }
    skipskipskip()
  } else if (isKeyReturn(key)) {
    if (waiting_for_return.length > 0) {
      waiting_for_return.pop()[0]() // Gets a resolve function, then calls it.
    }
  } else if (isKeySkip(key)) {
    if (waiting_for_return.length > 0) {
      waiting_for_return.pop()[1]() // Gets a reject function, then calls it.
    }
  } else if (process.env.DEBUG) {
    console.log(key)
  }
})

function user() {
  return new Promise((resolve, reject) => {
    if (waiting_for_return.length == 0) {
      readline.emitKeypressEvents(process.stdin)
      if (process.stdin.isTTY)
        process.stdin.setRawMode(true)
    }
    waiting_for_return.push([resolve, reject])
  })
}

class Step {
  constructor(options) {
    if (typeof options === 'string') {
      options = { description: options }
    } else if (!options.description) {
      throw new Error('Description is required.')
    }
    this.description = options.description
  }
  async present(disposition) {
    switch (disposition) {
      case 'erase':
        process.stdout.write('\r\x1B[A')
        break
      case 'unchecked':
        console.log('* [ ] ' + this.description)
        break
      case 'waiting':
        console.log('* [_] ' + this.description)
        break
      case 'checked':
        console.log('* [X] ' + this.description)
        break
    }
  }
}

function step(options) {
  return new Step(options)
}

class Task {
  constructor(options) {
    if (typeof options === 'string') {
      options = { description: options }
    } else if (!options.description) {
      throw new Error('Description is required.')
    }
    this.description = options.description
    this.steps = []
    this.ondone = () => {}
  }
  step(options) {
    this.steps.push(step(options))
    return this
  }
  done(cb) {
    this.ondone = cb
  }
  async present() {
    console.log('===========================')
    console.log(this.description)
    console.log('===========================')
    for (const step of this.steps) {
      await step.present('unchecked')
    }
    for (const step of this.steps) {
      await step.present('erase')
    }
    for (const step of this.steps) {
      await step.present('waiting')
      await step.present('erase') // Doesn't actually erase it.
      process.stdout.write('\x1B[3C') // 3 to the right.
      let next_state = 'checked'
      try {
        await user()
      } catch (err) {
        if (err) {
          throw err
        }
        next_state = 'unchecked'
      }
      process.stdout.write('\x1B[3D') // 3 to the left.
      await step.present(next_state)
    }
    console.log()
    if (quit) {
      process.exit(0)
    }
    this.ondone()
  }
}

function task(options) {
  const task = new Task(options)
  all_tasks.push(task)
  if (!scheduled) {
    setTimeout(present, 0)
    scheduled = true
  }
  return task
}

async function present() {
  scheduled = false
  while (all_tasks.length > 0) {
    const tasks = all_tasks.slice()
    all_tasks.length = 0
    for (const task of tasks) {
      await task.present()
    }
  }
}

global.exit = process.exit
global.setp = step
global.task = task
