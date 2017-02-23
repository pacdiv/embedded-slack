'use strict';

import EmbeddedSlackCore from '../core/index'

class embeddedSlack {
  /**
   * This methods constructs an embeddedSlack instance.
   *
   * @since 1.0.0
   * @param {*} props The required properties to create an embeddedSlack instance.
   */
  constructor(props = {}) {
    const { channel, token } = props

    this.core = new EmbeddedSlackCore({
      channel,
      stateDidChanged: this.render.bind(this),
      token
    })

    this.onSubmit = this.onSubmit.bind(this)
    this.toggle = this.core.toggle.bind(this.core)
    this.render(this.core.getState())
  }

  /**
   * This methods handles the chat form's submit event.
   *
   * @since 1.0.0
   * @param {Event} event The triggered event.
   */
  onSubmit(event) {
    event.preventDefault()
    this.core.sendMessage(event.target[0].value)
    event.target[0].value = ''
  }

  /**
   * This methods renders the chat.
   *
   * @since 1.0.0
   * @param {*} state The core's new state.
   */
  render(state) {
    const container = document.getElementById('embedded-slack')
    const body = document.createElement('div')

    container.innerHTML = ''
    container.className = ''
    if (state.expanded) {
      container.className = 'open'
    }

    body.id = 'embedded-slack-body'
    body.appendChild(this.renderChat(state))
    body.appendChild(this.renderForm())

    container.appendChild(this.renderHeader(state))
    container.appendChild(body)
  }

  /**
   * This methods renders the chat's header.
   *
   * @since 1.0.0
   * @param {*} state The core's new state.
   * @returns {Element} Returns the header DOM element.
   */
  renderHeader(state) {
    const header = document.createElement('div')
    const headerParagraph = document.createElement('p')
    const { expanded, title, unreadMessages } = state

    header.id = 'embedded-slack-header'
    header.onclick = this.toggle
    header.appendChild(headerParagraph)
    if (!expanded && unreadMessages > 0) {
      headerParagraph.innerHTML = unreadMessages + ' unread message(s)'
    }
    else {
      headerParagraph.innerHTML = title
    }

    return header
  }

  /**
   * This methods renders the chat's body.
   *
   * @since 1.0.0
   * @param {*} state The core's new state.
   * @returns {Element} Returns the body DOM element.
   */
  renderChat(state) {
    const chat = document.createElement('div')

    chat.className = 'chat'
    state.messages.map(message => {
      chat.appendChild(this.renderMessage(message))
    })

    return chat
  }

  /**
   * This methods renders the chat's form.
   *
   * @since 1.0.0
   * @returns {Element} Returns the form DOM element.
   */
  renderForm() {
    const form = document.createElement('form')
    const input = document.createElement('input')

    form.className = 'form-container'
    input.placeholder = 'Type something here'
    form.appendChild(input)
    form.onsubmit = this.onSubmit

    return form
  }

  /**
   * This methods renders a chat's single message.
   *
   * @since 1.0.0
   * @param {*} message The required property containing content and author of the message.
   * @returns {Element} Returns the message as a DOM element.
   */
  renderMessage(message) {
    const msg = document.createElement('div')
    const author = document.createElement('p')
    const content = document.createElement('p')

    msg.className = 'message'
    if (typeof message.fromSupport !== 'undefined') {
      msg.className += ' support'
    }
    author.className = 'author'
    content.className = 'content'
    author.innerHTML = message.user
    content.innerHTML = message.text

    msg.appendChild(author)
    msg.appendChild(content)

    return msg
  }
}

export default embeddedSlack
