import Hero from "@/components/home/Hero";
import Services from "@/components/home/Services";
import About from "@/components/home/About";
import Testimonials from "@/components/home/Testimonials";
import References from "@/components/home/References";
import BlogAndVideo from "@/components/home/BlogAndVideo";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Services />
      <About />
      <BlogAndVideo />
      <Testimonials />
      <References />
    </main>
  );
}
