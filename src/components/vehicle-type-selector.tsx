"use client";

import { cn } from "@/lib/utils";
import { Car, Truck, Bus } from "lucide-react";

interface VehicleTypeSelectorProps {
  selected: "cars" | "tempo" | "bus";
  onSelect: (type: "cars" | "tempo" | "bus") => void;
}

export default function VehicleTypeSelector({
  selected,
  onSelect,
}: VehicleTypeSelectorProps) {
  return (
    <div className="inline-flex rounded-lg border p-1 bg-white">
      <button
        onClick={() => onSelect("cars")}
        className={cn(
          "inline-flex items-center gap-2 px-4 py-2 rounded-md transition-all",
          selected === "cars" ? "bg-green-600 text-white" : "hover:bg-gray-100"
        )}
      >
        <Car className="h-5 w-5" />
        Cars
      </button>
      <button
        onClick={() => onSelect("tempo")}
        className={cn(
          "inline-flex items-center gap-2 px-4 py-2 rounded-md transition-all",
          selected === "tempo" ? "bg-green-600 text-white" : "hover:bg-gray-100"
        )}
      >
        <Truck className="h-5 w-5" />
        Tempo/Travellers
      </button>
      <button
        onClick={() => onSelect("bus")}
        className={cn(
          "inline-flex items-center gap-2 px-4 py-2 rounded-md transition-all",
          selected === "bus" ? "bg-green-600 text-white" : "hover:bg-gray-100"
        )}
      >
        <Bus className="h-5 w-5" />
        Bus
      </button>
    </div>
  );
}
