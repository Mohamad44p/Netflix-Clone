import  axios  from 'axios';
import React, { useEffect, useState } from 'react';
import requests from '../Requests';
import Result from 'postcss/lib/result';

const Main = () => {
  const [movies, setMovies] = useState([]); 

  const movie = movies[Math.floor(Math.random() * movies.length)];

  useEffect(() => {
    axios.get(requests.requestPopular).then((response) => {
      setMovies(response.data.results);
    })
  }, []);
/*console.log(movie);*/
  const truncate = (str, n) => {
    if(str?.length > n) {
      return str.slice(0, n) + '...';
    }
    return str;
  }
  return (
    <div className='w-full h-[550px] xl:h-[700px] text-white'>
      <div className='w-full h-full'>
        <div className='absolute w-full h-[550px] xl:h-[800px] bg-gradient-to-r from-black'></div>
        <img className='w-full h-full object-cover aspect-[3/1]' src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`} alt={movie?.title} />
     <div className='absolute w-full top-[20%] p-4 md:p-8'>
        <h1 className='text-3xl md:text-5xl font-bold'>{movie?.title}</h1>
        <div className='my-4'>
          <button className='border px-7 py-2 text-black bg-gray-300 font-bold hoverButton '>Play</button>
          <button className='bg-transparent border px-5 py-2 ml-4 text-white  hoverButton'>Watch Later</button>
        </div>
        <p className='text-gray-400 text-sm'>Released: {movie?.release_date}</p>
        <p className='w-full md:max-w-[70%] lg:max-w-[50%] xl:max-w-[35%] text-gray-200'>{truncate(movie?.overview, 150)}</p>
      </div>
      </div>
    </div>
  );
};

export default Main;
