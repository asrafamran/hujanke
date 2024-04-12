"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const Weather = ({ location, destination }: any) => {
  const [locWeather, setLocWeather] = useState<any>();
  const [desWeather, setDesWeather] = useState<any>();
  const [desLat, setDesLat] = useState();
  const [desLng, setDesLng] = useState();

  useEffect(() => {
    if (!location) {
      return;
    }

    const getWeather = async () => {
      const data = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lng}&appid=${process.env.NEXT_PUBLIC_OPEN_WEAHTER_API}`
      ).then((res) => res.json());

      setLocWeather(data);
      return data;
    };
    // Call the function
    getWeather();
    return () => {};
  }, []);

  //   Geocode destination
  useEffect(() => {
    if (!destination) {
      return;
    }

    const getWeatherDes = async () => {
      const data = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${destination}&key=${process.env.NEXT_PUBLIC_MAP_KEY}`
      ).then((res) => res.json());

      setDesLat(data?.results[0].geometry.location.lat);
      setDesLng(data?.results[0].geometry.location.lng);
    };

    // Call the function
    getWeatherDes();

    return () => {};
  }, [destination]);

  //   Get Destination weather
  useEffect(() => {
    if (!desLat || !desLng) {
      return;
    }

    const getWeather = async () => {
      const data = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${desLat}&lon=${desLng}&appid=${process.env.NEXT_PUBLIC_OPEN_WEAHTER_API}`
      ).then((res) => res.json());

      setDesWeather(data);
      return data;
    };

    // Call the function
    getWeather();

    return () => {};
  }, [desLat, desLng]);

  return (
    <div className="text-white">
      <div>
        Current Location: {locWeather?.name}
        <div className="flex items-center gap-2">
          {locWeather && (
            <>
              <p>{locWeather?.weather[0].main} | </p>
              <p>{locWeather?.weather[0].description} | </p>
              <Image
                src={`https://openweathermap.org/img/wn/${locWeather?.weather[0].icon}.png`}
                width={30}
                height={30}
                alt="Weather Icon"
              />
            </>
          )}
        </div>
      </div>
      <div>
        Destination: {destination}
        <div className="flex items-center gap-2 ">
          {desWeather && (
            <>
              <p>{desWeather?.weather[0].main} | </p>
              <p>{desWeather?.weather[0].description} | </p>
              <Image
                src={`https://openweathermap.org/img/wn/${desWeather?.weather[0].icon}.png`}
                width={30}
                height={30}
                alt="Weather Icon"
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Weather;
