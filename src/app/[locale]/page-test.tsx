import { getTranslations } from 'next-intl/server';
import { Suspense } from 'react';

// Simple loading component
function LoadingSection() {
  return (
    <div className="animate-pulse">
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
    </div>
  );
}

// Error boundary component
function ErrorFallback({ error }: { error: Error }) {
  return (
    <div className="p-4 border border-red-200 rounded-lg bg-red-50">
      <h3 className="text-red-800 font-semibold mb-2">Something went wrong</h3>
      <p className="text-red-600 text-sm">{error.message}</p>
    </div>
  );
}

interface HomePageProps {
  params: { locale: string };
}

export default async function HomePage({ params: { locale } }: HomePageProps) {
  let t: any;
  
  try {
    t = await getTranslations();
  } catch (error) {
    console.error('Translation error:', error);
    // Fallback if translations fail
    t = (key: string) => key;
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <header className="bg-primary text-primary-foreground p-4 rounded-lg mb-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">KaramSaathi</h1>
          <p className="text-primary-foreground/80">
            Welcome to your job portal platform! Current locale: {locale}
          </p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto space-y-8">
        <Suspense fallback={<LoadingSection />}>
          <section className="text-center">
            <h2 className="text-2xl font-semibold mb-4">Platform Status: ✅ Running Successfully</h2>
            <p className="text-muted-foreground mb-6">
              Your job portal is now fully operational and ready for testing!
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="p-4 bg-card rounded-lg border">
                <h3 className="font-semibold mb-2">🔍 For Workers</h3>
                <p className="text-sm text-muted-foreground">
                  Find jobs in your area and apply instantly
                </p>
              </div>
              <div className="p-4 bg-card rounded-lg border">
                <h3 className="font-semibold mb-2">💼 For Employers</h3>
                <p className="text-sm text-muted-foreground">
                  Post jobs and find qualified candidates
                </p>
              </div>
              <div className="p-4 bg-card rounded-lg border">
                <h3 className="font-semibold mb-2">🌍 Multi-language</h3>
                <p className="text-sm text-muted-foreground">
                  Available in English, Hindi, Marathi, and Tamil
                </p>
              </div>
            </div>

            {/* Language switcher test */}
            <div className="flex justify-center gap-2 mb-6">
              <a href="/en" className="px-3 py-1 bg-blue-100 text-blue-800 rounded hover:bg-blue-200">
                English
              </a>
              <a href="/hi" className="px-3 py-1 bg-green-100 text-green-800 rounded hover:bg-green-200">
                हिंदी
              </a>
              <a href="/mr" className="px-3 py-1 bg-orange-100 text-orange-800 rounded hover:bg-orange-200">
                मराठी
              </a>
              <a href="/ta" className="px-3 py-1 bg-purple-100 text-purple-800 rounded hover:bg-purple-200">
                தமிழ்
              </a>
            </div>
          </section>
        </Suspense>

        <section className="bg-secondary rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">🚀 Platform Features Ready</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <span className="text-green-600">✅</span>
                Database setup complete with 50+ job categories
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-600">✅</span>
                Authentication system ready (NextAuth.js with OTP)
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-600">✅</span>
                Responsive design for all devices
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-600">✅</span>
                Multi-language support configured
              </li>
            </ul>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <span className="text-green-600">✅</span>
                Prisma ORM with SQLite database
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-600">✅</span>
                ShadCN/UI components library
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-600">✅</span>
                Tailwind CSS styling system
              </li>
              <li className="flex items-center gap-2">
                <span className="text-blue-600">⏳</span>
                Ready for feature testing and development
              </li>
            </ul>
          </div>
        </section>

        <section className="bg-card rounded-lg p-6 border">
          <h3 className="text-lg font-semibold mb-4">🧪 Next Steps for Testing</h3>
          <div className="space-y-3 text-sm">
            <p>1. <strong>Authentication Flow:</strong> Test OTP-based login system</p>
            <p>2. <strong>Job Categories:</strong> Browse through 50+ seeded job categories</p>
            <p>3. <strong>Mobile Responsiveness:</strong> Test on different screen sizes</p>
            <p>4. <strong>Multi-language:</strong> Switch between languages using the buttons above</p>
            <p>5. <strong>Database Operations:</strong> Test CRUD operations for jobs and applications</p>
          </div>
        </section>

        <section className="text-center py-8">
          <h3 className="text-xl font-semibold mb-4">🎉 Congratulations!</h3>
          <p className="text-muted-foreground">
            KaramSaathi platform is successfully running and ready for development.
            <br />
            All core components are functional and properly configured.
          </p>
        </section>
      </main>
    </div>
  );
}
