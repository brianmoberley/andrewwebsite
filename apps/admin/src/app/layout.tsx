import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Admin Dashboard - Construction Platform",
  description: "Manage leads, estimates, invoices, and projects",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex">
          <aside className="w-64 bg-gray-900 text-white p-6 min-h-screen">
            <h1 className="text-2xl font-bold mb-8">Construction Admin</h1>
            <nav className="space-y-4">
              <a href="/dashboard" className="block hover:text-blue-400">Dashboard</a>
              <a href="/leads" className="block hover:text-blue-400">Leads</a>
              <a href="/customers" className="block hover:text-blue-400">Customers</a>
              <a href="/estimates" className="block hover:text-blue-400">Estimates</a>
              <a href="/invoices" className="block hover:text-blue-400">Invoices</a>
              <a href="/projects" className="block hover:text-blue-400">Projects</a>
              <a href="/calendar" className="block hover:text-blue-400">Calendar</a>
              <a href="/portfolio" className="block hover:text-blue-400">Portfolio</a>
            </nav>
          </aside>
          <main className="flex-1">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
