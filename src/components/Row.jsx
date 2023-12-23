import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Movie from "./Movie";
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import '@splidejs/splide/dist/css/splide.min.css';
import Splide from '@splidejs/splide';
import '@splidejs/splide-extension-auto-scroll';

const Row = ({ title, fetchURL }) => {
  const [movies, setMovies] = useState([]);
  const [isHovered, setIsHovered] = useState(false); 
  const sliderRef = useRef(null);

  const getPerPage = () => {
    const width = window.innerWidth;
    if (width < 768) { 
      return 5; 
    } else if (width < 640) { 
      return 4; 
    }
    return 6; 
  };

  useEffect(() => {
    axios.get(fetchURL).then((response) => {
      setMovies(response.data.results);
    });
  }, [fetchURL]);

  useEffect(() => {
    let splideInstance;

    const handleResize = () => {
      if (splideInstance) {
        splideInstance.options = { perPage: getPerPage() };
      }
    };

    if (sliderRef.current) {
      splideInstance = new Splide(sliderRef.current, {
        type      : 'loop',
        drag      : 'free',
        focus     : 'center',
        perPage   : getPerPage(),
        perMove   : 1,
        gap       : '1rem',
        pagination: false,
        arrows    : true,
        autoScroll: {
          speed: 10,
          pauseOnHover: true,
        },
      });

      splideInstance.mount();
      window.addEventListener('resize', handleResize);
    }

    return () => {
      if (splideInstance) {
        splideInstance.destroy();
      }
      window.removeEventListener('resize', handleResize);
    };
  }, [movies]);

  return (
    <>
      <h1 className="text-white font-bold md:text-xl p-4 mt-[5rem] ">{title}</h1>
      <div 
        ref={sliderRef} 
        className="splide" 
        onMouseEnter={() => setIsHovered(true)} 
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="splide__track">
          <ul className="splide__list">
            {movies.map((item, id) => (
              <li key={id} className="splide__slide">
                <Movie item={item} />
              </li>
            ))}
          </ul>
        </div>
        <div className="splide__arrows">
          <button className={`splide__arrow splide__arrow--prev ${isHovered ? 'opacity-100' : 'opacity-0'} text-white`}><MdChevronRight /></button>
          <button className={`splide__arrow splide__arrow--next ${isHovered ? 'opacity-100' : 'opacity-0'} text-white`}><MdChevronRight /></button>
        </div>
      </div>
    </>
  );
};

export default Row;
