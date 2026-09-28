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
    const page = await Page()
    render(page)
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toBeInTheDocument()
  })
})
