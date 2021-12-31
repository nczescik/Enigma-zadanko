export interface Vehicle {
    id: string;
    location: Location;
    name: string;
    status: Status;
    type: Type;
    platesNumber: string;
    color: string;
    rangeKm: number;
    batteryLevelPct: number;
}

export interface Location {
    latitude: number;
    longitude: number;
}

export enum Status {
    AVAILABLE = 'AVAILABLE',
    NOT_AVAILABLE = 'NOT AVAILABLE'
}

export enum Type {
    CAR = 'CAR',
    TRUCK = 'TRUCK'
}