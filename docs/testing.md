# Test Documentation

## Overview

This project includes comprehensive testing coverage with both unit tests and end-to-end (E2E) tests to ensure functionality and reliability.

## Test Types

### 1. Unit Tests (Jest + React Testing Library)
- **Location**: `tests/unit/`
- **Technology**: Jest, React Testing Library, @testing-library/user-event
- **Coverage**: Component functionality, user interactions, form validation

#### Unit Test Files:
- `homepage.test.tsx` - Tests homepage component rendering and navigation
- `login.test.tsx` - Tests login form functionality, OTP modal, form validation
- `register.test.tsx` - Tests registration form, conditional fields, account type selection

### 2. End-to-End Tests (Playwright)
- **Location**: `tests/e2e/`
- **Technology**: Playwright
- **Coverage**: Complete user workflows, cross-browser testing

#### E2E Test Files:
- `01-homepage.spec.ts` - Homepage navigation and routing
- `02-registration.spec.ts` - User registration workflows
- `03-login.spec.ts` - Login and authentication flows
- `04-worker-dashboard.spec.ts` - Worker functionality and job search
- `05-employer-dashboard.spec.ts` - Employer functionality and job posting
- `06-complete-user-journey.spec.ts` - End-to-end user scenarios

## Running Tests

### All Tests
```bash
npm run test:all
```

### Unit Tests Only
```bash
# Run once
npm run test

# Watch mode (for development)
npm run test:watch

# With coverage report
npm run test:coverage
```

### E2E Tests Only
```bash
# Headless mode
npm run test:e2e

# With browser UI
npm run test:e2e:ui

# In headed mode (see browser)
npm run test:e2e:headed

# Debug mode
npm run test:e2e:debug
```

### Comprehensive Test Runner
```bash
node scripts/test-runner.js
```

## Test Configuration

### Jest Configuration (`jest.config.js`)
- Next.js integration
- TypeScript support
- JSdom environment
- Coverage thresholds (70% minimum)
- Module path mapping

### Playwright Configuration (`playwright.config.ts`)
- Multi-browser testing (Chrome, Firefox, Safari)
- Mobile device testing
- Automatic screenshot and video capture on failure
- Automatic retry on CI

## Test Features

### Unit Tests Cover:
- ✅ Component rendering
- ✅ User interactions (clicks, form inputs)
- ✅ Form validation
- ✅ Conditional rendering
- ✅ Navigation and routing
- ✅ State management

### E2E Tests Cover:
- ✅ Complete user registration flows
- ✅ Login and authentication
- ✅ Job posting and searching
- ✅ Worker-employer interactions
- ✅ Cross-platform compatibility
- ✅ Performance and loading times
- ✅ Responsive design testing

## Coverage Requirements

- **Minimum Coverage**: 70% for branches, functions, lines, and statements
- **Coverage Reports**: Generated in `coverage/` directory
- **CI Integration**: Coverage reports uploaded to Codecov

## Continuous Integration

### GitHub Actions Workflow (`.github/workflows/ci.yml`)
- ✅ Type checking
- ✅ Linting
- ✅ Unit tests with coverage
- ✅ E2E tests
- ✅ Multi-environment testing
- ✅ Automatic artifact upload

## Best Practices

### Writing Unit Tests
1. Use descriptive test names
2. Follow AAA pattern (Arrange, Act, Assert)
3. Mock external dependencies
4. Test user behavior, not implementation details
5. Use proper selectors (prefer role-based queries)

### Writing E2E Tests
1. Test complete user workflows
2. Use page object model for complex flows
3. Include proper wait strategies
4. Test error scenarios
5. Verify visual elements and interactions

### Test Data Management
- Use factory functions for test data
- Create reusable test utilities
- Isolate test data between tests
- Use proper cleanup strategies

## Debugging Tests

### Unit Tests
```bash
# Run specific test file
npm test -- homepage.test.tsx

# Run tests matching pattern
npm test -- --testNamePattern="login"

# Debug mode
npm test -- --detectOpenHandles
```

### E2E Tests
```bash
# Run specific test file
npx playwright test 01-homepage.spec.ts

# Debug specific test
npx playwright test 01-homepage.spec.ts --debug

# Run with trace viewer
npx playwright test --trace on
```

## Performance Testing

The E2E tests include basic performance assertions:
- Page load times under 5 seconds
- Smooth navigation between pages
- Form submission responsiveness

## Mobile Testing

E2E tests include mobile device simulation:
- iPhone and Android viewports
- Touch interactions
- Mobile-specific UI elements
- Responsive design validation

## Future Enhancements

- [ ] Visual regression testing
- [ ] API testing integration
- [ ] Load testing with k6
- [ ] Accessibility testing automation
- [ ] Database seeding for E2E tests
- [ ] Multi-language testing
- [ ] Security testing integration
