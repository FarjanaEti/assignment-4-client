export const dynamic = 'force-dynamic';
import ConditionalWhyUs from "@/components/conditional";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

export default function CommonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  
  return (
    <div>
      <Navbar></Navbar>
      {children}
    <ConditionalWhyUs></ConditionalWhyUs>
      <Footer></Footer>
    </div>
  );
}