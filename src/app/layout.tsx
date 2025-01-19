import './globals.css';

export const metadata = {
  title: "Todo List App",
  description: "Manage your tasks efficiently",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
      <html lang="en">
          <body className="bg-gray-100 min-h-screen text-gray-900">
              <main className="container mx-auto p-4">{children}</main>
          </body>
      </html>
  );
}
