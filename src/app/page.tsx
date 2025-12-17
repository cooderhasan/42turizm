import Hero from "@/components/home/Hero";
import Services from "@/components/home/Services";
import About from "@/components/home/About";
import Testimonials from "@/components/home/Testimonials";
import References from "@/components/home/References";
import BlogAndVideo from "@/components/home/BlogAndVideo";

import { db } from "@/db";
import { services, references } from "@/db/schema";
import { eq, asc } from "drizzle-orm";

export default async function Home() {
  const serviceItems = await db.select().from(services).where(eq(services.isActive, true)).orderBy(services.order);
  const referencesData = await db.select().from(references).orderBy(asc(references.order));

  return (
    <main className="min-h-screen">
      <Hero />
      <Services services={serviceItems} />
      <About />
      <BlogAndVideo />
      <Testimonials />
      <References references={referencesData} />
    </main>
  );
}
