import React, {useEffect, useState} from 'react'
import JsonData from "../data/data.json";
import {Navigation} from "../Template/navigation";
import {Features} from "../Template/features";
import {About} from "../Template/about";
import {Services} from "../Template/services";
import {Gallery} from "../Template/gallery";
import {Testimonials} from "../Template/testimonials";
import {Team} from "../Template/Team";
import {Contact} from "../Template/contact";
import SmoothScroll from "smooth-scroll";
export const scroll = new SmoothScroll('a[href*="#"]', {
    speed: 1000,
    speedAsDuration: true,
});
export default function LandingPage(){
    const [landingPageData, setLandingPageData] = useState({});
    useEffect(() => {
        setLandingPageData(JsonData);
    }, []);
    return(
        <div>
            <Navigation />
            <Features data={landingPageData.Features} />
            <About data={landingPageData.About} />
            <Services data={landingPageData.Services} />
            <Gallery data={landingPageData.Gallery}/>
            <Testimonials data={landingPageData.Testimonials} />
            <Team data={landingPageData.Team} />
            <Contact data={landingPageData.Contact} />
        </div>
    )
}