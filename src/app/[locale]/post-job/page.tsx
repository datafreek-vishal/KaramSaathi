import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { ChevronLeft, DollarSign, MapPin, Clock, Users, Briefcase } from 'lucide-react';

interface PostJobPageProps {
  params: { locale: string };
}

export default async function PostJobPage({ params: { locale } }: PostJobPageProps) {
  const t = await getTranslations();

  const categories = [
    'Construction', 'Cleaning', 'Delivery', 'Cooking', 'Electrical', 'Plumbing',
    'Gardening', 'Security', 'Driver', 'Mechanic', 'Painter', 'Carpenter',
    'Welder', 'Mason', 'Helper', 'Other'
  ];

  const jobTypes = ['Full-time', 'Part-time', 'Contract', 'Temporary'];
  const experienceLevels = ['No Experience', '1-2 years', '3-5 years', '5+ years'];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href={`/${locale}`} className="text-2xl font-bold text-blue-600">
                KaramSaathi
              </Link>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href={`/${locale}/jobs`} className="text-gray-700 hover:text-blue-600">Find Jobs</Link>
              <Link href={`/${locale}/post-job`} className="text-blue-600 font-semibold">Post Job</Link>
              <Link href={`/${locale}/about`} className="text-gray-700 hover:text-blue-600">About</Link>
            </nav>
            <div className="flex items-center space-x-4">
              <Link href={`/${locale}/auth/login`} className="text-gray-700 hover:text-blue-600">Login</Link>
              <Link href={`/${locale}/auth/register`} className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center mb-6">
          <Link href={`/${locale}`} className="text-gray-500 hover:text-gray-700 flex items-center">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Home
          </Link>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-gray-900">Post a Job</span>
        </nav>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Post a Job</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Find the right workers for your business. Create a detailed job posting to attract qualified candidates.
          </p>
        </div>

        {/* Pricing Info */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Job Posting Pricing</h3>
              <p className="text-blue-700">
                Post your job for ₹299 for 30 days. Get quality applications from verified workers.
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-blue-600">₹299</div>
              <div className="text-sm text-blue-600">for 30 days</div>
            </div>
          </div>
        </div>

        {/* Job Form */}
        <form className="bg-white rounded-lg shadow-sm border overflow-hidden">
          {/* Basic Information */}
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Basic Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Job Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Construction Helper, House Cleaner"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Job Category *
                </label>
                <select
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Your company name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Job Type *
                </label>
                <select
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select job type</option>
                  {jobTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Location & Salary */}
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Location & Compensation</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Job Location *
                </label>
                <div className="relative">
                  <MapPin className="h-5 w-5 absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    required
                    placeholder="City, State (e.g., Mumbai, Maharashtra)"
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Minimum Salary (₹) *
                </label>
                <div className="relative">
                  <DollarSign className="h-5 w-5 absolute left-3 top-3 text-gray-400" />
                  <input
                    type="number"
                    required
                    placeholder="15000"
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Maximum Salary (₹) *
                </label>
                <div className="relative">
                  <DollarSign className="h-5 w-5 absolute left-3 top-3 text-gray-400" />
                  <input
                    type="number"
                    required
                    placeholder="25000"
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Salary Period
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="monthly">Per Month</option>
                  <option value="daily">Per Day</option>
                  <option value="hourly">Per Hour</option>
                  <option value="project">Per Project</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Experience Required
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                  {experienceLevels.map((level) => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Job Details */}
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Job Details</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Job Description *
                </label>
                <textarea
                  required
                  rows={6}
                  placeholder="Describe the job role, responsibilities, and what you're looking for in a candidate..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Requirements & Skills
                </label>
                <textarea
                  rows={4}
                  placeholder="List the skills, qualifications, and requirements for this position..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Benefits & Perks
                </label>
                <textarea
                  rows={3}
                  placeholder="What benefits do you offer? (e.g., training, equipment, bonuses, etc.)"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Working Hours
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., 8:00 AM - 6:00 PM, Monday to Saturday"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Number of Positions
                  </label>
                  <div className="relative">
                    <Users className="h-5 w-5 absolute left-3 top-3 text-gray-400" />
                    <input
                      type="number"
                      placeholder="1"
                      min="1"
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Application Deadline
                </label>
                <input
                  type="date"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Contact Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contact Person *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Full name of contact person"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="contact@company.com"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company Website
                </label>
                <input
                  type="url"
                  placeholder="https://www.company.com"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Additional Options */}
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Additional Options</h2>
            
            <div className="space-y-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">
                  Mark this job as urgent (₹100 extra for priority listing)
                </span>
              </label>

              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">
                  Receive applications via email notifications
                </span>
              </label>

              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">
                  Allow applications via WhatsApp
                </span>
              </label>
            </div>
          </div>

          {/* Submit */}
          <div className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                type="submit"
                className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 font-semibold"
              >
                Post Job - ₹299
              </button>
              <button
                type="button"
                className="flex-1 border border-gray-300 text-gray-700 py-3 px-6 rounded-md hover:bg-gray-50"
              >
                Save as Draft
              </button>
            </div>
            
            <p className="text-sm text-gray-600 mt-4 text-center">
              By posting this job, you agree to our Terms of Service and Privacy Policy.
              Your job will be reviewed and published within 24 hours.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
