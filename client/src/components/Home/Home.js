import React from 'react';



import BPN from "../../assets/BPN.png";
import AboutUs from "../../assets/AboutUs.png";
import Feedbacks from "../../assets/Feedbacks.png";
import Offers from "../../assets/Offers.png";
import Contact from "../../assets/Contact.png";

// Staff
import Nicolas from "../../assets/Nicolas.png";
import Youri from "../../assets/Youri.jpg";
import Lucas from "../../assets/Lucas.jpg";

// Styles
import '../../styles/Home.css';

// Footer
import Footer from "./Footer"

function Home(){ 
    return <div>
            <div id="superbr"className="superbr">
      <section id="">
        <img src={BPN} className="d-block w-100" alt="BPN" />
      </section>

      <section id="about">
        <div id="carou2">
            <div id="carouselExampleFade" className="carousel slide carousel-fade " data-bs-ride="carousel">
                <div className="carousel-inner">
                  <div className="carousel-item active">
                    <img src={AboutUs} className="d-block w-100" alt="About Us"/>
                  </div>
                </div>
            </div>
        </div>
      </section>
      <section id="offer">
        <div id="carou3">
            <div id="carouselExampleFade" className="carousel slide carousel-fade " data-bs-ride="carousel">
                <div className="carousel-inner">
                  <div className="carousel-item active">
                    <img src={Offers} className="d-block w-100" alt="Offers"/>
                  </div>
                </div>
            </div>
        </div>
      </section>
      <br />
      <section id="feed">
        <div id="carou3">
            <div id="carouselExampleFade" className="carousel slide carousel-fade " data-bs-ride="carousel">
                <div className="carousel-inner">
                  <div className="carousel-item active">
                    <img src={Feedbacks} className="d-block w-100" alt="Feedbacks"/>
                  </div>
                </div>
            </div>
        </div>
      </section>
      <section id="Contact">
        <div id="carou4">
            <div id="carouselExampleFade" className="carousel slide carousel-fade " data-bs-ride="carousel">
                <div className="carousel-inner">
                  <div className="carousel-item active">
                    <img src={Contact} className="d-block w-100" alt="Contact"/>
                  </div>
                </div>
            </div>
        </div>
      </section>

      <div className="bg-warning px-4" >
        <div className="row bg-warning  p-5 resize text-center"  >
          <div className="col ">
            <h2 className="fw-bold fst-italic">MAILING ADDRESS</h2>
            <a 
              className='fw-normal text-dark text-decoration-none'
              href="https://www.google.com/maps/place/Apple+Campus+3/@37.3326256,-122.2854408,10z/data=!4m9!1m2!2m1!1sApple+à+proximité+de+Silicon+Valley,+Californie,+États-Unis!3m5!1s0x808fb615f4fbd08f:0x26c7bd2bccdf1f0d!8m2!3d37.3795344!4d-122.0111341!15sCj5BcHBsZSDDoCBwcm94aW1pdMOpIGRlIFNpbGljb24gVmFsbGV5LCBDYWxpZm9ybmllLCDDiXRhdHMtVW5pc5IBEGNvcnBvcmF0ZV9jYW1wdXM?hl"
            >
              263 Santa Ana Ct, Sunnyvale, CA 94085, United States
            </a>
          </div>
          <div className="col">
            <h2 className="fw-bold fst-italic">EMAIL ADDRESS</h2>
            <a
              className='fw-normal text-dark text-decoration-none' 
              href="mailto:support@bpn.com"
            >
              support@bpn.com
            </a>
          </div>
          <div className="col">
            <h2 className="fw-bold fst-italic">PHONE NUMBER</h2>
            <a
              className='fw-normal text-dark text-decoration-none' 
              href="tel:+1312-424-0955"
            >
              +1312-424-0955
            </a>
          </div>
        </div>
      </div>

        

        <div className="bg-dark text-white">
          <br/>
          <div className="display-4 text-center ">S T A F F </div>
              <br></br>
            <div className="row text-center resize">
              <div className="col-lg-4">
                <img src={Nicolas} className="rounded-circle  " alt="Nicolas Planche" width="200" height="200" ></img>
                <h2>Nicolas Planche</h2>
                <p>Co founder. <br></br> Developper Front-end</p>
              </div>
              <div className="col-lg-4">
                <img src={Youri} className="rounded-circle  " alt="Youri Novikov" width="200" height="200" ></img>
                <h2>Youri Novikov</h2>
                <p>Founder. <br></br>Developper Full-Stack</p>
              </div>
              <div className="col-lg-4">
                <img src={Lucas} className="rounded-circle  " alt="Lucas Brustolin" width="200" height="200" ></img>
                <h2>Lucas Brustolin</h2>
                <p>Co founder.<br></br> Developper Back-end</p>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
}

export default Home