// app/layout.js

import "./globals.css";

export const metadata = {
  title: "Price Watch",
  description: "Smart E-Commerce Price Tracker",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
