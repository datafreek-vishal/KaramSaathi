import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { ArrowLeft, User, MapPin, Phone, Mail, Star, Calendar, Briefcase, ExternalLink } from 'lucide-react';

interface ProfilePageProps {
  params: { locale: string };
}

export default async function ProfilePage({ params: { locale } }: ProfilePageProps) {
  const t = await getTranslations();

  // Mock user data - in real app, this would come from auth context
  const user = {
    id: '1',
    name: 'Raj Kumar',
    phone: '+91 98765 43210',
    email: 'raj.kumar@example.com',
    location: 'Mumbai, Maharashtra',
    type: 'worker',
    profilePicture: null,
    rating: 4.8,
    reviewCount: 24,
    jobsCompleted: 156,
    memberSince: 'March 2023',
    verified: true,
    skills: ['Plumbing', 'Electrical Work', 'General Maintenance'],
    bio: 'Experienced maintenance worker with 8+ years in residential and commercial repairs. Specialized in plumbing and electrical work. Always punctual and professional.',
    languages: ['Hindi', 'English', 'Marathi'],
    availability: 'Available',
    hourlyRate: '₹500-800',
    workRadius: '15 km'
  };

  // Mock recent jobs
  const recentJobs = [
    {
      id: '1',
      title: 'Kitchen Plumbing Repair',
      employer: 'Priya Sharma',
      completedDate: '2024-01-15',
      rating: 5,
      earnings: '₹1,200',
      location: 'Andheri West'
    },
    {
      id: '2',
      title: 'Office Electrical Installation',
      employer: 'Tech Solutions Pvt Ltd',
      completedDate: '2024-01-10',
      rating: 5,
      earnings: '₹3,500',
      location: 'BKC'
    },
    {
      id: '3',
      title: 'Home AC Maintenance',
      employer: 'Amit Patel',
      completedDate: '2024-01-08',
      rating: 4,
      earnings: '₹800',
      location: 'Malad East'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href={`/${locale}`} className="flex items-center text-gray-600 hover:text-gray-900">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Jobs
            </Link>
            <h1 className="text-lg font-semibold text-gray-900">My Profile</h1>
            <Link href={`/${locale}/profile/edit`} className="text-blue-600 hover:text-blue-700 font-medium">
              Edit Profile
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Profile Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Header */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-start space-x-4">
                <div className="h-20 w-20 rounded-full bg-blue-100 flex items-center justify-center">
                  <User className="h-10 w-10 text-blue-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
                    {user.verified && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Verified
                      </span>
                    )}
                  </div>
                  <div className="flex items-center mt-1 text-gray-600">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{user.location}</span>
                  </div>
                  <div className="flex items-center mt-2 space-x-4">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                      <span className="font-medium">{user.rating}</span>
                      <span className="text-gray-500 ml-1">({user.reviewCount} reviews)</span>
                    </div>
                    <span className="text-gray-300">•</span>
                    <span className="text-gray-600">{user.jobsCompleted} jobs completed</span>
                  </div>
                  <div className="mt-3">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      user.availability === 'Available' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {user.availability}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* About Section */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">About</h2>
              <p className="text-gray-600 leading-relaxed">{user.bio}</p>
              
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-2">Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {user.skills.map((skill, index) => (
                      <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-2">Languages</h3>
                  <div className="flex flex-wrap gap-2">
                    {user.languages.map((language, index) => (
                      <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {language}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Work History */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Work</h2>
              <div className="space-y-4">
                {recentJobs.map((job) => (
                  <div key={job.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{job.title}</h3>
                        <p className="text-sm text-gray-600 mt-1">Client: {job.employer}</p>
                        <p className="text-sm text-gray-500 mt-1">{job.location}</p>
                        <div className="flex items-center mt-2 space-x-4">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 text-gray-400 mr-1" />
                            <span className="text-sm text-gray-600">{job.completedDate}</span>
                          </div>
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                            <span className="text-sm font-medium">{job.rating}/5</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-green-600">{job.earnings}</p>
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 mt-1">
                          Completed
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Link href={`/${locale}/profile/work-history`} className="inline-flex items-center mt-4 text-blue-600 hover:text-blue-700">
                View all work history
                <ExternalLink className="h-4 w-4 ml-1" />
              </Link>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Information */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h2>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Phone className="h-4 w-4 text-gray-400 mr-3" />
                  <span className="text-sm text-gray-600">{user.phone}</span>
                </div>
                {user.email && (
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 text-gray-400 mr-3" />
                    <span className="text-sm text-gray-600">{user.email}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h2>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Member since</span>
                  <span className="text-sm font-medium text-gray-900">{user.memberSince}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Response rate</span>
                  <span className="text-sm font-medium text-gray-900">98%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Avg. response time</span>
                  <span className="text-sm font-medium text-gray-900">2 hours</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Hourly rate</span>
                  <span className="text-sm font-medium text-gray-900">{user.hourlyRate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Work radius</span>
                  <span className="text-sm font-medium text-gray-900">{user.workRadius}</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <Link href={`/${locale}/profile/edit`} className="block w-full text-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                  Edit Profile
                </Link>
                <Link href={`/${locale}/jobs`} className="block w-full text-center px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700">
                  Browse Jobs
                </Link>
                <Link href={`/${locale}/profile/settings`} className="block w-full text-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                  Account Settings
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
