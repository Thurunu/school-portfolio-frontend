import React from "react";
import Img1 from "../../assets/gallery/gallery_image_1.jpg";
import Img2 from "../../assets/gallery/gallery_image_2.jpg";
import Img3 from "../../assets/gallery/gallery_image_3.jpg";
import Img4 from "../../assets/gallery/gallery_image_4.jpg";

const GalleryData = [
  {
    id: 1,
    img: Img1,
    title: "Lorem, ipsum.",
    desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusantium, numquam?",
    aosDelay: "0",
  },
  {
    id: 2,
    img: Img2,
    title: "Lorem, ipsum.",
    desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusantium, numquam?",
    aosDelay: "200",
  },
  {
    id: 3,
    img: Img3,
    title: "Lorem, ipsum.",
    desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusantium, numquam?",
    aosDelay: "400",
  },
  {
    id: 4,
    img: Img4,
    title: "Lorem, ipsum.",
    desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusantium, numquam?",
    aosDelay: "600",
  },
];

const Gallery = () => {
  return (
    <div className="mt-14 mb-12">
      <div className="container">
        {/* Header Section  */}
        <div className="text-center mb-10 max-w-[600px] mx-auto">
          <h1 data-aos="fade-up" className="text-3xl font-bold text-primary">
            Gallery
          </h1>
          <p data-aos="fade-up" className="text-xs text-gray-400">
            Our Best Moments
          </p>
        </div>
        {/* Body Section  */}
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 place-items-center gap-5">
            {/* Card section  */}
            {GalleryData.map((data) => (
              <div
                data-aos="fade-up"
                data-aos-delay={data.aosDelay}
                key={data.id}
                className="space-y-4 cursor-pointer hover:bg-secondary p-4 rounded-lg transition-colors duration-800"
              >
                <img
                  src={data.img}
                  alt={data.title}
                  className="h-[300px] w-[350px] object-cover rounded-md"
                />
                <div>
                  <h3 className="font-semibold">{data.title}</h3>
                  <p className="text-sm text-gray-600">{data.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
