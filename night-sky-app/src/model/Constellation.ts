import { Star } from "./Star";

export type Constellation = {
    id?: number;
    name: string
    description: string;
    imgLink: string;
    skyId: string;
    stars?: Star[]
}