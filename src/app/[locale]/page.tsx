
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { Search, MapPin, Users, Briefcase, Star, ChevronRight, Phone, Mail, Clock, Shield } from 'lucide-react';

interface HomePageProps {
  params: { locale: string };
}

export default async function HomePage({ params: { locale } }: HomePageProps) {
  const t = await getTranslations();

  // Sample job categories (in a real app, fetch from database)
  const jobCategories = [
    { id: 1, name: 'Construction Worker', count: 245, icon: '🏗️' },
    { id: 2, name: 'House Cleaning', count: 189, icon: '🏠' },
    { id: 3, name: 'Delivery Driver', count: 167, icon: '🚚' },
    { id: 4, name: 'Cook/Chef', count: 134, icon: '👨‍🍳' },
    { id: 5, name: 'Electrician', count: 98, icon: '⚡' },
    { id: 6, name: 'Plumber', count: 87, icon: '🔧' },
  ];

  // Sample recent jobs (in a real app, fetch from database)
  const recentJobs = [
    {
      id: 1,
      title: 'Construction Helper Needed',
      company: 'Mumbai Builders',
      location: 'Mumbai, Maharashtra',
      salary: '₹15,000 - ₹25,000',
      type: 'Full-time',
      posted: '2 hours ago'
    },
    {
      id: 2,
      title: 'House Cleaning Service',
      company: 'Clean Home Services',
      location: 'Pune, Maharashtra',
      salary: '₹12,000 - ₹18,000',
      type: 'Part-time',
      posted: '4 hours ago'
    },
    {
      id: 3,
      title: 'Delivery Driver - Food',
      company: 'Quick Delivery',
      location: 'Delhi, NCR',
      salary: '₹18,000 - ₹30,000',
      type: 'Full-time',
      posted: '1 day ago'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-blue-600">KaramSaathi</h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href={`/${locale}/jobs`} className="text-gray-700 hover:text-blue-600">Find Jobs</Link>
              <Link href={`/${locale}/post-job`} className="text-gray-700 hover:text-blue-600">Post Job</Link>
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

      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Find Work. Find Workers.
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100">
            India's trusted platform connecting skilled and unskilled workers with employers
          </p>
          
          {/* Search Bar */}
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-2 flex flex-col md:flex-row gap-2">
            <div className="flex-1 flex items-center px-4 py-3">
              <Search className="h-5 w-5 text-gray-400 mr-3" />
              <input
                type="text"
                placeholder="Search for jobs, skills, or services..."
                className="w-full text-gray-900 bg-transparent border-none outline-none"
              />
            </div>
            <div className="flex-1 flex items-center px-4 py-3 border-l border-gray-200">
              <MapPin className="h-5 w-5 text-gray-400 mr-3" />
              <input
                type="text"
                placeholder="Location (City, State)"
                className="w-full text-gray-900 bg-transparent border-none outline-none"
              />
            </div>
            <button className="bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 font-semibold">
              Search Jobs
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">10,000+</div>
              <div className="text-gray-600">Active Jobs</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">5,000+</div>
              <div className="text-gray-600">Registered Workers</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">2,000+</div>
              <div className="text-gray-600">Employers</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-600 mb-2">50+</div>
              <div className="text-gray-600">Job Categories</div>
            </div>
          </div>
        </div>
      </section>

      {/* Job Categories */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Popular Job Categories</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore thousands of opportunities across various skill levels and industries
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobCategories.map((category) => (
              <Link
                key={category.id}
                href={`/${locale}/jobs?category=${category.id}`}
                className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200 group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="text-4xl">{category.icon}</div>
                  <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{category.name}</h3>
                <p className="text-gray-600">{category.count} jobs available</p>
              </Link>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href={`/${locale}/categories`} className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold">
              View All Categories
              <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* Recent Jobs */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Latest Job Opportunities</h2>
            <p className="text-gray-600">Fresh opportunities posted by employers</p>
          </div>

          <div className="space-y-4">
            {recentJobs.map((job) => (
              <div key={job.id} className="bg-gray-50 p-6 rounded-lg border border-gray-200 hover:border-blue-200 transition-colors">
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{job.title}</h3>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-2">
                      <span className="flex items-center">
                        <Briefcase className="h-4 w-4 mr-1" />
                        {job.company}
                      </span>
                      <span className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {job.location}
                      </span>
                      <span className="text-green-600 font-semibold">{job.salary}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">{job.type}</span>
                      <span className="text-gray-500 text-sm">{job.posted}</span>
                    </div>
                  </div>
                  <div className="mt-4 md:mt-0">
                    <Link href={`/${locale}/jobs/${job.id}`} className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 inline-block">
                      Apply Now
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href={`/${locale}/jobs`} className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold">
              View All Jobs
              <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How KaramSaathi Works</h2>
            <p className="text-gray-600">Simple steps to connect workers and employers</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Create Profile</h3>
              <p className="text-gray-600">
                Workers create profiles showcasing skills and experience. Employers post job requirements.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Find Matches</h3>
              <p className="text-gray-600">
                Our platform matches workers with suitable jobs based on skills, location, and preferences.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Start Working</h3>
              <p className="text-gray-600">
                Connect directly, negotiate terms, and start working. Build your reputation through reviews.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">KaramSaathi</h3>
              <p className="text-gray-400">
                Connecting India's workforce with opportunities. Building a better future through meaningful work.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">For Workers</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href={`/${locale}/jobs`} className="hover:text-white">Find Jobs</Link></li>
                <li><Link href={`/${locale}/profile`} className="hover:text-white">Create Profile</Link></li>
                <li><Link href={`/${locale}/help`} className="hover:text-white">Help Center</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">For Employers</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href={`/${locale}/post-job`} className="hover:text-white">Post Jobs</Link></li>
                <li><Link href={`/${locale}/find-workers`} className="hover:text-white">Find Workers</Link></li>
                <li><Link href={`/${locale}/employer-help`} className="hover:text-white">Employer Help</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Languages</h4>
              <div className="flex flex-wrap gap-2">
                <Link href="/en" className="bg-gray-800 px-3 py-1 rounded text-sm hover:bg-gray-700">English</Link>
                <Link href="/hi" className="bg-gray-800 px-3 py-1 rounded text-sm hover:bg-gray-700">हिंदी</Link>
                <Link href="/mr" className="bg-gray-800 px-3 py-1 rounded text-sm hover:bg-gray-700">मराठी</Link>
                <Link href="/ta" className="bg-gray-800 px-3 py-1 rounded text-sm hover:bg-gray-700">தமிழ்</Link>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 KaramSaathi. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
