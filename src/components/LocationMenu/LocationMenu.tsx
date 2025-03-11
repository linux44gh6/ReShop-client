import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { locations } from "@/Constans/location";

  
interface LocationMenuProps {
    setLocation: (location: string) => void;
}
const LocationMenu: React.FC<LocationMenuProps> = ({ setLocation }) => {
    return (
        <div>
            <Select onValueChange={(e) => setLocation(e)}>
                <SelectTrigger className="w-[280px] rounded-full">
                    <SelectValue placeholder="Choose a location" />
                </SelectTrigger>
                <SelectContent>
                    {
                        locations.map((location, idx) => (
                            <SelectItem key={idx} value={location.district}>
                                {location.district}  
                            </SelectItem>
                        ))}


                </SelectContent>
            </Select>



        </div>
    );
};

export default LocationMenu;