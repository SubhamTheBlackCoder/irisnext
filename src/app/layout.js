import { AuthProvider } from "@/components/AuthContext";
import Navbar from "@/components/Navbar/Navbar";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <AuthProvider>
        <body>
          <Navbar />
          {children}
        </body>
      </AuthProvider>
    </html>
  );
}
