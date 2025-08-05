'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Mail, Phone, Smartphone, X } from 'lucide-react';

interface LoginPageProps {
  params: { locale: string };
}

export default function LoginPage({ params: { locale } }: LoginPageProps) {
  const [loginMethod, setLoginMethod] = useState<'phone' | 'email'>('phone');
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [formData, setFormData] = useState({
    phone: '',
    email: '',
    otp: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setShowOtpModal(true);
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('OTP submitted:', formData.otp);
    window.location.href = `/${locale}`;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <Link href={`/${locale}`} className="flex justify-center">
            <h1 className="text-3xl font-bold text-blue-600">KaramSaathi</h1>
          </Link>
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <Link href={`/${locale}/auth/register`} className="font-medium text-blue-600 hover:text-blue-500">
              Sign up
            </Link>
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <div className="flex rounded-lg border border-gray-300 p-1">
                  <button
                    type="button"
                    onClick={() => setLoginMethod('phone')}
                    className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                      loginMethod === 'phone'
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <Phone className="h-4 w-4 inline mr-2" />
                    Phone
                  </button>
                  <button
                    type="button"
                    onClick={() => setLoginMethod('email')}
                    className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                      loginMethod === 'email'
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <Mail className="h-4 w-4 inline mr-2" />
                    Email
                  </button>
                </div>
              </div>

              {loginMethod === 'phone' && (
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                    Phone Number
                  </label>
                  <div className="mt-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Phone className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+91 98765 43210"
                      className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <p className="mt-2 text-xs text-gray-500">
                    We'll send you a verification code via SMS
                  </p>
                </div>
              )}

              {loginMethod === 'email' && (
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <div className="mt-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your@email.com"
                      className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <p className="mt-2 text-xs text-gray-500">
                    We'll send you a verification code via email
                  </p>
                </div>
              )}

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Send Verification Code
                </button>
              </div>

              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">Or continue with</span>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    <span>Google</span>
                  </button>
                  <button
                    type="button"
                    className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    <span>Facebook</span>
                  </button>
                </div>
              </div>

              <div className="text-center">
                <Link href={`/${locale}`} className="text-sm text-gray-600 hover:text-gray-900 flex items-center justify-center">
                  <ArrowLeft className="h-4 w-4 mr-1" />
                  Back to home
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>

      {showOtpModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Enter Verification Code</h3>
              <button
                onClick={() => setShowOtpModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <p className="text-sm text-gray-600 mb-4">
              We've sent a 6-digit verification code to{' '}
              {loginMethod === 'phone' ? formData.phone : formData.email}
            </p>

            <form onSubmit={handleOtpSubmit}>
              <div className="mb-4">
                <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-2">
                  Verification Code
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Smartphone className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="otp"
                    name="otp"
                    type="text"
                    required
                    maxLength={6}
                    value={formData.otp}
                    onChange={handleInputChange}
                    placeholder="123456"
                    className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-center text-lg tracking-widest"
                  />
                </div>
              </div>

              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={() => setShowOtpModal(false)}
                  className="flex-1 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Verify
                </button>
              </div>

              <div className="mt-4 text-center">
                <button
                  type="button"
                  className="text-sm text-blue-600 hover:text-blue-500"
                >
                  Resend code
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}