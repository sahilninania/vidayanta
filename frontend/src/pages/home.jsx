import Hero from "../components/herohome";
import Navbar from "../components/navbarhome";
import Stats from "../components/statshome";
import HowItWorks from "../components/howitworkshome";
import Features from "../components/featureshome";
import Analytics from "../components/analyticshome";
import UpcomingFeatures from "../components/upcomingfeatureshome";
import Testimonials from "../components/testimonialshome";
import Footer from "../components/footerhome";
export default function Home(){return(
    <>
    <Navbar/>
    <Hero/>
    <Stats/>
    <section id="howitswork"><HowItWorks/></section>
    <Features/>
    <UpcomingFeatures/>
    <Analytics/>
    <Testimonials/>
    <Footer/>
    </>
)}