import { filterOptions } from "@/config";
import React, { Fragment } from "react";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { Separator } from "../ui/separator";

const ProductFilter = ({ filters, handleFilter }) => {
  return (
    <div className="bg-background rounded-lg shadow-sm">
      <div className="p-4 border-b">
        <h2 className="text-lg font-bold">Filter</h2>
      </div>
      <div className="p-4 space-y-4">
        {Object.keys(filterOptions)?.map((keyItem, i) => (
          <Fragment key={i}>
            <div>
              <h3 className="text-base font-medium">
                {keyItem.charAt(0).toUpperCase() +
                  keyItem.slice(1).toLowerCase()}
              </h3>
              <div className="grid gap-2 mt-2">
                {filterOptions[keyItem].map((option, index) => (
                  <Label
                    key={`${keyItem}-${option._id || index}`}
                    className="flex items-center gap-2 font-normal"
                  >
                    <Checkbox
                      checked={
                        filters &&
                        Object.keys(filters).length > 0 &&
                        filters[keyItem] &&
                        filters[keyItem].indexOf(option.id) > -1
                      }
                      onCheckedChange={() => handleFilter(keyItem, option.id)}
                    />
                    {option.label}
                  </Label>
                ))}
              </div>
            </div>
            <Separator />
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default ProductFilter;
