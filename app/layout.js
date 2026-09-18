import localFont from "next/font/local";
import Providers from "./providers";
import LiveChat from "./components/LiveChat";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Wells Fargo | Financial Services and Online Banking",
  description:
    "Committed to the financial health of our customers and communities. Explore bank accounts, loans, mortgages, investing, credit cards & banking services»",
  keywords:
    "Internet Banking, Commercial, Individual, Institutional, Loan Interest Rate",
  authors: [{ name: "Wells Fargo", url: "https://wellsfargos.vercel.app" }],
  creator: "Wells Fargo",
  openGraph: {
    title: "Wells Fargo",
    description: "Committed to the financial health of our customers and communities. Explore bank accounts, loans, mortgages, investing, credit cards & banking services»",
    url: "https://wellsfargos.vercel.app",
    siteName: "Wells Fargo",
    images: [
      {
        url: "https://wellsfargos.vercel.app/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Wells Fargo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Wells Fargo",
    description: "Committed to the financial health of our customers and communities. Explore bank accounts, loans, mortgages, investing, credit cards & banking services»",
    images: ["https://wellsfargos.vercel.app/images/og-image.png"],
    creator: "@wellsfargo",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
    shortcut: "/shortcut-icon.png",
  },
  themeColor: "#e30613",
  manifest: "/manifest.json",
  robots: {
    index: true,
    follow: true,
    noindex: false,
    nofollow: false,
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
  appleWebApp: {
    capable: true,
    title: "Wells Fargo",
    statusBarStyle: "default",
  },
  mobileWebApp: {
    capable: true,
    title: "Wells Fargo",
  },
  formatDetection: {
    telephone: false,
    address: false,
    email: false,
  },
  theme: {
    colorScheme: "light dark",
    color: "#e30613",
  },
  manifestType: "application/manifest+json",
  applicationName: "Wells Fargo",
  category: "Finance",
  publisher: "Wells Fargo",
  publisherWebsite: "https://wellsfargos.vercel.app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`bg-white w-full h-full text-black min-h-screen ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          {children}
        </Providers>
        
      </body>
    </html>
  );
}
