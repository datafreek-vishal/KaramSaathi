import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { ArrowLeft, Search, Filter, MapPin, Clock, Star, Users, TrendingUp } from 'lucide-react';

interface WorkersPageProps {
  params: { locale: string };
}

export default async function WorkersPage({ params: { locale } }: WorkersPageProps) {
  const t = await getTranslations();

  // Mock workers data
  const workers = [
    {
      id: '1',
      name: 'Raj Kumar',
      profession: 'Plumber',
      location: 'Mumbai, Maharashtra',
      rating: 4.9,
      reviewCount: 124,
      hourlyRate: '₹500-800',
      avatar: null,
      verified: true,
      responseTime: '1 hour',
      availability: 'Available',
      skills: ['Plumbing', 'Pipe Fitting', 'Leak Repair'],
      jobsCompleted: 89,
      description: 'Expert plumber with 10+ years experience in residential and commercial work.'
    },
    {
      id: '2',
      name: 'Priya Sharma',
      profession: 'House Cleaner',
      location: 'Delhi, NCR',
      rating: 4.8,
      reviewCount: 98,
      hourlyRate: '₹300-500',
      avatar: null,
      verified: true,
      responseTime: '30 mins',
      availability: 'Available',
      skills: ['Deep Cleaning', 'Home Organization', 'Sanitization'],
      jobsCompleted: 156,
      description: 'Professional house cleaner specializing in deep cleaning and organization.'
    },
    {
      id: '3',
      name: 'Mohammed Ali',
      profession: 'Electrician',
      location: 'Bangalore, Karnataka',
      rating: 4.7,
      reviewCount: 76,
      hourlyRate: '₹600-900',
      avatar: null,
      verified: true,
      responseTime: '2 hours',
      availability: 'Busy',
      skills: ['Electrical Wiring', 'AC Installation', 'Home Automation'],
      jobsCompleted: 67,
      description: 'Licensed electrician with expertise in modern electrical systems and automation.'
    },
    {
      id: '4',
      name: 'Sunita Devi',
      profession: 'Cook',
      location: 'Pune, Maharashtra',
      rating: 4.9,
      reviewCount: 143,
      hourlyRate: '₹400-600',
      avatar: null,
      verified: true,
      responseTime: '1 hour',
      availability: 'Available',
      skills: ['Indian Cuisine', 'Healthy Cooking', 'Party Catering'],
      jobsCompleted: 234,
      description: 'Experienced cook specializing in authentic Indian cuisine and healthy meals.'
    },
    {
      id: '5',
      name: 'Vikram Singh',
      profession: 'Driver',
      location: 'Jaipur, Rajasthan',
      rating: 4.6,
      reviewCount: 89,
      hourlyRate: '₹250-400',
      avatar: null,
      verified: false,
      responseTime: '45 mins',
      availability: 'Available',
      skills: ['Safe Driving', 'Local Knowledge', 'Long Distance'],
      jobsCompleted: 445,
      description: 'Professional driver with clean record and extensive local area knowledge.'
    },
    {
      id: '6',
      name: 'Lakshmi Nair',
      profession: 'Tutor',
      location: 'Chennai, Tamil Nadu',
      rating: 4.8,
      reviewCount: 67,
      hourlyRate: '₹500-800',
      avatar: null,
      verified: true,
      responseTime: '3 hours',
      availability: 'Available',
      skills: ['Mathematics', 'Science', 'English'],
      jobsCompleted: 123,
      description: 'Qualified tutor with B.Ed degree and 8 years teaching experience.'
    }
  ];

  const categories = [
    { name: 'All Categories', count: 156, active: true },
    { name: 'Home Services', count: 45, active: false },
    { name: 'Construction', count: 23, active: false },
    { name: 'Transportation', count: 18, active: false },
    { name: 'Education', count: 12, active: false },
    { name: 'Healthcare', count: 8, active: false }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href={`/${locale}`} className="flex items-center text-gray-600 hover:text-gray-900">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Home
            </Link>
            <h1 className="text-lg font-semibold text-gray-900">Find Workers</h1>
            <div className="w-16"></div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by skills, profession, or name..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            
            {/* Location Filter */}
            <div className="lg:w-64">
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <select className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white">
                  <option>All Locations</option>
                  <option>Mumbai</option>
                  <option>Delhi</option>
                  <option>Bangalore</option>
                  <option>Pune</option>
                  <option>Chennai</option>
                </select>
              </div>
            </div>

            {/* Filters Button */}
            <button className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Filter className="h-5 w-5 mr-2" />
              Filters
            </button>
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap gap-2 mt-4">
            {categories.map((category) => (
              <button
                key={category.name}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  category.active
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-80">
            <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Availability</h3>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" defaultChecked />
                    <span className="ml-2 text-sm text-gray-700">Available now</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                    <span className="ml-2 text-sm text-gray-700">Available this week</span>
                  </label>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Rating</h3>
                <div className="space-y-2">
                  {[5, 4, 3].map((rating) => (
                    <label key={rating} className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                      <div className="ml-2 flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="ml-1 text-sm text-gray-700">{rating}+ stars</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Hourly Rate</h3>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                    <span className="ml-2 text-sm text-gray-700">Under ₹300</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                    <span className="ml-2 text-sm text-gray-700">₹300 - ₹500</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                    <span className="ml-2 text-sm text-gray-700">₹500 - ₹800</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                    <span className="ml-2 text-sm text-gray-700">₹800+</span>
                  </label>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Verification</h3>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                    <span className="ml-2 text-sm text-gray-700">Verified workers only</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Workers Grid */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">
                {workers.length} workers found
              </h2>
              <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm">
                <option>Best Match</option>
                <option>Highest Rated</option>
                <option>Lowest Price</option>
                <option>Most Reviews</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {workers.map((worker) => (
                <div key={worker.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start space-x-4">
                    <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                      <span className="text-lg font-semibold text-blue-600">
                        {worker.name.charAt(0)}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <h3 className="text-lg font-semibold text-gray-900">{worker.name}</h3>
                        {worker.verified && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Verified
                          </span>
                        )}
                      </div>
                      <p className="text-blue-600 font-medium">{worker.profession}</p>
                      <div className="flex items-center mt-1 text-gray-600">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span className="text-sm">{worker.location}</span>
                      </div>
                      
                      <div className="flex items-center mt-2 space-x-4">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                          <span className="font-medium">{worker.rating}</span>
                          <span className="text-gray-500 ml-1 text-sm">({worker.reviewCount})</span>
                        </div>
                        <span className="text-gray-300">•</span>
                        <span className="text-sm text-gray-600">{worker.jobsCompleted} jobs</span>
                      </div>

                      <p className="text-sm text-gray-600 mt-2 line-clamp-2">{worker.description}</p>

                      <div className="flex flex-wrap gap-1 mt-3">
                        {worker.skills.slice(0, 3).map((skill, index) => (
                          <span key={index} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                            {skill}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        <div>
                          <span className="text-lg font-bold text-gray-900">{worker.hourlyRate}</span>
                          <span className="text-sm text-gray-500 ml-1">/hour</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="flex items-center text-sm text-gray-600">
                            <Clock className="h-4 w-4 mr-1" />
                            <span>{worker.responseTime}</span>
                          </div>
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                            worker.availability === 'Available' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {worker.availability}
                          </span>
                        </div>
                      </div>

                      <div className="flex space-x-2 mt-4">
                        <Link 
                          href={`/${locale}/workers/${worker.id}`}
                          className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 text-center"
                        >
                          View Profile
                        </Link>
                        <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
                          Contact
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center mt-8">
              <nav className="flex items-center space-x-2">
                <button className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
                  Previous
                </button>
                <button className="px-3 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium">1</button>
                <button className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">2</button>
                <button className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">3</button>
                <button className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
                  Next
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
