import type { Metadata, Viewport } from "next";
import { Corben, DM_Sans } from "next/font/google";
import "./globals.css";
import { ConvexClientProvider } from "@/components/ConvexClientProvider";

const corben = Corben({
  variable: "--font-corben",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Eden · Find Someone Who",
  description:
    "An Eden community scavenger hunt — find someone who matches each prompt and fill the card.",
};

export const viewport: Viewport = {
  themeColor: "#d23b3a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${corben.variable} ${dmSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col relative">
        <ConvexClientProvider>{children}</ConvexClientProvider>
      </body>
    </html>
  );
}
