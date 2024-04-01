"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Search = ({ setDestination }: any) => {
  return (
    <div className="fixed top-0 left-0 right-0 flex items-end justify-center border-b border-gray-500 search-element bg-gradient-to-b from-gray-900 to-gray-700/10 backdrop-filter backdrop-blur-sm bg-opacity-10 rounded-b-3xl">
      <div className="w-[80%]">
        <Label htmlFor="destinationLocation" className="text-white">
          To
        </Label>
        <Input
          type="text"
          id="destinationLocation"
          placeholder="Destination Location"
          className="bg-white"
          onChange={(e) => setDestination(e.target.value)}
        />
      </div>
    </div>
  );
};

export default Search;
