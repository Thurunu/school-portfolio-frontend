import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "./LoadingComponent";

const Events = () => {
  const [eventsData, setEventsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:3000/api/events");
        const sortedData = response.data.sort(
          (a, b) => new Date(a.date) - new Date(b.date)
        );
        setEventsData(sortedData);
      } catch (error) {
        console.error("Error fetching events data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  return (
    <section id="events">
      <div className="mt-14 mb-12">
        <div className="container">
          {/* Header section  */}
          <div className="text-center mb-10 max-w-[600px] mx-auto">
            <h1 data-aos="fade-up" className="text-3xl font-bold text-primary">
              Upcoming Events
            </h1>
          </div>
          <div>
            {/* Body section  */}
            {/* show loading component while fetching */}
            {loading ? (
              <Loading
                message="Loading events...."
                size="medium"
                color="primary"
                minHeight="400px"
              />
            ) : (
              <>
                <div
                  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 
            lg:grid-cols-4 place-items-center gap-5"
                >
                  {eventsData.map((data, index) => (
                    <div
                      data-aos="fade-up"
                      data-aos-delay={index * 100}
                      key={data._id}
                      className=" hover:bg-secondary p-5 rounded-lg transition-colors 
                  duration-400 h-[450px] w-[350px] flex flex-col"
                    >
                      <img
                        src={data.img}
                        alt={data.title}
                        className="h-[200px] w-full object-cover rounded-md mb-3"
                      />
                      <div className="flex flex-col flex-grow">
                        <div className="flex justify-between items-center mb-3">
                          <p
                            className="text-xs font-bold text-gray-800 uppercase 
                      tracking-wider"
                          >
                            {new Date(data.date)
                              .toLocaleDateString("en-US", {
                                weekday: "long",
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              })
                              .toUpperCase()}
                          </p>
                          <p className="text-xs font-bold text-gray-800 uppercase tracking-wider">
                            {new Date(data.date)
                              .toLocaleTimeString("en-US", {
                                hour: "numeric",
                                minute: "2-digit",
                                hour12: true,
                              })
                              .toUpperCase()}
                          </p>
                        </div>
                        <h3 className="font-bold text-2xl mb-3 text-black leading-tight uppercase tracking-wide">
                          {data.title}
                        </h3>
                        <p
                          data-aos="fade-up"
                          className="text-sm text-gray-600 tracking-wide leading-6 line-clamp-3 overflow-hidden"
                        >
                          {data.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Events;
