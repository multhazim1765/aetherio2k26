import type { Metadata } from 'next';
import './globals.css';
import { Providers } from '@/components/providers';
import CertificateModalPopup from '@/components/certificate-modal-popup';
import FemaleOfferFloatingWidget from '@/components/female-offer-widget';

export const metadata: Metadata = {
  title: "AMSphere Presents AETHERION'26 | Convergence of Intelligence, Technology & Innovation",
  description:
    "Official portal for AETHERION'26 presented by AMSphere — A premier National Level Technical & Cultural Symposium featuring Neural Quest, AI Escape Room Reverse Engineering, AI Web Sprint, E-Sports Arena, Film Hunt, and more.",
  keywords: [
    "AETHERION",
    "AETHERION 26",
    "Symposium",
    "Technical Symposium",
    "Cultural Fest",
    "AMSphere",
    "Engineering Events",
    "AI Web Sprint",
    "E-Sports Championship",
  ],
  openGraph: {
    title: "AMSphere Presents AETHERION'26 | National Level Symposium",
    description: "Convergence of Intelligence, Technology & Innovation. Register now for ₹150 (For All Events).",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="font-sans bg-void text-slate-100 antialiased min-h-screen">
        <Providers>
          {children}
          <CertificateModalPopup />
          <FemaleOfferFloatingWidget />
        </Providers>
      </body>
    </html>
  );
}
