import React from "react";
import Mission from "../assets/about/mission.jpg";

import Vision from "../assets/about/vision.jpg";

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
              At our core, we are dedicated to nurturing a vibrant learning environment where every student is empowered to discover their unique strengths and passions. Our mission is to inspire curiosity, foster creativity, and cultivate a lifelong love of learning. Through innovative teaching, supportive mentorship, and a commitment to inclusivity, we strive to equip our students with the knowledge, skills, and values they need to thrive in an ever-changing world.
            </p>
          </div>
          {/* Image */}
          <div>
            <img
              src={Mission}
              alt="Our Mission"
              className="w-full rounded-lg shadow-2xl object-cover h-[300px] border-4 border-primary transition-transform duration-300 hover:scale-105"
              style={{
                boxShadow: "0 10px 32px 0 rgba(0,0,0,0.25), 0 2px 4px 0 rgba(0,0,0,0.18)"
              }}
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
              alt="Our Vission"
              className="w-full rounded-lg shadow-2xl object-cover h-[300px] border-4 border-primary transition-transform duration-300 hover:scale-105"
              style={{
                boxShadow: "0 10px 32px 0 rgba(0,0,0,0.25), 0 2px 4px 0 rgba(0,0,0,0.18)"
              }}
            />
          </div>
          {/* Text */}
          <div
        
        className="order-1 md:order-2">
            <h2 className="text-2xl font-bold text-secondary mb-4">Our Vision</h2>
            <p className="text-gray-600 leading-rel</p>axed">
              Our vision is to become a beacon of educational excellence, recognized for cultivating compassionate, innovative, and resilient individuals. We aspire to create a community where diversity is celebrated, collaboration is encouraged, and every learner is inspired to reach their fullest potential. By embracing forward-thinking approaches and fostering a spirit of continuous growth, we aim to shape future leaders who will make a positive impact in their communities and the world.
            </p>
          </div>
        </div>
      </div>
    </div>
    </section>
  );
};

export default About;
