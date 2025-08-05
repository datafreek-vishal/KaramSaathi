import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { ArrowLeft, Star, MapPin, Clock, Phone, Mail, Calendar, Briefcase, Shield, Award, MessageCircle } from 'lucide-react';

interface WorkerDetailPageProps {
  params: { locale: string; id: string };
}

export default async function WorkerDetailPage({ params: { locale, id } }: WorkerDetailPageProps) {
  const t = await getTranslations();

  // Mock worker data - in real app, this would be fetched based on ID
  const worker = {
    id,
    name: 'Raj Kumar',
    profession: 'Professional Plumber',
    location: 'Mumbai, Maharashtra',
    rating: 4.9,
    reviewCount: 124,
    hourlyRate: '₹500-800',
    avatar: null,
    verified: true,
    responseTime: '1 hour',
    availability: 'Available',
    skills: ['Plumbing', 'Pipe Fitting', 'Leak Repair', 'Bathroom Installation', 'Kitchen Plumbing', 'Emergency Repairs'],
    jobsCompleted: 189,
    memberSince: 'January 2022',
    languages: ['Hindi', 'English', 'Marathi'],
    workRadius: '25 km',
    phone: '+91 98765 43210',
    email: 'raj.kumar.plumber@gmail.com',
    bio: 'Professional plumber with over 10 years of experience in residential and commercial plumbing. Specialized in modern pipe systems, bathroom renovations, and emergency repairs. I take pride in quality work and customer satisfaction. Available 24/7 for emergency services.',
    services: [
      'Pipe Installation & Repair',
      'Bathroom & Kitchen Plumbing',
      'Water Heater Installation',
      'Leak Detection & Repair',
      'Drain Cleaning',
      'Emergency Plumbing Services'
    ],
    certifications: [
      'Licensed Plumber - Maharashtra',
      'Safety Training Certificate',
      'Pipe Installation Specialist'
    ]
  };

  // Mock reviews
  const reviews = [
    {
      id: '1',
      clientName: 'Priya Sharma',
      rating: 5,
      date: '2024-01-15',
      comment: 'Excellent work! Raj fixed our kitchen sink leak quickly and professionally. Very punctual and cleaned up after the work. Highly recommended!',
      jobType: 'Kitchen Plumbing Repair'
    },
    {
      id: '2',
      clientName: 'Amit Patel',
      rating: 5,
      date: '2024-01-10',
      comment: 'Outstanding service. Raj installed our new bathroom fittings with great attention to detail. Fair pricing and quality work.',
      jobType: 'Bathroom Installation'
    },
    {
      id: '3',
      clientName: 'Sunita Devi',
      rating: 4,
      date: '2024-01-08',
      comment: 'Good plumber, arrived on time and fixed the issue quickly. Very professional and explained the problem clearly.',
      jobType: 'Pipe Repair'
    },
    {
      id: '4',
      clientName: 'Vikash Singh',
      rating: 5,
      date: '2024-01-05',
      comment: 'Emergency call at night, Raj came immediately and fixed our burst pipe. Saved us from major damage. True professional!',
      jobType: 'Emergency Repair'
    }
  ];

  // Mock recent work photos
  const portfolioImages = [
    { id: '1', title: 'Modern Bathroom Installation', description: 'Complete bathroom renovation with modern fixtures' },
    { id: '2', title: 'Kitchen Plumbing Setup', description: 'New kitchen sink and dishwasher installation' },
    { id: '3', title: 'Pipe Installation', description: 'Underground pipe installation for new construction' },
    { id: '4', title: 'Water Heater Setup', description: 'Electric water heater installation and setup' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href={`/${locale}/workers`} className="flex items-center text-gray-600 hover:text-gray-900">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Workers
            </Link>
            <h1 className="text-lg font-semibold text-gray-900">Worker Profile</h1>
            <div className="w-16"></div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Header */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-start space-x-6">
                <div className="h-24 w-24 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl font-bold text-blue-600">
                    {worker.name.charAt(0)}
                  </span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h1 className="text-2xl font-bold text-gray-900">{worker.name}</h1>
                    {worker.verified && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        <Shield className="h-3 w-3 mr-1" />
                        Verified
                      </span>
                    )}
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      worker.availability === 'Available' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {worker.availability}
                    </span>
                  </div>
                  
                  <p className="text-lg text-blue-600 font-medium mb-2">{worker.profession}</p>
                  
                  <div className="flex items-center text-gray-600 mb-3">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{worker.location}</span>
                  </div>

                  <div className="flex items-center space-x-6 mb-4">
                    <div className="flex items-center">
                      <Star className="h-5 w-5 text-yellow-400 fill-current mr-1" />
                      <span className="font-bold text-lg">{worker.rating}</span>
                      <span className="text-gray-500 ml-1">({worker.reviewCount} reviews)</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Briefcase className="h-4 w-4 mr-1" />
                      <span>{worker.jobsCompleted} jobs completed</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>Responds in {worker.responseTime}</span>
                    </div>
                  </div>

                  <div className="text-2xl font-bold text-gray-900">
                    {worker.hourlyRate} <span className="text-base font-normal text-gray-500">/hour</span>
                  </div>
                </div>
              </div>
            </div>

            {/* About Section */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">About</h2>
              <p className="text-gray-600 leading-relaxed mb-6">{worker.bio}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Skills & Expertise</h3>
                  <div className="flex flex-wrap gap-2">
                    {worker.skills.map((skill, index) => (
                      <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Languages</h3>
                  <div className="flex flex-wrap gap-2">
                    {worker.languages.map((language, index) => (
                      <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                        {language}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Services Offered */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Services Offered</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {worker.services.map((service, index) => (
                  <div key={index} className="flex items-center p-3 border border-gray-200 rounded-lg">
                    <div className="h-2 w-2 bg-blue-600 rounded-full mr-3"></div>
                    <span className="text-gray-700">{service}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Portfolio/Work Photos */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Work</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {portfolioImages.map((image) => (
                  <div key={image.id} className="bg-gray-100 rounded-lg p-4 border border-gray-200">
                    <div className="h-32 bg-gray-200 rounded-lg mb-3 flex items-center justify-center">
                      <span className="text-gray-500">Work Photo</span>
                    </div>
                    <h4 className="font-medium text-gray-900">{image.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">{image.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews Section */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Reviews ({worker.reviewCount})
              </h2>
              <div className="space-y-6">
                {reviews.map((review) => (
                  <div key={review.id} className="border-b border-gray-200 pb-6 last:border-b-0 last:pb-0">
                    <div className="flex items-start space-x-4">
                      <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-medium text-gray-600">
                          {review.clientName.charAt(0)}
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="font-medium text-gray-900">{review.clientName}</h4>
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-500">{review.date}</span>
                        </div>
                        <p className="text-sm text-blue-600 mb-2">{review.jobType}</p>
                        <p className="text-gray-600">{review.comment}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button className="mt-4 text-blue-600 hover:text-blue-700 font-medium">
                View all reviews
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Card */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Contact {worker.name}</h3>
              
              <div className="space-y-3 mb-6">
                <button className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-blue-700 flex items-center justify-center">
                  <MessageCircle className="h-5 w-5 mr-2" />
                  Send Message
                </button>
                <button className="w-full border border-blue-600 text-blue-600 px-4 py-3 rounded-lg font-medium hover:bg-blue-50 flex items-center justify-center">
                  <Phone className="h-5 w-5 mr-2" />
                  Call Now
                </button>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex items-center">
                  <Phone className="h-4 w-4 text-gray-400 mr-3" />
                  <span className="text-gray-600">{worker.phone}</span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-4 w-4 text-gray-400 mr-3" />
                  <span className="text-gray-600">{worker.email}</span>
                </div>
              </div>
            </div>

            {/* Quick Info */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Quick Info</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Member since</span>
                  <span className="font-medium">{worker.memberSince}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Response time</span>
                  <span className="font-medium">{worker.responseTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Work radius</span>
                  <span className="font-medium">{worker.workRadius}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Repeat clients</span>
                  <span className="font-medium">85%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">On-time rate</span>
                  <span className="font-medium">98%</span>
                </div>
              </div>
            </div>

            {/* Certifications */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Certifications</h3>
              <div className="space-y-3">
                {worker.certifications.map((cert, index) => (
                  <div key={index} className="flex items-center">
                    <Award className="h-4 w-4 text-green-600 mr-2 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{cert}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Safety Badge */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <Shield className="h-5 w-5 text-green-600 mr-2" />
                <span className="font-medium text-green-800">Safety Verified</span>
              </div>
              <p className="text-sm text-green-700">
                Identity verified, background checked, and insured for your peace of mind.
              </p>
            </div>

            {/* Similar Workers */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Similar Workers</h3>
              <div className="space-y-3">
                {['Suresh Patel', 'Mohan Kumar', 'Ravi Sharma'].map((name, index) => (
                  <Link key={index} href={`/${locale}/workers/${index + 2}`} className="block p-3 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors">
                    <div className="flex items-center space-x-3">
                      <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
                        <span className="text-xs font-medium text-gray-600">{name.charAt(0)}</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{name}</p>
                        <p className="text-xs text-gray-500">Plumber • ₹450-700/hr</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
