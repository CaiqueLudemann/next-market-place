import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'

/**
 * Example test to demonstrate TDD workflow
 *
 * This is a placeholder test to show the testing setup.
 * You'll write real tests following TDD principles.
 */

// Simple component for testing
function ExampleComponent() {
  return <div>Hello, Marketplace!</div>
}

describe('Example Test Suite', () => {
  it('should render the example component', () => {
    render(<ExampleComponent />)
    expect(screen.getByText('Hello, Marketplace!')).toBeInTheDocument()
  })

  it('should demonstrate basic assertions', () => {
    expect(true).toBe(true)
    expect(1 + 1).toBe(2)
    expect('marketplace').toContain('market')
  })
})
