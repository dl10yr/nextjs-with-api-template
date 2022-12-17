import { render, screen } from '@testing-library/react'
import Page from '../../app/page'

jest.mock('next/router', () => require('next-router-mock'))
describe('Home', () => {
  it('renders a heading', () => {
    render(<Page />)

    const heading = screen.getByRole('heading', {
      name: /index/i,
    })

    expect(heading).toBeInTheDocument()
  })
})
