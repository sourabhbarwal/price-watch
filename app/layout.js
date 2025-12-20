// // app/layout.js
// import "./globals.css";
// import Navbar from "../components/Navbar";

// export const metadata = {
//   title: "Price Watch",
//   description: "Smart E-Commerce Price Tracker",
// };

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <body className="min-h-screen bg-slate-950 text-white">
//         <Navbar />
//         <main className="pt-24 px-6">{children}</main>
//       </body>
//     </html>
//   );
// }

// app/layout.js
import "./globals.css";
import Navbar from "@/components/Navbar";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded"
          rel="stylesheet"
        />
      </head>

      <body className="bg-slate-950 text-white">
        <header className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
          <div className="text-lg font-semibold text-teal-400">
            Price Watch
          </div>

          <Navbar />
        </header>

        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  );
}

