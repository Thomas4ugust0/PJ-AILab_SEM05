import { render, screen } from '@testing-library/react'
import Page from '../app/page'

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ status: 'ok', items: ['Test 1'] }),
  })
)

describe('Page', () => {
  it('renders a heading', async () => {
    render(<Page />)
    const heading = await screen.findByRole('heading', { level: 1 })
    expect(heading).toBeInTheDocument()
  })
})
