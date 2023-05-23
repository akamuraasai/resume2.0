import './globals.css';
import { Montserrat as FontFamily } from 'next/font/google';

const fontFamily = FontFamily({ subsets: ['latin'] });

export const metadata = {
  title: 'Jonathan Cruz - Resume',
  description: 'Resume website with Next and Tailwind',
  viewport: {
    width: "device-width",
    height: "device-height",
    initialScale: 1,
    maximumScale: 1,
    minimumScale: 1,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={fontFamily.className}>
        {children}
      </body>
    </html>
  )
};
