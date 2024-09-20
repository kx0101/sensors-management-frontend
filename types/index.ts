export interface ISensor {
    _id: string
    name: string
    description: string
    address: string
    location: string
    type: string
    sensor_id: number
    unit: string
    status: boolean
    building: string
    up_limit: number
    down_limit: number
}

export interface IAlarm {
    _id: string
    address: string
    sensor: number
    reason: string
    aknowledged: boolean
    createdAt: string
    updatedAt: string
}

export interface IData {
    address: string;
    type: number;
    order: number;
    id: number;
    value: number;
}

export interface IAGPT {
    _id: string
    address: string
    sensor: number
    value: number
    expireAt: string
    createdAt: number;
    updatedAt: number;

}

export interface IEntry {
    _id: string
    address: string
    sensor: number
    value: number
    expireAt: string
    createdAt: number;
    updatedAt: number;
}

export interface IBell {
    _id: string
    status: boolean
}

export interface IUser {
    _id: string
    username: string
    password: string
    role: string
}

export interface Itoken {
    name: string,
    sub: string,
    id: string,
    role: string,
    iat: Date,
    exp: Date,
    jti: string
}
