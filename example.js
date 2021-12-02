#!/usr/bin/env shepherd

'use strict'

task('Start Installation')
    .step('On a separate computer, prepare installation media.')
    .step('Insert the media into the new computer and boot it up.')

task('Set Up System')
    .step('Change user password.')
    .step('Set default shell.')
    .step('Add shared mounts.')
    .done(exit) // A must-have for every last step!
