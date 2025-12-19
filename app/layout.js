// app/layout.js

// import "./globals.css";

// export const metadata = {
//   title: "Price Watch",
//   description: "Smart E-Commerce Price Tracker",
// };

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <body>
//         {children}
//       </body>
//     </html>
//   );
// }

// app/layout.js

import "./globals.css";
import Navbar from "../components/Navbar";

export const metadata = {
  title: "Price Watch",
  description: "Smart E-Commerce Price Tracker",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-950 text-white">
        <Navbar />
        <main className="pt-24 px-6">{children}</main>
      </body>
    </html>
  );
}
