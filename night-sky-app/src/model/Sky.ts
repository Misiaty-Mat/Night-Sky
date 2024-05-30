import { Constellation } from "./Constellation";

export enum MoonPhase {
    New = 'new',
    Waxing_Crescent = 'waxing crescent',
    First_Quarter = 'first quarter',
    Waxing_Gibbous = 'waxing gibbous',
    Full = 'full',
    Waning_Gibbous = 'waning gibbous',
    Third_Quarter = 'third quarter',
    Waning_Crescent = 'waning crescent'
}

export enum RainType {
    Snow = 'snow',
    Drizzle = 'drizzle',
    Heavy = 'heavy',
    None = 'none'
}

export type Sky = {
    id?: number;
    cloudLevel: number;
    moonPhase: MoonPhase
    rainType: RainType
    fogLevel: number
    constellations?: Constellation[]
}