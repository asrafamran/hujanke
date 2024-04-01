"use client";

import { useEffect, useState } from "react";
import { useMap, useMapsLibrary } from "@vis.gl/react-google-maps";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";

interface Location {
  lat: number;
  lng: number;
}

type Function = (message: string) => void;

const Directions = ({
  location,
  destination,
}: {
  location: Location;
  destination: string;
}) => {
  const map = useMap();
  const routesLibrary = useMapsLibrary("routes");
  const [directionService, setDirectionService] =
    useState<google.maps.DirectionsService>();
  const [directionRenderer, setDirectionRenderer] =
    useState<google.maps.DirectionsRenderer>();

  // Routes
  const [routes, setRoutes] = useState<google.maps.DirectionsRoute[]>([]);
  const [routeIndex, setRouteIndex] = useState(0);
  const selected = routes[routeIndex];
  const leg = selected?.legs[0];

  // Debounce
  function debounce<F extends (...args: any[]) => any>(
    func: F,
    delay: number
  ): (...args: Parameters<F>) => void {
    let timeoutId: any;
    return (...args: Parameters<F>) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  }

  const debouncedFunction = debounce<Function>((destination) => {
    if (!directionService || !directionRenderer) return;

    directionService
      .route({
        origin: location,
        destination: destination,
        travelMode: google.maps.TravelMode.DRIVING,
        provideRouteAlternatives: true,
      })
      .then((response) => {
        directionRenderer.setDirections(response);
        setRoutes(response.routes);
      });
  }, 1500);

  // initilize library
  useEffect(() => {
    if (!routesLibrary || !map) return;

    setDirectionService(new routesLibrary.DirectionsService());
    setDirectionRenderer(new routesLibrary.DirectionsRenderer({ map }));

    return () => {};
  }, [routesLibrary, map]);

  // Route Render
  useEffect(() => {
    if (!directionService || !directionRenderer) return;

    debouncedFunction(destination)

    directionService
      .route({
        origin: location,
        destination: destination,
        travelMode: google.maps.TravelMode.DRIVING,
        provideRouteAlternatives: true,
      })
      .then((response) => {
        directionRenderer.setDirections(response);
        setRoutes(response.routes);
      });

    return () => {};
  }, [destination, directionService, directionRenderer]);

  // Rerender Map when change direction
  useEffect(() => {
    if (!directionRenderer) return;
    directionRenderer.setRouteIndex(routeIndex);

    return () => {};
  }, [routeIndex, directionRenderer]);

  if (!leg) return <></>;

  return (
    <div className="fixed bottom-0 left-0 right-0 flex justify-center items-end my-element">
      <Drawer>
        <DrawerTrigger>
          <Button>Alternative Routes</Button>
        </DrawerTrigger>
        <DrawerContent>
          <div className="flex justify-center">
            <div className="w-[800px]">
              <DrawerHeader>
                <DrawerTitle>Alternative Route</DrawerTitle>
              </DrawerHeader>
              <div className="flex justify-center">
                <div className="w-[80%] flex flex-col">
                  {routes.map((route, index) => (
                    <DrawerClose key={index}>
                      <Button
                        variant="link"
                        onClick={() => setRouteIndex(index)}
                      >
                        {route.summary}
                      </Button>
                    </DrawerClose>
                  ))}
                </div>
              </div>

              <DrawerFooter>
                <DrawerClose>
                  <Button variant="default">Cancel</Button>
                </DrawerClose>
              </DrawerFooter>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default Directions;
