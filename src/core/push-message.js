'use strict';

import setState from './set-state'

/**
 * This function adds to a new message to the core's messages property.
 *
 * @since 1.0.0
 * @param {*} message The value containing the text of the message.
 * @param {*} author The value containing the author info of the message.
 */
export default function pushMessage(message, author) {
  const nextState = {}
  const authorName = typeof author === 'string'
    ? author
    : author.user.real_name
  const {
    expanded,
    messages,
    unreadMessages
  } = this.state

  message.user = authorName
  messages.push(message)
  nextState.messages = messages

  if (!expanded) {
    nextState.unreadMessages = unreadMessages + 1
  }

  setState.call(this, nextState)
}
