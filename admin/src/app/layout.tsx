import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'VANIX Admin — OTT Management Dashboard',
  description: 'Admin dashboard for VANIX OTT streaming platform. Manage content, users, subscriptions, and analytics.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
