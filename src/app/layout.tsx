import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import NavBar from "@/components/Base/NavBar";
import { Toaster } from "@/components/ui/toaster";
import FireWel from "@/components/fireWeel";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Fity Website",
  description: "Description of the Fity Website",
  icons: {
    icon: "/favicon.ico",
  },
  themeColor: "#ffffff",
  viewport: "width=device-width, initial-scale=1",
  appleWebApp: {
    title: "Fity Website",
    capable: true,
    statusBarStyle: "default",
  },
  openGraph: {
    title: "Fity Website",
    description: "Description of the Fity Website",
    url: "/logo.png",
    type: "website",
    siteName: "Fity Website",
    images: [
      {
        url: "/logo.png",
        width: 1920,
        height: 1080,
        alt: "Fity Logo",
      },
    ],
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <FireWel />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NavBar />
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
