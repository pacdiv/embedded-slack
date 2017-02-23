'use strict';

import pushMessage from './push-message'
import { rtm, users } from 'slack'

/**
 * This function starts the core.
 *
 * @since 1.0.0
 */
export default function start() {
  const self = this
  const { token } = this.state
  const bot = rtm.client()

  bot.message(function(message) {
    users.info({ token, user: message.user }, (err, author) => {
      if (err) {
        console.error('users.info', err)
      }
      else {
        message.fromSupport = true
        pushMessage.call(self, message, author)
      }
    })
  })
  bot.listen({ token: token })
}
