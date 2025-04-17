import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Recipe Finder App",
  description: "A Recipe Search app using TheMealDB API",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
       
      >
        {children}
      </body>
    </html>
  );
}
