import { render } from '@redwoodjs/testing'

import RevealPage from './RevealPage'

describe('RevealPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<RevealPage roomId="42" />)
    }).not.toThrow()
  })
})
