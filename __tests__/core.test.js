import EmbeddedSlackCore from '../src/core/index'
import { pick } from 'lodash/object'

const channel = 'channel_exemple'
const stateDidChanged = function(state) {}
const token = 'token_exemple'
const basicProps = { channel, token }

test('core\'s state after basic creation', () => {
  const embeddedSlackCore = new EmbeddedSlackCore(basicProps)

  expect(embeddedSlackCore.getState()).toEqual({
    channel,
    expanded: false,
    lang: 'en',
    messages: [],
    title: 'Chat',
    token,
    unreadMessages: 0
  })
})

test('core creation without token', () => {
  expect(channel => {
    return new EmbeddedSlackCore({ channel })
  }).toThrow('You must provide a token and a channel to EmbeddedSlackCore.')
})

test('core creation without channel', () => {
  expect(token => {
    return new EmbeddedSlackCore({ token })
  }).toThrow('You must provide a token and a channel to EmbeddedSlackCore.')
})

test('core creation with specific language', () => {
  basicProps.lang = 'es'
  const embeddedSlackCore = new EmbeddedSlackCore(basicProps)

  expect(embeddedSlackCore.getState().lang).toEqual('es')
})

test('core creation with specific stateDidChanged callback', () => {
  basicProps.stateDidChanged = stateDidChanged
  const embeddedSlackCore = new EmbeddedSlackCore(basicProps)

  expect(embeddedSlackCore.stateDidChanged).toEqual(stateDidChanged)
})

test('core state after toggle method been called', () => {
  const embeddedSlackCore = new EmbeddedSlackCore(basicProps)

  Promise.resolve(embeddedSlackCore.toggle()).then(() => {
    expect(embeddedSlackCore.getState()).toMatchObject({
      expanded: true,
      title: 'Chat',
      unreadMessages: 0
    })
  })
})

test('core state after toggle method been called twice', () => {
  const embeddedSlackCore = new EmbeddedSlackCore(basicProps)

  Promise.resolve(embeddedSlackCore.toggle()).then(() => {
    Promise.resolve(embeddedSlackCore.toggle()).then(() => {
      expect(embeddedSlackCore.getState().expanded).toBe(false)
    })
  })
})
