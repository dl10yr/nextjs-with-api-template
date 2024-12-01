import { render, screen } from '@testing-library/react'
import { describe, it, vi } from 'vitest'
import { expect } from 'vitest'

import Page from '../../app/page'

describe('Home', () => {
  it('renders a heading', () => {
    render(<Page />)

    const heading = screen.getByRole('heading', {
      name: /index/i,
    })

    expect(heading).toBeInTheDocument()
  })
})
