import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Location } from "@/lib/location-data";

interface LocationSearchProps {
  locations: Location[];
  placeholder: string;
  value?: string;
  onChange: (value: string) => void;
  label?: string;
}

export function LocationSearch({
  locations,
  placeholder,
  value,
  onChange,
  label,
}: LocationSearchProps) {
  const [open, setOpen] = React.useState(false);

  const selectedLocation = locations.find((loc) => loc.id === value);

  return (
    <div className="flex-1">
      {label && <label className="text-xs text-gray-500 block mb-1">{label}</label>}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between bg-transparent border-none p-0 h-auto font-medium hover:bg-transparent"
          >
            <span className="truncate">
              {selectedLocation
                ? `${selectedLocation.city} (${selectedLocation.code || selectedLocation.name})`
                : placeholder}
            </span>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[300px] p-0">
          <Command>
            <CommandInput placeholder={`Search ${placeholder.toLowerCase()}...`} />
            <CommandList>
              <CommandEmpty>No location found.</CommandEmpty>
              <CommandGroup>
                {locations.map((loc) => (
                  <CommandItem
                    key={loc.id}
                    value={loc.id}
                    onSelect={(currentValue) => {
                      onChange(currentValue === value ? "" : currentValue);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn("mr-2 h-4 w-4", value === loc.id ? "opacity-100" : "opacity-0")}
                    />
                    <div className="flex flex-col">
                      <span>
                        {loc.city} ({loc.code || loc.name})
                      </span>
                      <span className="text-xs text-muted-foreground">{loc.name}</span>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
