import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { ChevronLeft, MapPin, Clock, DollarSign, Briefcase, User, CheckCircle, AlertCircle } from 'lucide-react';

interface JobDetailsPageProps {
  params: { locale: string; id: string };
}

export default async function JobDetailsPage({ params: { locale, id } }: JobDetailsPageProps) {
  const t = await getTranslations();

  // Sample job data (in real app, fetch from database by ID)
  const job = {
    id: parseInt(id),
    title: 'Construction Helper',
    company: 'Mumbai Builders',
    companyLogo: null,
    location: 'Andheri East, Mumbai, Maharashtra',
    salary: '₹15,000 - ₹25,000',
    salaryPeriod: 'per month',
    type: 'Full-time',
    category: 'Construction',
    posted: '2 hours ago',
    deadline: '2025-08-15',
    urgent: true,
    verified: true,
    description: `We are looking for dedicated construction helpers to join our team for ongoing building projects in Mumbai. This is a great opportunity for hardworking individuals to gain experience in the construction industry.

The role involves assisting skilled workers, carrying materials, cleaning work sites, and following safety protocols. We provide on-the-job training and opportunities for career advancement.`,
    responsibilities: [
      'Assist skilled workers with construction tasks',
      'Carry and organize construction materials',
      'Maintain clean and safe work environment',
      'Follow all safety protocols and guidelines',
      'Work collaboratively with team members',
      'Learn new construction techniques and skills'
    ],
    requirements: [
      'Physical fitness and ability to lift heavy materials',
      'Basic understanding of construction work (preferred)',
      'Good teamwork and communication skills',
      'Willingness to learn and follow instructions',
      'Punctuality and reliability',
      'Age: 18-45 years'
    ],
    benefits: [
      'Competitive salary with performance bonuses',
      'On-the-job training and skill development',
      'Safety equipment provided',
      'Overtime pay opportunities',
      'Career advancement opportunities',
      'Weekly payment options available'
    ],
    workingHours: '8:00 AM - 6:00 PM, Monday to Saturday',
    contactPerson: 'Rajesh Kumar',
    contactPhone: '+91 98765 43210',
    contactEmail: 'careers@mumbaibuilders.com',
    applicants: 23,
    views: 145
  };

  const relatedJobs = [
    {
      id: 2,
      title: 'House Painter',
      company: 'Color Solutions',
      location: 'Mumbai, Maharashtra',
      salary: '₹18,000 - ₹30,000',
      type: 'Full-time'
    },
    {
      id: 6,
      title: 'Plumber Assistant',
      company: 'Fix It Fast',
      location: 'Mumbai, Maharashtra',
      salary: '₹12,000 - ₹20,000',
      type: 'Part-time'
    }
  ];

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
          <Link href={`/${locale}`} className="text-gray-500 hover:text-gray-700">Home</Link>
          <span className="mx-2 text-gray-400">/</span>
          <Link href={`/${locale}/jobs`} className="text-gray-500 hover:text-gray-700 flex items-center">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Jobs
          </Link>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-gray-900">{job.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
              {/* Job Header */}
              <div className="p-6 border-b">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">{job.title}</h1>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center">
                        <Briefcase className="h-4 w-4 mr-1" />
                        {job.company}
                        {job.verified && <CheckCircle className="h-4 w-4 ml-1 text-green-500" />}
                      </span>
                      <span className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {job.location}
                      </span>
                      <span className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {job.posted}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    {job.urgent && (
                      <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium flex items-center">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        Urgent
                      </span>
                    )}
                    <div className="text-right">
                      <div className="text-2xl font-bold text-green-600">{job.salary}</div>
                      <div className="text-sm text-gray-600">{job.salaryPeriod}</div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">{job.type}</span>
                  <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">{job.category}</span>
                  <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                    {job.applicants} applicants
                  </span>
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                    {job.views} views
                  </span>
                </div>
              </div>

              {/* Job Description */}
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Job Description</h2>
                <div className="text-gray-700 whitespace-pre-line mb-6">{job.description}</div>

                <h3 className="text-lg font-semibold text-gray-900 mb-3">Responsibilities</h3>
                <ul className="list-disc list-inside text-gray-700 mb-6 space-y-1">
                  {job.responsibilities.map((responsibility, index) => (
                    <li key={index}>{responsibility}</li>
                  ))}
                </ul>

                <h3 className="text-lg font-semibold text-gray-900 mb-3">Requirements</h3>
                <ul className="list-disc list-inside text-gray-700 mb-6 space-y-1">
                  {job.requirements.map((requirement, index) => (
                    <li key={index}>{requirement}</li>
                  ))}
                </ul>

                <h3 className="text-lg font-semibold text-gray-900 mb-3">Benefits</h3>
                <ul className="list-disc list-inside text-gray-700 mb-6 space-y-1">
                  {job.benefits.map((benefit, index) => (
                    <li key={index}>{benefit}</li>
                  ))}
                </ul>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 p-4 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Working Hours</h4>
                    <p className="text-gray-700">{job.workingHours}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Application Deadline</h4>
                    <p className="text-gray-700">{new Date(job.deadline).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Company Info */}
            <div className="bg-white rounded-lg shadow-sm border mt-6 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">About {job.company}</h2>
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Briefcase className="h-8 w-8 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">{job.company}</h3>
                  <p className="text-gray-700 mb-3">
                    A leading construction company in Mumbai with over 10 years of experience in 
                    residential and commercial projects. We pride ourselves on quality work and 
                    employee development.
                  </p>
                  <div className="text-sm text-gray-600">
                    <p><strong>Contact:</strong> {job.contactPerson}</p>
                    <p><strong>Phone:</strong> {job.contactPhone}</p>
                    <p><strong>Email:</strong> {job.contactEmail}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Application Card */}
            <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Apply for this Job</h3>
              <div className="space-y-4">
                <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 font-semibold">
                  Apply Now
                </button>
                <button className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-md hover:bg-gray-50">
                  Save Job
                </button>
                <button className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-md hover:bg-gray-50">
                  Share Job
                </button>
              </div>
              
              <div className="mt-6 pt-6 border-t">
                <h4 className="font-medium text-gray-900 mb-3">Quick Stats</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Job Type:</span>
                    <span className="text-gray-900">{job.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Category:</span>
                    <span className="text-gray-900">{job.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Applicants:</span>
                    <span className="text-gray-900">{job.applicants}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Deadline:</span>
                    <span className="text-gray-900">{new Date(job.deadline).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Related Jobs */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Related Jobs</h3>
              <div className="space-y-4">
                {relatedJobs.map((relatedJob) => (
                  <Link
                    key={relatedJob.id}
                    href={`/${locale}/jobs/${relatedJob.id}`}
                    className="block p-4 border border-gray-200 rounded-lg hover:border-blue-200 transition-colors"
                  >
                    <h4 className="font-medium text-gray-900 mb-1">{relatedJob.title}</h4>
                    <p className="text-sm text-gray-600 mb-2">{relatedJob.company}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">{relatedJob.location}</span>
                      <span className="text-sm font-medium text-green-600">{relatedJob.salary}</span>
                    </div>
                  </Link>
                ))}
              </div>
              <Link
                href={`/${locale}/jobs`}
                className="block text-center text-blue-600 hover:text-blue-700 font-medium mt-4"
              >
                View All Jobs
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
