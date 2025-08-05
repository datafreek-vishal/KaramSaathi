import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'KaramSaathi - India\'s Job Portal',
  description: 'Connect with skilled and unskilled workers across India. Find jobs or hire talent easily.',
  keywords: 'jobs, workers, employment, India, skilled workers, unskilled workers',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
