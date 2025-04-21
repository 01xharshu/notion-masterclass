
import Hero from '../components/Hero';
import Problems from '../components/Problems';
import Curriculum from '../components/Curriculum';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';

import Instructors from '@/components/Instructors';



export default function Home() {
  return (
    <main className="min-h-screen">

      <Hero />
      <Problems />
      <Instructors />
      <Curriculum />
      <FAQ />
      <Footer />

    </main>
  );
}
