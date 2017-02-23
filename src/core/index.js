'use strict';

import { chat } from 'slack'
import getInitialState from './get-initial-state'
import pushMessage from './push-message'
import setState from './set-state'
import start from './start'

class EmbeddedSlackCore {
  /**
   * This methods constructs an EmbeddedSlackCore instance.
   *
   * @since 1.0.0
   * @param {*} props The required properties to create an EmbeddedSlackCore instance.
   * @returns {EmbeddedSlackCore} Returns an EmbeddedSlackCore instance.
   */
  constructor(props = {}) {
    const {
      channel,
      stateDidChanged = function(state) {},
      token
    } = props

    if (typeof token === 'undefined' || typeof channel === 'undefined') {
      throw new Error('You must provide a token and a channel to EmbeddedSlackCore.')
    }

    this.state = getInitialState(props)
    this.stateDidChanged = stateDidChanged
    start.call(this)

    return this
  }

  /**
   * This methods returns the current instance's state property.
   *
   * @since 1.0.0
   * @returns {*} Returns an EmbeddedSlackCore instance.
   */
  getState() {
    return this.state
  }

  /**
   * This methods sends a message to the Slack API.
   *
   * @since 1.0.0
   * @param {*} text The text message to send.
   */
  sendMessage(text) {
    const self = this
    const { channel, token } = this.state
    const props = { token, channel, text }

    chat.postMessage(props, function(err, data) {
      if (err) {
        console.error('sendMessage:err', err)
      }
      else {
        pushMessage.call(self, data.message, 'Me')
      }
    })
  }

  /**
   * This methods toggles the expanded property.
   *
   * @since 1.0.0
   */
  toggle() {
    let nextState = { expanded: false }
    const { expanded } = this.state

    if (!expanded) {
      nextState = {
        expanded: true,
        title: 'Chat',
        unreadMessages: 0
      }
    }

    setState.call(this, nextState)
  }
}

export default EmbeddedSlackCore
