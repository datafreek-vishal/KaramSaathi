'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, User, MapPin, Phone, Mail, Briefcase } from 'lucide-react';

interface RegisterPageProps {
  params: { locale: string };
}

export default function RegisterPage({ params: { locale } }: RegisterPageProps) {
  const [accountType, setAccountType] = useState<'worker' | 'employer'>('worker');
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    location: '',
    skills: '',
    companyName: '',
    companySize: '',
    industry: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Registration data:', { accountType, ...formData });
    window.location.href = `/${locale}/auth/login`;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link href={`/${locale}`} className="flex justify-center">
          <h1 className="text-3xl font-bold text-blue-600">KaramSaathi</h1>
        </Link>
        <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
          Create your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link href={`/${locale}/auth/login`} className="font-medium text-blue-600 hover:text-blue-500">
            Sign in
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Account Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                I am registering as a
              </label>
              <div className="grid grid-cols-2 gap-3">
                <label className={`relative flex cursor-pointer rounded-lg border p-4 shadow-sm focus:outline-none ${
                  accountType === 'worker' 
                    ? 'border-blue-600 ring-2 ring-blue-600 bg-blue-50' 
                    : 'border-gray-300 bg-white hover:border-blue-300'
                }`}>
                  <input
                    type="radio"
                    name="account-type"
                    value="worker"
                    checked={accountType === 'worker'}
                    onChange={(e) => setAccountType(e.target.value as 'worker' | 'employer')}
                    className="sr-only"
                  />
                  <div className="flex items-center">
                    <div className="text-sm">
                      <User className="h-6 w-6 text-blue-600 mb-2" />
                      <p className="font-medium text-gray-900">Worker</p>
                      <p className="text-gray-500">Looking for jobs</p>
                    </div>
                  </div>
                </label>
                <label className={`relative flex cursor-pointer rounded-lg border p-4 shadow-sm focus:outline-none ${
                  accountType === 'employer' 
                    ? 'border-blue-600 ring-2 ring-blue-600 bg-blue-50' 
                    : 'border-gray-300 bg-white hover:border-blue-300'
                }`}>
                  <input
                    type="radio"
                    name="account-type"
                    value="employer"
                    checked={accountType === 'employer'}
                    onChange={(e) => setAccountType(e.target.value as 'worker' | 'employer')}
                    className="sr-only"
                  />
                  <div className="flex items-center">
                    <div className="text-sm">
                      <Briefcase className="h-6 w-6 text-blue-600 mb-2" />
                      <p className="font-medium text-gray-900">Employer</p>
                      <p className="text-gray-500">Hiring workers</p>
                    </div>
                  </div>
                </label>
              </div>
            </div>

            {/* Basic Information */}
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

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
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address (Optional)
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your@email.com"
                  className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                Location
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPin className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="location"
                  name="location"
                  type="text"
                  required
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="City, State"
                  className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Conditional Fields based on Account Type */}
            {accountType === 'worker' && (
              <div>
                <label htmlFor="skills" className="block text-sm font-medium text-gray-700">
                  Skills & Experience
                </label>
                <div className="mt-1">
                  <textarea
                    id="skills"
                    name="skills"
                    rows={3}
                    value={formData.skills}
                    onChange={handleInputChange}
                    placeholder="Describe your skills, experience, and what type of work you're looking for..."
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            )}

            {accountType === 'employer' && (
              <>
                <div>
                  <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">
                    Company Name
                  </label>
                  <div className="mt-1">
                    <input
                      id="companyName"
                      name="companyName"
                      type="text"
                      required
                      value={formData.companyName}
                      onChange={handleInputChange}
                      placeholder="Your company name"
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="companySize" className="block text-sm font-medium text-gray-700">
                    Company Size
                  </label>
                  <div className="mt-1">
                    <select
                      id="companySize"
                      name="companySize"
                      value={formData.companySize}
                      onChange={handleInputChange}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select company size</option>
                      <option value="1-10">1-10 employees</option>
                      <option value="11-50">11-50 employees</option>
                      <option value="51-200">51-200 employees</option>
                      <option value="201-500">201-500 employees</option>
                      <option value="500+">500+ employees</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="industry" className="block text-sm font-medium text-gray-700">
                    Industry
                  </label>
                  <div className="mt-1">
                    <input
                      id="industry"
                      name="industry"
                      type="text"
                      value={formData.industry}
                      onChange={handleInputChange}
                      placeholder="e.g., Construction, Technology, Healthcare"
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
              </>
            )}

            {/* Terms and Conditions */}
            <div>
              <label className="flex items-start">
                <input
                  type="checkbox"
                  required
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-0.5"
                />
                <span className="ml-2 text-sm text-gray-600">
                  I agree to the{' '}
                  <Link href={`/${locale}/terms`} className="text-blue-600 hover:text-blue-500">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link href={`/${locale}/privacy`} className="text-blue-600 hover:text-blue-500">
                    Privacy Policy
                  </Link>
                </span>
              </label>
            </div>

            <div>
              <label className="flex items-start">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-0.5"
                />
                <span className="ml-2 text-sm text-gray-600">
                  I want to receive job alerts and updates via SMS and email
                </span>
              </label>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Create Account
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
                <ChevronLeft className="h-4 w-4 mr-1" />
                Back to home
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}