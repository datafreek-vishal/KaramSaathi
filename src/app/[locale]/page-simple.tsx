import { getTranslations } from 'next-intl/server';

interface HomePageProps {
  params: { locale: string };
}

export default async function HomePage({ params: { locale } }: HomePageProps) {
  const t = await getTranslations();

  return (
    <div className="min-h-screen bg-background p-4">
      <header className="bg-primary text-primary-foreground p-4 rounded-lg mb-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">KaramSaathi</h1>
          <p className="text-primary-foreground/80">
            Welcome to your job portal platform
          </p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto space-y-8">
        <section className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Platform Ready</h2>
          <p className="text-muted-foreground mb-6">
            Your job portal is now running successfully!
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-card rounded-lg border">
              <h3 className="font-semibold mb-2">For Workers</h3>
              <p className="text-sm text-muted-foreground">
                Find jobs in your area and apply instantly
              </p>
            </div>
            <div className="p-4 bg-card rounded-lg border">
              <h3 className="font-semibold mb-2">For Employers</h3>
              <p className="text-sm text-muted-foreground">
                Post jobs and find qualified candidates
              </p>
            </div>
            <div className="p-4 bg-card rounded-lg border">
              <h3 className="font-semibold mb-2">Multi-language</h3>
              <p className="text-sm text-muted-foreground">
                Available in English, Hindi, Marathi, and Tamil
              </p>
            </div>
          </div>
        </section>

        <section className="bg-secondary rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Next Steps</h3>
          <ul className="space-y-2 text-sm">
            <li>✅ Database setup complete with 50+ job categories</li>
            <li>✅ Authentication system ready (NextAuth.js)</li>
            <li>✅ Responsive design for all devices</li>
            <li>✅ Multi-language support configured</li>
            <li>⏳ Ready for feature testing and development</li>
          </ul>
        </section>
      </main>
    </div>
  );
}
