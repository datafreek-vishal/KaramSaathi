import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import RegisterPage from '../../src/app/[locale]/auth/register/page'

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

describe('RegisterPage', () => {
  beforeEach(() => {
    render(<RegisterPage {...mockProps} />)
  })

  test('renders registration form correctly', () => {
    expect(screen.getByText('Create Your Account')).toBeInTheDocument()
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/phone/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/^password/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument()
  })

  test('displays account type selection', () => {
    expect(screen.getByLabelText(/worker/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/employer/i)).toBeInTheDocument()
  })

  test('shows worker-specific fields when worker is selected', async () => {
    const user = userEvent.setup()
    
    // Select worker account type
    await user.click(screen.getByLabelText(/worker/i))
    
    // Check that worker-specific fields appear
    expect(screen.getByLabelText(/skills/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/experience/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/hourly rate/i)).toBeInTheDocument()
  })

  test('shows employer-specific fields when employer is selected', async () => {
    const user = userEvent.setup()
    
    // Select employer account type
    await user.click(screen.getByLabelText(/employer/i))
    
    // Check that employer-specific fields appear
    expect(screen.getByLabelText(/company name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/company description/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/website/i)).toBeInTheDocument()
  })

  test('validates required fields', () => {
    const nameInput = screen.getByLabelText(/full name/i)
    const emailInput = screen.getByLabelText(/email/i)
    const passwordInput = screen.getByLabelText(/^password/i)
    
    expect(nameInput).toBeRequired()
    expect(emailInput).toBeRequired()
    expect(passwordInput).toBeRequired()
  })

  test('fills and submits worker registration form', async () => {
    const user = userEvent.setup()
    
    // Fill basic information
    await user.type(screen.getByLabelText(/full name/i), 'John Worker')
    await user.type(screen.getByLabelText(/email/i), 'john.worker@example.com')
    await user.type(screen.getByLabelText(/phone/i), '+1234567890')
    await user.type(screen.getByLabelText(/^password/i), 'SecurePassword123')
    await user.type(screen.getByLabelText(/confirm password/i), 'SecurePassword123')
    
    // Select worker account type
    await user.click(screen.getByLabelText(/worker/i))
    
    // Fill worker-specific fields
    await user.type(screen.getByLabelText(/skills/i), 'Plumbing, Electrical work')
    await user.selectOptions(screen.getByLabelText(/experience/i), '3-5 years')
    await user.type(screen.getByLabelText(/hourly rate/i), '25')
    
    // Verify form values
    expect(screen.getByLabelText(/full name/i)).toHaveValue('John Worker')
    expect(screen.getByLabelText(/email/i)).toHaveValue('john.worker@example.com')
    expect(screen.getByLabelText(/skills/i)).toHaveValue('Plumbing, Electrical work')
  })

  test('fills and submits employer registration form', async () => {
    const user = userEvent.setup()
    
    // Fill basic information
    await user.type(screen.getByLabelText(/full name/i), 'Jane Employer')
    await user.type(screen.getByLabelText(/email/i), 'jane.employer@example.com')
    await user.type(screen.getByLabelText(/phone/i), '+1987654321')
    await user.type(screen.getByLabelText(/^password/i), 'SecurePassword456')
    await user.type(screen.getByLabelText(/confirm password/i), 'SecurePassword456')
    
    // Select employer account type
    await user.click(screen.getByLabelText(/employer/i))
    
    // Fill employer-specific fields
    await user.type(screen.getByLabelText(/company name/i), 'ABC Construction')
    await user.type(screen.getByLabelText(/company description/i), 'Leading construction company')
    await user.type(screen.getByLabelText(/website/i), 'https://abc-construction.com')
    
    // Verify form values
    expect(screen.getByLabelText(/full name/i)).toHaveValue('Jane Employer')
    expect(screen.getByLabelText(/email/i)).toHaveValue('jane.employer@example.com')
    expect(screen.getByLabelText(/company name/i)).toHaveValue('ABC Construction')
  })

  test('displays link to login page', () => {
    const loginLink = screen.getByRole('link', { name: /sign in|login/i })
    expect(loginLink).toBeInTheDocument()
    expect(loginLink).toHaveAttribute('href', expect.stringContaining('login'))
  })

  test('toggles between account types correctly', async () => {
    const user = userEvent.setup()
    
    // Initially no conditional fields should be visible
    expect(screen.queryByLabelText(/skills/i)).not.toBeInTheDocument()
    expect(screen.queryByLabelText(/company name/i)).not.toBeInTheDocument()
    
    // Select worker
    await user.click(screen.getByLabelText(/worker/i))
    expect(screen.getByLabelText(/skills/i)).toBeInTheDocument()
    expect(screen.queryByLabelText(/company name/i)).not.toBeInTheDocument()
    
    // Switch to employer
    await user.click(screen.getByLabelText(/employer/i))
    expect(screen.queryByLabelText(/skills/i)).not.toBeInTheDocument()
    expect(screen.getByLabelText(/company name/i)).toBeInTheDocument()
  })
})
