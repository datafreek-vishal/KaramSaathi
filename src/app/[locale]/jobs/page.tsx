import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { Search, MapPin, Filter, ChevronLeft, Briefcase, Clock, DollarSign } from 'lucide-react';

interface JobsPageProps {
  params: { locale: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function JobsPage({ params: { locale }, searchParams }: JobsPageProps) {
  const t = await getTranslations();

  // Sample jobs data (in real app, fetch from database with filters)
  const jobs = [
    {
      id: 1,
      title: 'Construction Helper',
      company: 'Mumbai Builders',
      location: 'Mumbai, Maharashtra',
      salary: '₹15,000 - ₹25,000',
      type: 'Full-time',
      category: 'Construction',
      description: 'Looking for hardworking construction helpers for ongoing building projects.',
      requirements: ['Physical fitness', 'Basic construction knowledge', 'Teamwork skills'],
      posted: '2 hours ago',
      urgent: true
    },
    {
      id: 2,
      title: 'House Cleaning Service',
      company: 'Clean Home Services',
      location: 'Pune, Maharashtra',
      salary: '₹12,000 - ₹18,000',
      type: 'Part-time',
      category: 'Cleaning',
      description: 'Experienced house cleaners needed for residential cleaning services.',
      requirements: ['Attention to detail', 'Reliable', 'Own transportation preferred'],
      posted: '4 hours ago',
      urgent: false
    },
    {
      id: 3,
      title: 'Delivery Driver - Food',
      company: 'Quick Delivery',
      location: 'Delhi, NCR',
      salary: '₹18,000 - ₹30,000',
      type: 'Full-time',
      category: 'Delivery',
      description: 'Food delivery drivers needed with own vehicle (bike/scooter).',
      requirements: ['Valid driving license', 'Own vehicle', 'Good navigation skills'],
      posted: '1 day ago',
      urgent: false
    },
    {
      id: 4,
      title: 'Cook for Restaurant',
      company: 'Tasty Bites Restaurant',
      location: 'Bangalore, Karnataka',
      salary: '₹20,000 - ₹35,000',
      type: 'Full-time',
      category: 'Cooking',
      description: 'Experienced cook required for busy restaurant kitchen.',
      requirements: ['2+ years cooking experience', 'Knowledge of Indian cuisine', 'Food safety certification'],
      posted: '2 days ago',
      urgent: true
    },
    {
      id: 5,
      title: 'Electrician - Residential',
      company: 'Power Solutions',
      location: 'Chennai, Tamil Nadu',
      salary: '₹25,000 - ₹40,000',
      type: 'Full-time',
      category: 'Electrical',
      description: 'Licensed electrician for residential electrical work and repairs.',
      requirements: ['Electrical certification', '3+ years experience', 'Problem-solving skills'],
      posted: '3 days ago',
      urgent: false
    }
  ];

  const categories = ['All', 'Construction', 'Cleaning', 'Delivery', 'Cooking', 'Electrical', 'Plumbing'];

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
              <Link href={`/${locale}/jobs`} className="text-blue-600 font-semibold">Find Jobs</Link>
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center mb-6">
          <Link href={`/${locale}`} className="text-gray-500 hover:text-gray-700 flex items-center">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Home
          </Link>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-gray-900">Jobs</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Filter className="h-5 w-5 mr-2" />
                Filters
              </h3>
              
              {/* Search */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
                <div className="relative">
                  <Search className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Job title, company..."
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Location */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <div className="relative">
                  <MapPin className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    placeholder="City, State"
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Categories */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <label key={category} className="flex items-center">
                      <input
                        type="radio"
                        name="category"
                        value={category}
                        defaultChecked={category === 'All'}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <span className="ml-2 text-sm text-gray-600">{category}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Job Type */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Job Type</label>
                <div className="space-y-2">
                  {['Full-time', 'Part-time', 'Contract', 'Temporary'].map((type) => (
                    <label key={type} className="flex items-center">
                      <input
                        type="checkbox"
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-600">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Salary Range */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Salary Range</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Any</option>
                  <option>Below ₹15,000</option>
                  <option>₹15,000 - ₹25,000</option>
                  <option>₹25,000 - ₹40,000</option>
                  <option>Above ₹40,000</option>
                </select>
              </div>

              <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">
                Apply Filters
              </button>
            </div>
          </div>

          {/* Jobs List */}
          <div className="lg:col-span-3">
            <div className="bg-white p-6 rounded-lg shadow-sm border mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">
                  {jobs.length} Jobs Found
                </h2>
                <select className="mt-2 sm:mt-0 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Sort by: Newest</option>
                  <option>Sort by: Salary (High to Low)</option>
                  <option>Sort by: Salary (Low to High)</option>
                  <option>Sort by: Location</option>
                </select>
              </div>
            </div>

            <div className="space-y-4">
              {jobs.map((job) => (
                <div key={job.id} className="bg-white p-6 rounded-lg shadow-sm border hover:border-blue-200 transition-colors">
                  <div className="flex flex-col md:flex-row md:items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-xl font-semibold text-gray-900">{job.title}</h3>
                        {job.urgent && (
                          <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs font-medium">
                            Urgent
                          </span>
                        )}
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-3">
                        <span className="flex items-center">
                          <Briefcase className="h-4 w-4 mr-1" />
                          {job.company}
                        </span>
                        <span className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {job.location}
                        </span>
                        <span className="flex items-center text-green-600 font-semibold">
                          <DollarSign className="h-4 w-4 mr-1" />
                          {job.salary}
                        </span>
                        <span className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {job.posted}
                        </span>
                      </div>

                      <p className="text-gray-700 mb-3">{job.description}</p>

                      <div className="flex flex-wrap gap-2 mb-3">
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">{job.type}</span>
                        <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs">{job.category}</span>
                      </div>

                      <div className="text-sm text-gray-600">
                        <span className="font-medium">Requirements: </span>
                        {job.requirements.join(', ')}
                      </div>
                    </div>

                    <div className="mt-4 md:mt-0 md:ml-6 flex flex-col gap-2">
                      <Link 
                        href={`/${locale}/jobs/${job.id}`}
                        className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 text-center"
                      >
                        Apply Now
                      </Link>
                      <button className="border border-gray-300 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-50">
                        Save Job
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-8 flex justify-center">
              <div className="flex items-center space-x-2">
                <button className="px-3 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
                  Previous
                </button>
                <button className="px-3 py-2 bg-blue-600 text-white rounded-md">1</button>
                <button className="px-3 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">2</button>
                <button className="px-3 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">3</button>
                <button className="px-3 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
