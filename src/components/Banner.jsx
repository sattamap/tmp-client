import { Link } from "react-router-dom";
import tmpsBanner from "../assets/tmps_banner.jpg";
import Typewriter from 'typewriter-effect';

const Banner = () => {
  return (
    <div>
      <div className="hero min-h-screen" style={{ backgroundImage: `url(${tmpsBanner})` }}>
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
          <div data-aos="flip-left"
     data-aos-easing="ease-out-cubic"
     data-aos-duration="2000"><h1 className="mb-5 text-5xl font-bold">Collaborative <br /> Task Management Platform</h1></div>
            
            <p className="mb-5">
            Elevate collaboration with effortless task synchronization. <br />
            
            <Typewriter
                               options={{
                                   strings: ['Simplify your workflow and stay organized.'],
                                   autoStart: true,
                                   loop: true,
                               }}
                           />
            
            </p>
            <Link to="/login">
              <button className="btn btn-primary">Get Started</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
