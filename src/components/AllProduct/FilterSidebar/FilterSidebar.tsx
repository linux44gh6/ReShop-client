"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useEffect } from "react";

interface FilterSidebarProps {
  selectedProductTypes: string;
  setSelectedProductTypes: React.Dispatch<React.SetStateAction<string>>;
}

const FilterSidebar = ({
  selectedProductTypes,
  setSelectedProductTypes,
}: FilterSidebarProps) => {
  const productTypes = [
    "Laptop & Accessories",
    "Computers Pc",
    "Speakers & Headset",
    "Keyboards & Mouse",
    "Camera",
    "Video Recording",
    "Tablet",
    "Table Lights",
  ];

  const brands = ["HP", "Apple", "Dell", "Asus", "Canon"];
  const ratings = [5, 4, 3, 2, 1];
  const availability = ["In Stock", "Pre Order", "Upcoming"];

  const toggleProductType = (type: string) => {
    setSelectedProductTypes(type);
  };

  useEffect(() => {
    console.log("Selected Filters:", selectedProductTypes);
  }, [selectedProductTypes]);

  return (
    <Card className="p-4 rounded-2xl shadow-md w-72">
      <CardContent>
        <h2 className="text-lg font-semibold">Product Types</h2>
        <ul className="space-y-2 mt-2">
          {productTypes.map((type) => (
            <li key={type} className="flex items-center gap-2">
              <Checkbox
                checked={selectedProductTypes === type}
                onCheckedChange={() => toggleProductType(type)}
              />
              <span>{type}</span>
            </li>
          ))}
        </ul>

        <h2 className="text-lg font-semibold mt-6">Brands</h2>
        <ul className="space-y-2 mt-2">
          {brands.map((brand) => (
            <li key={brand} className="flex items-center gap-2">
              <Checkbox />
              <span>{brand}</span>
            </li>
          ))}
        </ul>

        <h2 className="text-lg font-semibold mt-6">Rating</h2>
        <ul className="space-y-2 mt-2">
          {ratings.map((rating) => (
            <li key={rating} className="flex items-center gap-2">
              <Checkbox />
              <span className="text-yellow-500">
                {"★".repeat(rating)}
                {"☆".repeat(5 - rating)}
              </span>
            </li>
          ))}
        </ul>

        <h2 className="text-lg font-semibold mt-6">Availability</h2>
        <ul className="space-y-2 mt-2">
          {availability.map((status) => (
            <li key={status} className="flex items-center gap-2">
              <Checkbox />
              <span>{status}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default FilterSidebar;
