"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { CalendarIcon, MapPin } from "lucide-react";
import { format } from "date-fns";
import VehicleTypeSelector from "./vehicle-type-selector";
import { UserDetailsModal } from "./user-details-modal";

export default function SearchForm() {
  const [vehicleType, setVehicleType] = useState<"cars" | "tempo" | "bus">(
    "cars"
  );
  const [pickupDate, setPickupDate] = useState<Date>();
  const [returnDate, setReturnDate] = useState<Date>();
  const [sameLocation, setSameLocation] = useState(true);
  const [age, setAge] = useState("26+");
  const [hasNegotiatedRate, setHasNegotiatedRate] = useState(false);
  const [location, setLocation] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [returnTime, setReturnTime] = useState("");
  const [country, setCountry] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [negotiatedRate, setNegotiatedRate] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    console.log(pickupDate, returnDate);
    e.preventDefault();
    setIsModalOpen(true);
  };

  return (
    <>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="w-full max-w-4xl mx-auto space-y-6 bg-white/80 backdrop-blur-md rounded-lg p-4 sm:p-6"
      >
        <VehicleTypeSelector
          selected={vehicleType}
          onSelect={(type) => setVehicleType(type as "cars" | "tempo" | "bus")}
        />

        <div className="grid gap-4 sm:gap-6">
          <div className="flex items-center gap-4">
            <Label htmlFor="location">Pick up & Return location</Label>
            <div className="flex items-center gap-2">
              <Switch
                checked={sameLocation}
                onCheckedChange={setSameLocation}
              />
              <span className="text-sm text-muted-foreground">
                Same return location
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  id="location"
                  placeholder="Enter a city or airport"
                  className="pl-10 w-full"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={`w-full justify-start text-left font-normal ${
                      !pickupDate ? "text-muted-foreground" : ""
                    }`}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {pickupDate ? (
                      format(pickupDate, "dd/MM/yyyy")
                    ) : (
                      <span>Pick date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={pickupDate}
                    onSelect={setPickupDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>

              <Select value={pickupTime} onValueChange={setPickupTime}>
                <SelectTrigger>
                  <SelectValue placeholder="Pick time" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 24 }).map((_, i) => (
                    <SelectItem key={i} value={`${i}:00`}>
                      {`${i}:00`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {!sameLocation && (
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    placeholder="Enter return location"
                    className="pl-10 w-full"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={`w-full justify-start text-left font-normal ${
                        !returnDate ? "text-muted-foreground" : ""
                      }`}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {returnDate ? (
                        format(returnDate, "dd/MM/yyyy")
                      ) : (
                        <span>Return date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={returnDate}
                      onSelect={setReturnDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>

                <Select value={returnTime} onValueChange={setReturnTime}>
                  <SelectTrigger>
                    <SelectValue placeholder="Return time" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 24 }).map((_, i) => (
                      <SelectItem key={i} value={`${i}:00`}>
                        {`${i}:00`}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_auto] gap-4 items-end">
            <div className="flex flex-col sm:flex-row gap-4">
              <Select value={age} onValueChange={setAge}>
                <SelectTrigger className="w-full sm:w-[200px]">
                  <SelectValue placeholder="Select age" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="18-25">18-25 years</SelectItem>
                  <SelectItem value="26+">26+ years</SelectItem>
                </SelectContent>
              </Select>

              {/* <Select value={country} onValueChange={setCountry}>
                <SelectTrigger className="w-full sm:w-[200px]">
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="in">India</SelectItem>
                  <SelectItem value="us">United States</SelectItem>
                  <SelectItem value="uk">United Kingdom</SelectItem>
                </SelectContent>
              </Select> */}
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-2">
              <div className="flex items-center gap-2">
                <Switch
                  checked={hasNegotiatedRate}
                  onCheckedChange={setHasNegotiatedRate}
                  id="negotiated-rate"
                />
                <Label htmlFor="negotiated-rate">
                  I have a negotiated rate
                </Label>
              </div>
              {hasNegotiatedRate && (
                <Input
                  type="text"
                  placeholder="Enter your rate"
                  value={negotiatedRate}
                  onChange={(e) => setNegotiatedRate(e.target.value)}
                  className="w-full sm:w-auto mt-2 sm:mt-0"
                />
              )}
            </div>

            <Button
              type="button"
              size="lg"
              className="w-full sm:w-auto bg-yellow-400 text-black hover:bg-yellow-500"
              onClick={handleSearch}
            >
              Search
            </Button>
          </div>
        </div>
      </form>

      <UserDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        searchDetails={{
          vehicleType,
          pickupDate,
          returnDate,
          sameLocation,
          age,
          hasNegotiatedRate,
          negotiatedRate,
          location,
          pickupTime,
          returnTime,
          country,
        }}
      />
    </>
  );
}
