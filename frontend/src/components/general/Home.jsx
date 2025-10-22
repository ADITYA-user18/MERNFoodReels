import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  const [videos, setVideos] = useState([]);
  const containerRef = useRef(null);
  const vidRefs = useRef(new Map());

  // Fetch videos from API
 useEffect(() => {
  axios
    .get("http://localhost:3000/api/food/", { withCredentials: true })
    .then((res) => {
      // If backend wraps array in 'data'
      setVideos(res.data.data || []); // fallback to empty array
    })
    .catch((err) => {
      console.error("Error fetching videos:", err);
      setVideos([]); // fallback to empty array
    });
}, []);


  // IntersectionObserver for auto-play/pause
  useEffect(() => {
    if (!containerRef.current) return;

    const options = { root: containerRef.current, threshold: 0.75 };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const v = vidRefs.current.get(entry.target.dataset.id);
        if (!v) return;

        if (entry.isIntersecting) {
          v.muted = true;
          v.play().catch(() => {});
        } else {
          v.pause();
        }
      });
    }, options);

    const nodes = containerRef.current.querySelectorAll("[data-id]");
    nodes.forEach((n) => observer.observe(n));

    return () => observer.disconnect();
  }, [videos]); // re-run when videos change

  return (
    <div
      ref={containerRef}
      className="h-screen w-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth bg-black"
    >
      {videos.map((item) => (
        <section
          key={item._id}
          data-id={String(item._id)}
          className="relative h-screen w-full snap-start flex items-center justify-center bg-black"
        >
          {/* Video */}
          <video
            ref={(el) => {
              if (el) vidRefs.current.set(String(item._id), el);
              else vidRefs.current.delete(String(item._id));
            }}
            className="w-full h-full object-cover"
            src={item.video}
            playsInline
            loop
            muted
            preload="auto"
          />

          {/* Overlay: description + store button */}
          <div className="absolute top-6 left-4 right-4 z-20 flex flex-col gap-3">
            <div
              className="max-w-lg bg-black/45 backdrop-blur-sm text-white rounded-md px-4 py-3"
              style={{
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {item.description}
            </div>
            <div className="flex items-center gap-3">
              <Link
                to={`/food-partner/${item.foodPartner}`}
                className="inline-block bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold px-4 py-2 rounded-md shadow-md"
              >
                Visit Store
              </Link>
            </div>
          </div>

          {/* Bottom gradient for readability */}
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
        </section>
      ))}
    </div>
  );
};

export default Home;
