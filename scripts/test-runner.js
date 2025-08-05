#!/usr/bin/env node

/**
 * Comprehensive Test Runner Script
 * Runs all tests in the correct order with proper error handling
 */

const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

class TestRunner {
  constructor() {
    this.results = {
      typeCheck: false,
      lint: false,
      unitTests: false,
      e2eTests: false,
      coverage: null
    };
    this.errors = [];
  }

  async runCommand(command, description) {
    return new Promise((resolve, reject) => {
      console.log(`\n🚀 ${description}...`);
      console.log(`Running: ${command}\n`);
      
      const process = exec(command, (error, stdout, stderr) => {
        if (error) {
          console.error(`❌ ${description} failed:`);
          console.error(stderr || error.message);
          reject({ command, description, error: stderr || error.message });
        } else {
          console.log(`✅ ${description} passed`);
          if (stdout) console.log(stdout);
          resolve(stdout);
        }
      });

      process.stdout.on('data', (data) => {
        process.stdout.write(data);
      });

      process.stderr.on('data', (data) => {
        process.stderr.write(data);
      });
    });
  }

  async runTypeCheck() {
    try {
      await this.runCommand('npm run type-check', 'TypeScript type checking');
      this.results.typeCheck = true;
    } catch (error) {
      this.errors.push(error);
    }
  }

  async runLinting() {
    try {
      await this.runCommand('npm run lint', 'ESLint checking');
      this.results.lint = true;
    } catch (error) {
      this.errors.push(error);
    }
  }

  async runUnitTests() {
    try {
      const output = await this.runCommand('npm run test:coverage', 'Unit tests with coverage');
      this.results.unitTests = true;
      
      // Extract coverage information
      const coverageMatch = output.match(/All files[^|]*\|\s*(\d+\.?\d*)/);
      if (coverageMatch) {
        this.results.coverage = parseFloat(coverageMatch[1]);
      }
    } catch (error) {
      this.errors.push(error);
    }
  }

  async runE2ETests() {
    try {
      // First ensure Playwright browsers are installed
      await this.runCommand('npx playwright install', 'Installing Playwright browsers');
      
      // Run E2E tests
      await this.runCommand('npm run test:e2e', 'End-to-end tests');
      this.results.e2eTests = true;
    } catch (error) {
      this.errors.push(error);
    }
  }

  generateReport() {
    console.log('\n' + '='.repeat(60));
    console.log('📊 TEST RESULTS SUMMARY');
    console.log('='.repeat(60));

    const tests = [
      { name: 'TypeScript Type Check', passed: this.results.typeCheck },
      { name: 'ESLint', passed: this.results.lint },
      { name: 'Unit Tests', passed: this.results.unitTests },
      { name: 'E2E Tests', passed: this.results.e2eTests }
    ];

    tests.forEach(test => {
      const status = test.passed ? '✅ PASS' : '❌ FAIL';
      console.log(`${test.name.padEnd(25)} ${status}`);
    });

    if (this.results.coverage !== null) {
      console.log(`${'Test Coverage'.padEnd(25)} ${this.results.coverage}%`);
    }

    console.log('\n' + '='.repeat(60));

    if (this.errors.length > 0) {
      console.log('❌ ERRORS ENCOUNTERED:');
      this.errors.forEach((error, index) => {
        console.log(`\n${index + 1}. ${error.description}:`);
        console.log(`   Command: ${error.command}`);
        console.log(`   Error: ${error.error}`);
      });
    }

    const passedTests = tests.filter(test => test.passed).length;
    const totalTests = tests.length;

    console.log(`\n📈 Overall: ${passedTests}/${totalTests} test suites passed`);

    if (passedTests === totalTests) {
      console.log('🎉 All tests passed! Your code is ready for production.');
      process.exit(0);
    } else {
      console.log('🔧 Some tests failed. Please fix the issues above.');
      process.exit(1);
    }
  }

  async run() {
    console.log('🧪 Starting comprehensive test suite...\n');

    // Run tests in order
    await this.runTypeCheck();
    await this.runLinting();
    await this.runUnitTests();
    await this.runE2ETests();

    this.generateReport();
  }
}

// Run if called directly
if (require.main === module) {
  const runner = new TestRunner();
  runner.run().catch(error => {
    console.error('❌ Test runner crashed:', error);
    process.exit(1);
  });
}

module.exports = TestRunner;
