import { Emitter } from '../Emitter.js'

describe('Emitter', () => {
  let emitter

  beforeEach(() => {
    emitter = new Emitter()
  })

  it('should emit an event and call all listeners', () => {
    const listener1 = jest.fn()
    const listener2 = jest.fn()
    const args = { a: 1 }

    emitter.subscribe('table:select', listener1)
    emitter.subscribe('table:select', listener2)

    emitter.emit('table:select', args)

    expect(listener1).toHaveBeenCalledWith(args)
    expect(listener2).toHaveBeenCalledWith(args)
  })

  it('should return true when emitting an event with listeners', () => {
    emitter.subscribe('table:select', () => { })

    expect(emitter.emit('table:select')).toBe(true)
  })

  it('should return false when emitting an event with no listeners', () => {
    expect(emitter.emit('table:select')).toBe(false)
  })

  it('should subscribe to an event and add it to the listeners', () => {
    const listener = jest.fn()

    const unsubscribe = emitter.subscribe('table:select', listener)

    expect(emitter.listeners['table:select']).toContain(listener)
    unsubscribe()
    expect(emitter.listeners['table:select']).not.toContain(listener)
  })
})
