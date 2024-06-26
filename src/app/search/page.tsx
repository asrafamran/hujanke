"use client";

import React, { useState, useEffect } from "react";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
} from "@vis.gl/react-google-maps";
import Directions from "@/app/components/Directions";
import Search from "@/app/components/Search";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon } from "@radix-ui/react-icons";

const Page = () => {
  const [position, setPosition] = useState({ lat: 46.3, lng: 10 });
  const [locationPermissionGranted, setLocationPermissionGranted] =
    useState(false);
  const [destination, setDestination] = useState<string>("");

  //   Grant permission for location
  useEffect(() => {
    const handleGeolocationSuccess = (location: GeolocationPosition) => {
      setPosition({
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      });
      setLocationPermissionGranted(true); // Update permission status
    };

    const handleGeolocationError = (error: any) => {
      console.error("Location request error:", error); // Log the error
    };

    // Request location permission if not already granted
    if (!navigator.geolocation) {
      console.error("Geolocation is not supported by this browser.");
    } else if (!locationPermissionGranted) {
      navigator.geolocation.getCurrentPosition(
        handleGeolocationSuccess,
        handleGeolocationError
      );
    }
  }, [locationPermissionGranted]); // Re-run effect if permission changes

  if (process.env.NEXT_PUBLIC_MAP_KEY === undefined) {
    return <div>Server Down</div>;
  }

  const requestLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setPosition({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => {
        console.error("Location request error:", error);
      }
    );
  };

  return (
    <div>
      {!locationPermissionGranted ? (
        <div className="flex justify-center h-dvh">
          <div className=" h-full flex flex-col justify-center items-center w-[80%] gap-4">
            <p className="text-center">
              This feature requires location access. Please grant permission to
              use this map.
            </p>
            <Button
              onClick={() => requestLocation()}
              onTouchStart={() => requestLocation()}
            >
              Enable Location
            </Button>
          </div>
        </div>
      ) : (
        <APIProvider apiKey={process.env.NEXT_PUBLIC_MAP_KEY}>
          <div className="w-full h-screen">
            <Map
              defaultCenter={position}
              mapId={process.env.NEXT_PUBLIC_MAP_ID}
              defaultZoom={10}
              gestureHandling={"cooperative"}
              disableDefaultUI
            >
              <AdvancedMarker position={position}>
                <Pin
                  background={"#fdc500"}
                  borderColor={"#2f3e46"}
                  glyphColor={"#354f52"}
                />
              </AdvancedMarker>
              <Directions location={position} destination={destination} />
              <Search
                location={position}
                destination={destination}
                setDestination={setDestination}
              />
            </Map>
          </div>
        </APIProvider>
      )}
    </div>
  );
};

export default Page;
