import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/navbar";
import Particles from "@/components/particles";
import Head from "next/head";


export const metadata: Metadata = {
  title: "jkn95dev",
  description: "Nurtree",
};




export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
    
    <html lang="en" className="overflow-auto scrollbar-hide">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <script src="https://open.spotify.com/embed/iframe-api/v1" async></script>

      </Head>
    
      <body className="bg-black"
      >
        
        <Particles
        className="fixed inset-0 -z-10 animate-fade-in overflow-auto scrollbar-hide"
        quantity={200}
      />
        
        <div className="overflow-auto scrollbar-hide">{children}</div>
        
      </body>
      
    </html>
    
    </>
  );
}
