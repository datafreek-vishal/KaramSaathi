import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import HomePage from '../../src/app/[locale]/page'

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
}))

const mockProps = {
  params: { locale: 'en' }
}

describe('HomePage', () => {
  beforeEach(() => {
    render(<HomePage {...mockProps} />)
  })

  test('renders homepage correctly', () => {
    expect(screen.getByText('Welcome to Karam Sathi')).toBeInTheDocument()
  })

  test('displays main navigation buttons', () => {
    expect(screen.getByRole('link', { name: /find work/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /post job/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /login/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /sign up/i })).toBeInTheDocument()
  })

  test('navigation links have correct href attributes', () => {
    expect(screen.getByRole('link', { name: /find work/i })).toHaveAttribute('href', '/en/worker')
    expect(screen.getByRole('link', { name: /post job/i })).toHaveAttribute('href', '/en/employer')
    expect(screen.getByRole('link', { name: /login/i })).toHaveAttribute('href', '/en/auth/login')
    expect(screen.getByRole('link', { name: /sign up/i })).toHaveAttribute('href', '/en/auth/register')
  })

  test('displays platform description', () => {
    expect(screen.getByText(/connecting skilled workers with employers/i)).toBeInTheDocument()
  })

  test('has proper page structure', () => {
    // Check for main content areas
    expect(screen.getByRole('main')).toBeInTheDocument()
    
    // Check for hero section
    const heroSection = screen.getByText('Welcome to Karam Sathi').closest('section')
    expect(heroSection).toBeInTheDocument()
  })
})
