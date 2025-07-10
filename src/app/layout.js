export const metadata = {
  icons: {
    icon: "/iris-favicon.png",
  },
};
import { AuthProvider } from "@/components/AuthContext";
import Navbar from "@/components/Navbar/Navbar";
import SplashLayout from "@/components/SplashScreen/SplashLayout";
import CookieBanner from "./cookies/CookieBanner";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          
            <Navbar />
            {children}
       
        </AuthProvider>
        <CookieBanner/>
      </body>
    </html>
  );
}
