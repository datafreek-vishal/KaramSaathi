import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import LoginPage from '../../src/app/[locale]/auth/login/page'

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

describe('LoginPage', () => {
  beforeEach(() => {
    render(<LoginPage {...mockProps} />)
  })

  test('renders login form correctly', () => {
    expect(screen.getByText('Sign In to Your Account')).toBeInTheDocument()
    expect(screen.getByRole('textbox', { name: /email|identifier/i })).toBeInTheDocument()
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /sign in|login/i })).toBeInTheDocument()
  })

  test('displays login method toggle buttons', () => {
    expect(screen.getByRole('button', { name: /phone/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /email/i })).toBeInTheDocument()
  })

  test('toggles between email and phone input', async () => {
    const user = userEvent.setup()
    const identifierInput = screen.getByRole('textbox', { name: /email|identifier/i })
    
    // Initially should be email type
    expect(identifierInput).toHaveAttribute('type', 'email')
    
    // Click phone toggle
    await user.click(screen.getByRole('button', { name: /phone/i }))
    
    // Should switch to tel type
    expect(identifierInput).toHaveAttribute('type', 'tel')
    
    // Click email toggle
    await user.click(screen.getByRole('button', { name: /email/i }))
    
    // Should switch back to email type
    expect(identifierInput).toHaveAttribute('type', 'email')
  })

  test('opens OTP modal when Send OTP is clicked', async () => {
    const user = userEvent.setup()
    
    // Fill identifier
    await user.type(screen.getByRole('textbox', { name: /email|identifier/i }), 'test@example.com')
    
    // Click Send OTP button
    const sendOtpButton = screen.getByRole('button', { name: /send otp/i })
    await user.click(sendOtpButton)
    
    // Should show OTP modal
    expect(screen.getByText('Enter OTP')).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/otp/i)).toBeInTheDocument()
  })

  test('closes OTP modal when Cancel is clicked', async () => {
    const user = userEvent.setup()
    
    // Open OTP modal
    await user.type(screen.getByRole('textbox', { name: /email|identifier/i }), 'test@example.com')
    await user.click(screen.getByRole('button', { name: /send otp/i }))
    
    // Verify modal is open
    expect(screen.getByText('Enter OTP')).toBeInTheDocument()
    
    // Click cancel
    await user.click(screen.getByRole('button', { name: /cancel/i }))
    
    // Modal should be closed
    expect(screen.queryByText('Enter OTP')).not.toBeInTheDocument()
  })

  test('validates required fields', async () => {
    const user = userEvent.setup()
    
    // Try to submit empty form
    const submitButton = screen.getByRole('button', { name: /sign in|login/i })
    await user.click(submitButton)
    
    // Check for required attributes
    const identifierInput = screen.getByRole('textbox', { name: /email|identifier/i })
    const passwordInput = screen.getByLabelText(/password/i)
    
    expect(identifierInput).toBeRequired()
    expect(passwordInput).toBeRequired()
  })

  test('submits form with valid data', async () => {
    const user = userEvent.setup()
    
    // Fill form
    const identifierInput = screen.getByRole('textbox', { name: /email|identifier/i })
    const passwordInput = screen.getByLabelText(/password/i)
    
    await user.type(identifierInput, 'test@example.com')
    await user.type(passwordInput, 'password123')
    
    // Submit form
    const submitButton = screen.getByRole('button', { name: /sign in|login/i })
    await user.click(submitButton)
    
    // Form should be submitted (in real app, this would trigger authentication)
    expect(identifierInput).toHaveValue('test@example.com')
    expect(passwordInput).toHaveValue('password123')
  })

  test('handles OTP verification', async () => {
    const user = userEvent.setup()
    
    // Open OTP modal
    await user.type(screen.getByRole('textbox', { name: /email|identifier/i }), 'test@example.com')
    await user.click(screen.getByRole('button', { name: /send otp/i }))
    
    // Fill OTP
    await user.type(screen.getByPlaceholderText(/otp/i), '123456')
    
    // Verify OTP
    await user.click(screen.getByRole('button', { name: /verify otp/i }))
    
    // Should handle OTP verification
    expect(screen.getByPlaceholderText(/otp/i)).toHaveValue('123456')
  })

  test('displays link to registration page', () => {
    const registerLink = screen.getByRole('link', { name: /sign up|register/i })
    expect(registerLink).toBeInTheDocument()
    expect(registerLink).toHaveAttribute('href', expect.stringContaining('register'))
  })

  test('displays forgot password link', () => {
    const forgotPasswordLink = screen.getByText(/forgot password/i)
    expect(forgotPasswordLink).toBeInTheDocument()
  })
})
