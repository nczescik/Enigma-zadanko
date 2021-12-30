export interface Vehicle {
    location: Location;
    name: string;
    status: Status;
    type: Type;
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