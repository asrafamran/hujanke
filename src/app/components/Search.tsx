"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Weather from "./Weather";

const Search = ({ location, destination, setDestination }: any) => {
  const handleChange = (e: any) => {
    setDestination(e.target.value);
  };

  const handleKeyPress = (e: any) => {
    if (e.key === "Enter") {
      handleChange(e);
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 flex items-end justify-center border-b border-gray-500 search-element bg-gradient-to-b from-gray-900 to-gray-700/10 backdrop-filter backdrop-blur-sm bg-opacity-10 rounded-b-3xl">
      <div className="w-[80%] space-y-10">
        <div>
          <Label htmlFor="destinationLocation" className="text-white">
            To
          </Label>
          <Input
            type="text"
            id="destinationLocation"
            placeholder="Destination Location"
            className="text-base bg-white"
            onKeyDown={(e) => handleKeyPress(e)}
          />
        </div>
        {/* Weather */}
        <Weather location={location} destination={destination} />
      </div>
    </div>
  );
};

export default Search;
