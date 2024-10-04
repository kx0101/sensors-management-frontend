// @ts-nocheck
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type Scalars = {
    Int: number,
    String: string,
    Boolean: boolean,
    ID: string,
    Float: number,
    Date: any,
    Time: any,
    DateTime: any,
    DateTimeISO: any,
    Timestamp: any,
    TimeZone: any,
    UtcOffset: any,
    Duration: any,
    ISO8601Duration: any,
    LocalDate: any,
    LocalTime: any,
    LocalDateTime: any,
    LocalEndTime: any,
    EmailAddress: any,
    NegativeFloat: any,
    NegativeInt: any,
    NonEmptyString: any,
    NonNegativeFloat: any,
    NonNegativeInt: any,
    NonPositiveFloat: any,
    NonPositiveInt: any,
    PhoneNumber: any,
    PositiveFloat: any,
    PositiveInt: any,
    PostalCode: any,
    UnsignedFloat: any,
    UnsignedInt: any,
    URL: any,
    BigInt: any,
    Long: any,
    Byte: any,
    UUID: any,
    GUID: any,
    Hexadecimal: any,
    HexColorCode: any,
    HSL: any,
    HSLA: any,
    IP: any,
    IPv4: any,
    IPv6: any,
    ISBN: any,
    JWT: any,
    Latitude: any,
    Longitude: any,
    MAC: any,
    Port: any,
    RGB: any,
    RGBA: any,
    SafeInt: any,
    USCurrency: any,
    Currency: any,
    JSON: any,
    JSONObject: any,
    IBAN: any,
    ObjectID: any,
    Void: any,
    DID: any,
    CountryCode: any,
    Locale: any,
    RoutingNumber: any,
    AccountNumber: any,
    Cuid: any,
    SemVer: any,
    SESSN: any,
    DeweyDecimal: any,
    LCCSubclass: any,
    IPCPatent: any,
}

export interface Query {
    alarms: ((Alarm | null)[] | null)
    alarm: ((Alarm | null)[] | null)
    getAlarmByAddressAndId: (Alarm | null)
    getAlarmsByAknowledged: ((Alarm | null)[] | null)
    bell: (Bell | null)
    entries: ((Entry | null)[] | null)
    sensors: ((Sensor | null)[] | null)
    sensor: (Sensor | null)
    getSensorByAddressAndId: (Sensor | null)
    getSensorsByBuilding: ((Sensor | null)[] | null)
    getSensorUniqueBuildings: ((Scalars['String'] | null)[] | null)
    getSensorsByBatch: Sensor[]
    users: ((User | null)[] | null)
    user: (User | null)
    userByUsername: (User | null)
    __typename: 'Query'
}

export interface Mutation {
    createAlarm: (Alarm | null)
    updateAlarm: (Alarm | null)
    deleteAlarms: (Scalars['String'] | null)
    updateBell: (Bell | null)
    createEntry: (Entry | null)
    deleteEntries: (Scalars['String'] | null)
    createSensor: (Sensor | null)
    updateSensor: (Sensor | null)
    deleteSensor: (Sensor | null)
    updateStatusSensor: (Sensor | null)
    __typename: 'Mutation'
}

export interface Alarm {
    _id: Scalars['ID']
    address: Scalars['String']
    sensor: Scalars['Int']
    reason: (Scalars['String'] | null)
    aknowledged: (Scalars['Boolean'] | null)
    createdAt: (Scalars['DateTime'] | null)
    updatedAt: (Scalars['DateTime'] | null)
    __typename: 'Alarm'
}

export interface Subscription {
    alarmCreated: (Alarm | null)
    entryCreated: (Entry | null)
    timeoutCreated: (timeoutData | null)
    __typename: 'Subscription'
}

export interface Bell {
    _id: Scalars['ID']
    status: Scalars['Boolean']
    __typename: 'Bell'
}

export interface Entry {
    _id: Scalars['ID']
    address: Scalars['String']
    sensor: Scalars['Int']
    value: Scalars['Float']
    expireAt: (Scalars['DateTime'] | null)
    createdAt: (Scalars['DateTime'] | null)
    updatedAt: (Scalars['DateTime'] | null)
    __typename: 'Entry'
}

export interface timeoutData {
    sensor_id: Scalars['String']
    timeout: (Scalars['DateTime'] | null)
    __typename: 'timeoutData'
}

export interface Sensor {
    _id: Scalars['ID']
    name: Scalars['String']
    description: (Scalars['String'] | null)
    address: Scalars['String']
    location: Scalars['String']
    type: Scalars['String']
    sensor_id: Scalars['Int']
    unit: (Scalars['String'] | null)
    status: (Scalars['Boolean'] | null)
    building: (Scalars['String'] | null)
    up_limit: (Scalars['Float'] | null)
    down_limit: (Scalars['Float'] | null)
    __typename: 'Sensor'
}

export interface User {
    id: (Scalars['String'] | null)
    username: (Scalars['String'] | null)
    role: (Scalars['String'] | null)
    __typename: 'User'
}

export interface QueryGenqlSelection{
    alarms?: (AlarmGenqlSelection & { __args?: {limit?: (Scalars['Int'] | null), offset?: (Scalars['Int'] | null)} })
    alarm?: (AlarmGenqlSelection & { __args: {sensor: SensorInput} })
    getAlarmByAddressAndId?: (AlarmGenqlSelection & { __args: {address: Scalars['String'], sensor: Scalars['Int']} })
    getAlarmsByAknowledged?: (AlarmGenqlSelection & { __args?: {aknowledged?: (Scalars['Boolean'] | null)} })
    bell?: BellGenqlSelection
    entries?: (EntryGenqlSelection & { __args: {sensor: EntryID} })
    sensors?: SensorGenqlSelection
    sensor?: (SensorGenqlSelection & { __args: {location: Scalars['String']} })
    getSensorByAddressAndId?: (SensorGenqlSelection & { __args: {address: Scalars['String'], sensor_id: Scalars['Int']} })
    getSensorsByBuilding?: (SensorGenqlSelection & { __args: {building: Scalars['String']} })
    getSensorUniqueBuildings?: boolean | number
    getSensorsByBatch?: (SensorGenqlSelection & { __args: {inputs: SensorBatchInput[]} })
    users?: UserGenqlSelection
    user?: (UserGenqlSelection & { __args: {user: UserInput} })
    userByUsername?: (UserGenqlSelection & { __args: {username: Scalars['String']} })
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface MutationGenqlSelection{
    createAlarm?: (AlarmGenqlSelection & { __args: {alarmInput: AlarmCreate} })
    updateAlarm?: (AlarmGenqlSelection & { __args: {alarmInput: AlarmUpdate} })
    deleteAlarms?: { __args: {period: SensorID} }
    updateBell?: (BellGenqlSelection & { __args: {bellInput: BellUpdate} })
    createEntry?: (EntryGenqlSelection & { __args: {entryInput: EntryCreate} })
    deleteEntries?: { __args: {entryInput: EntryID} }
    createSensor?: (SensorGenqlSelection & { __args: {sensorInput: SensorCreate} })
    updateSensor?: (SensorGenqlSelection & { __args: {sensorInput: SensorUpdate} })
    deleteSensor?: (SensorGenqlSelection & { __args: {_id: Scalars['ID']} })
    updateStatusSensor?: (SensorGenqlSelection & { __args: {_id: Scalars['ID'], status: Scalars['Boolean']} })
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface AlarmGenqlSelection{
    _id?: boolean | number
    address?: boolean | number
    sensor?: boolean | number
    reason?: boolean | number
    aknowledged?: boolean | number
    createdAt?: boolean | number
    updatedAt?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface SensorInput {address: Scalars['String'],id: Scalars['Int']}

export interface AlarmCreate {address: Scalars['String'],sensor: Scalars['Int'],reason: Scalars['String']}

export interface AlarmUpdate {_id: Scalars['ID'],aknowledged?: (Scalars['Boolean'] | null)}

export interface SensorID {sensor: Scalars['ID']}

export interface SubscriptionGenqlSelection{
    alarmCreated?: AlarmGenqlSelection
    entryCreated?: EntryGenqlSelection
    timeoutCreated?: timeoutDataGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface BellGenqlSelection{
    _id?: boolean | number
    status?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface BellUpdate {_id: Scalars['ID'],status?: (Scalars['Boolean'] | null)}

export interface EntryGenqlSelection{
    _id?: boolean | number
    address?: boolean | number
    sensor?: boolean | number
    value?: boolean | number
    expireAt?: boolean | number
    createdAt?: boolean | number
    updatedAt?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface EntryID {address: Scalars['String'],sensor: Scalars['Int'],period: Scalars['Int']}

export interface EntryCreate {address: Scalars['String'],sensor: Scalars['Int'],value: Scalars['Float']}

export interface timeoutDataGenqlSelection{
    sensor_id?: boolean | number
    timeout?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface SensorGenqlSelection{
    _id?: boolean | number
    name?: boolean | number
    description?: boolean | number
    address?: boolean | number
    location?: boolean | number
    type?: boolean | number
    sensor_id?: boolean | number
    unit?: boolean | number
    status?: boolean | number
    building?: boolean | number
    up_limit?: boolean | number
    down_limit?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface SensorCreate {name: Scalars['String'],description?: (Scalars['String'] | null),address: Scalars['String'],location: Scalars['String'],type: Scalars['String'],sensor_id: Scalars['Int'],unit?: (Scalars['String'] | null),status?: (Scalars['Boolean'] | null),building?: (Scalars['String'] | null),up_limit?: (Scalars['Float'] | null),down_limit?: (Scalars['Float'] | null)}

export interface SensorUpdate {_id: Scalars['ID'],name?: (Scalars['String'] | null),description?: (Scalars['String'] | null),address?: (Scalars['String'] | null),location?: (Scalars['String'] | null),type?: (Scalars['String'] | null),sensor_id?: (Scalars['Int'] | null),unit?: (Scalars['String'] | null),status?: (Scalars['Boolean'] | null),building?: (Scalars['String'] | null),up_limit?: (Scalars['Float'] | null),down_limit?: (Scalars['Float'] | null)}

export interface SensorBatchInput {address: Scalars['String'],sensor_id: Scalars['Int']}

export interface UserGenqlSelection{
    id?: boolean | number
    username?: boolean | number
    role?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface UserInput {id: Scalars['String']}


    const Query_possibleTypes: string[] = ['Query']
    export const isQuery = (obj?: { __typename?: any } | null): obj is Query => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isQuery"')
      return Query_possibleTypes.includes(obj.__typename)
    }
    


    const Mutation_possibleTypes: string[] = ['Mutation']
    export const isMutation = (obj?: { __typename?: any } | null): obj is Mutation => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isMutation"')
      return Mutation_possibleTypes.includes(obj.__typename)
    }
    


    const Alarm_possibleTypes: string[] = ['Alarm']
    export const isAlarm = (obj?: { __typename?: any } | null): obj is Alarm => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isAlarm"')
      return Alarm_possibleTypes.includes(obj.__typename)
    }
    


    const Subscription_possibleTypes: string[] = ['Subscription']
    export const isSubscription = (obj?: { __typename?: any } | null): obj is Subscription => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isSubscription"')
      return Subscription_possibleTypes.includes(obj.__typename)
    }
    


    const Bell_possibleTypes: string[] = ['Bell']
    export const isBell = (obj?: { __typename?: any } | null): obj is Bell => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isBell"')
      return Bell_possibleTypes.includes(obj.__typename)
    }
    


    const Entry_possibleTypes: string[] = ['Entry']
    export const isEntry = (obj?: { __typename?: any } | null): obj is Entry => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isEntry"')
      return Entry_possibleTypes.includes(obj.__typename)
    }
    


    const timeoutData_possibleTypes: string[] = ['timeoutData']
    export const istimeoutData = (obj?: { __typename?: any } | null): obj is timeoutData => {
      if (!obj?.__typename) throw new Error('__typename is missing in "istimeoutData"')
      return timeoutData_possibleTypes.includes(obj.__typename)
    }
    


    const Sensor_possibleTypes: string[] = ['Sensor']
    export const isSensor = (obj?: { __typename?: any } | null): obj is Sensor => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isSensor"')
      return Sensor_possibleTypes.includes(obj.__typename)
    }
    


    const User_possibleTypes: string[] = ['User']
    export const isUser = (obj?: { __typename?: any } | null): obj is User => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isUser"')
      return User_possibleTypes.includes(obj.__typename)
    }
    