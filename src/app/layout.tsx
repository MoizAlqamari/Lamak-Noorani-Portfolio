import type { Metadata } from "next";
import { Inter, Barlow } from "next/font/google";
import "./globals.css";
import LoadingScreen from "@/components/LoadingScreen";
import Navbar from "@/components/Navbar";
import Background from "@/components/Background";
import Timeline from "@/components/Timeline";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const barlow = Barlow({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["600", "700", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://lamaknoorani.com"),
  title: "Lamak Noorani Films & Studios | Cinematic Visual Storytelling",
  description:
    "Premium photography, videography, and creative media services by Lamak Noorani. Specializing in events, fashion, wildlife, product, and street photography with a cinematic touch.",
  keywords: [
    "Lamak Noorani",
    "photography",
    "videography",
    "cinematic",
    "film studio",
    "Pakistan photographer",
    "creative media",
    "event photography",
    "fashion photography",
    "wildlife photography",
  ],
  authors: [{ name: "Lamak Noorani", url: "https://lamaknoorani.com" }],
  creator: "Lamak Noorani Films & Studios",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Lamak Noorani Films & Studios",
    title: "Lamak Noorani Films & Studios | Cinematic Visual Storytelling",
    description:
      "Premium photography, videography, and creative media services by Lamak Noorani.",
    url: "https://lamaknoorani.com",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Lamak Noorani Films & Studios",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lamak Noorani Films & Studios",
    description:
      "Cinematic visual storytelling through photography and videography.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
  alternates: {
    canonical: "https://lamaknoorani.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${barlow.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Lamak Noorani",
              jobTitle: "Creative Media Specialist",
              url: "https://lamaknoorani.com",
              sameAs: [
                "https://www.instagram.com/_.lamaknoorani",
              ],
              knowsAbout: [
                "Photography",
                "Videography",
                "Photo Editing",
                "Video Editing",
                "Creative Direction",
                "Visual Storytelling",
                "Branding",
                "Content Creation",
              ],
            }),
          }}
        />
      </head>
      <body className="min-h-full font-sans bg-[#2A281B] text-[#E4DBC2] overflow-x-hidden">
        <LoadingScreen />
        <Background />
        <Timeline />
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}