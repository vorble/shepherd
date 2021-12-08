#!/usr/bin/env shepherd

'use strict'

const systems = [
  {
    name: 'Helium',
    cpu_count: 16,
    rams: 8,
    has_geiger_counter: true,
    has_web_management: true,
  },
  {
    name: 'Neon',
    cpu_count: 64,
    rams: 128,
    has_geiger_counter: true,
    has_database: true,
  },
  {
    name: 'Argon',
    cpu_count: 16,
    rams: 32,
    has_web_management: true,
  },
  {
    name: 'Krypton',
    cpu_count: 8,
    rams: 64,
    has_web_management: true,
    has_database: true,
  },
  {
    name: 'Xenon',
    cpu_count: 64,
    rams: 32,
    has_geiger_counter: true,
  },
]

let t = null

for (const s of systems) {
  t = task('Server - ' + s.name)
  t.step('Set Up Access Keys')
  t.step('Enable System Monitor Service')
  if (s.cpu_count >= 32) {
    t.step('MANY CORE SYSTEM: Attach Bus Duster')
  }
  if (s.rams >= 64) {
    t.step('HIGH MEMORY: Enable Memory Sweeper Service')
  }
  if (s.has_geiger_counter) {
    t.step('Initialize Geiger Counter')
    t.step('Join Entropy Pool')
  }
  if (s.has_web_management) {
    t.step('Enable Reverse Proxy')
    t.step('Enable Web Management Service')
  }
}

if (t) {
  t.done(exit)
}
