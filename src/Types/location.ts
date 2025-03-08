export interface ILocation  {
    division: string;
    districts: {
        district: string;
        upazilas: string[];
    }[];
}