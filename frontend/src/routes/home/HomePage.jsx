import Awards from '@routes/home/Awards';
import Education from '@routes/home/Education';
import Hero from '@routes/home/Hero';
import Pricing from '@routes/home/Pricing';
import Stats from '@routes/home/Stats';
import OpenAccount from '@components/layout/OpenAccount';

function HomePage() {
  return (
    <>
      <Hero />
      <Awards />
      <Stats />
      <Pricing />
      <Education />
      <OpenAccount />
    </>
  );
}

export default HomePage;
