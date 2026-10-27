import type { Metadata } from "next";
import "./globals.css";
import { QRProvider } from "@/components/providers/qr-provider";
import { KOREAN_LABELS } from "@/constants/korean-labels";

export const metadata: Metadata = {
  title: KOREAN_LABELS.site.title,
  description: KOREAN_LABELS.site.description,
  keywords: ["QR코드", "QR코드 생성기", "무료 QR", "한국어", "vCard"],
  authors: [{ name: "QR ing" }],
  icons: {
    icon: "/favicon.svg",
    apple: "/logo.svg",
  },
  openGraph: {
    title: KOREAN_LABELS.site.title,
    description: KOREAN_LABELS.site.description,
    locale: "ko_KR",
    type: "website",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "QR ing - 큐알잉 QR코드 생성기",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: KOREAN_LABELS.site.title,
    description: KOREAN_LABELS.site.description,
    images: ["/og-image.svg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="font-sans antialiased">
        <QRProvider>{children}</QRProvider>
      </body>
    </html>
  );
}
