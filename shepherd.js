'use strict'

let all_tasks = []
let scheduled = false

class Step {
  constructor(options) {
    if (typeof options === 'string') {
      options = { description: options }
    } else if (!options.description) {
      throw new Error('Description is required.')
    }
    this.description = options.description
  }
  async present() {
    console.log('* [ ] ' + this.description)
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
      await step.present()
    }
    console.log()
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

global.setp = step
global.task = task
