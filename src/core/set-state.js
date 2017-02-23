'use strict';

/**
 * This function updates the core's state.
 *
 * @since 1.0.0
 * @param {*} nextState The core's next state.
 */
export default function setState(nextState) {
  const keys = Object.keys(nextState)

  for (const key of keys) {
    if (typeof this.state[key] === 'undefined') {
      continue
    }
    this.state[key] = nextState[key]
  }

  this.stateDidChanged(this.getState())
}
