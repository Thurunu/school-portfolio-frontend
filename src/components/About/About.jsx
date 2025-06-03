import React from "react";
import Mission from "../../assets/about/mission.jpg";
import Vision from "../../assets/about/vision.jpg";

const About = () => {
  return (
    <section id="about">

    <div className="bg-white min-h-screen py-16">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-12 max-w-xl mx-auto">
          <h1 data-aos="fade-up" className="text-4xl font-extrabold text-primary mb-2">
            About
          </h1>
          <p className="text-sm text-gray-500">Who we are & what we aim to do</p>
        </div>

        {/* Mission Section */}
        <div
        data-aos="zoom-in"
        className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center mb-16">
          {/* Text */}
          <div>
            <h2 className="text-2xl font-bold text-primary mb-4">Our Mission</h2>
            <p className="text-gray-600 leading-relaxed">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum eius
              similique delectus non. Nulla enim ad deleniti dolores vitae, quas
              consequatur rem, delectus nihil molestias ipsum praesentium animi
              dolorem quod.
            </p>
          </div>
          {/* Image */}
          <div>
            <img
              src={Mission}
              alt="Our Mission"
              className="w-full rounded-lg shadow-lg object-cover h-[300px]"
            />
          </div>
        </div>

        {/* Vision Section */}
        <div 
        data-aos="zoom-in"
        className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Image */}
          <div className="order-2 md:order-1">
            <img
              src={Vision}
              alt="Our Vision"
              className="w-full rounded-lg shadow-lg object-cover h-[300px]"
            />
          </div>
          {/* Text */}
          <div
        
        className="order-1 md:order-2">
            <h2 className="text-2xl font-bold text-secondary mb-4">Our Vision</h2>
            <p className="text-gray-600 leading-relaxed">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil est
              tempora necessitatibus facilis accusantium facere laborum
              aspernatur? Veritatis esse dignissimos similique ducimus non, eaque,
              mollitia culpa sint nostrum et voluptatem?
            </p>
          </div>
        </div>
      </div>
    </div>
    </section>
  );
};

export default About;
