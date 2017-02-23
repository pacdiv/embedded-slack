'use strict';

/**
 * This function returns an object representing the core's initial state.
 *
 * @since 1.0.0
 * @param {*} props The required properties to create the initial state.
 * @returns {*} Returns the core's initial state.
 */
export default function getInitialState(props) {
  const {
    channel,
    lang,
    token
  } = props

  return {
    channel: channel,
    expanded: false,
    lang: lang || 'en',
    messages: [],
    title: 'Chat',
    token: token,
    unreadMessages: 0
  }
}
