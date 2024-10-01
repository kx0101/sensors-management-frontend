export default {
    "scalars": [
        1,
        2,
        4,
        5,
        15,
        23,
        24,
        25,
        26,
        27,
        28,
        29,
        30,
        31,
        32,
        33,
        34,
        35,
        36,
        37,
        38,
        39,
        40,
        41,
        42,
        43,
        44,
        45,
        46,
        47,
        48,
        49,
        50,
        51,
        52,
        53,
        54,
        55,
        56,
        57,
        58,
        59,
        60,
        61,
        62,
        63,
        64,
        65,
        66,
        67,
        68,
        69,
        70,
        71,
        72,
        73,
        74,
        75,
        76,
        77,
        78,
        79,
        80,
        81,
        82,
        83,
        84,
        85,
        86,
        87,
        88,
        89
    ],
    "types": {
        "Query": {
            "alarms": [
                6
            ],
            "alarm": [
                6,
                {
                    "sensor": [
                        7,
                        "SensorInput!"
                    ]
                }
            ],
            "getAlarmByAddressAndId": [
                6,
                {
                    "address": [
                        1,
                        "String!"
                    ],
                    "sensor": [
                        2,
                        "Int!"
                    ]
                }
            ],
            "bell": [
                12
            ],
            "entries": [
                14,
                {
                    "sensor": [
                        16,
                        "EntryID!"
                    ]
                }
            ],
            "sensors": [
                18
            ],
            "sensor": [
                18,
                {
                    "location": [
                        1,
                        "String!"
                    ]
                }
            ],
            "getSensorByAddressAndId": [
                18,
                {
                    "address": [
                        1,
                        "String!"
                    ],
                    "sensor_id": [
                        2,
                        "Int!"
                    ]
                }
            ],
            "getSensorsByBuilding": [
                18,
                {
                    "building": [
                        1,
                        "String!"
                    ]
                }
            ],
            "getSensorUniqueBuildings": [
                1
            ],
            "users": [
                21
            ],
            "user": [
                21,
                {
                    "user": [
                        22,
                        "UserInput!"
                    ]
                }
            ],
            "userByUsername": [
                21,
                {
                    "username": [
                        1,
                        "String!"
                    ]
                }
            ],
            "__typename": [
                1
            ]
        },
        "String": {},
        "Int": {},
        "Mutation": {
            "createAlarm": [
                6,
                {
                    "alarmInput": [
                        8,
                        "AlarmCreate!"
                    ]
                }
            ],
            "updateAlarm": [
                6,
                {
                    "alarmInput": [
                        9,
                        "AlarmUpdate!"
                    ]
                }
            ],
            "deleteAlarms": [
                1,
                {
                    "period": [
                        10,
                        "SensorID!"
                    ]
                }
            ],
            "updateBell": [
                12,
                {
                    "bellInput": [
                        13,
                        "BellUpdate!"
                    ]
                }
            ],
            "createEntry": [
                14,
                {
                    "entryInput": [
                        17,
                        "EntryCreate!"
                    ]
                }
            ],
            "deleteEntries": [
                1,
                {
                    "entryInput": [
                        16,
                        "EntryID!"
                    ]
                }
            ],
            "createSensor": [
                18,
                {
                    "sensorInput": [
                        19,
                        "SensorCreate!"
                    ]
                }
            ],
            "updateSensor": [
                18,
                {
                    "sensorInput": [
                        20,
                        "SensorUpdate!"
                    ]
                }
            ],
            "deleteSensor": [
                18,
                {
                    "_id": [
                        4,
                        "ID!"
                    ]
                }
            ],
            "updateStatusSensor": [
                18,
                {
                    "_id": [
                        4,
                        "ID!"
                    ],
                    "status": [
                        5,
                        "Boolean!"
                    ]
                }
            ],
            "__typename": [
                1
            ]
        },
        "ID": {},
        "Boolean": {},
        "Alarm": {
            "_id": [
                4
            ],
            "address": [
                1
            ],
            "sensor": [
                2
            ],
            "reason": [
                1
            ],
            "aknowledged": [
                5
            ],
            "createdAt": [
                25
            ],
            "updatedAt": [
                25
            ],
            "__typename": [
                1
            ]
        },
        "SensorInput": {
            "address": [
                1
            ],
            "id": [
                2
            ],
            "__typename": [
                1
            ]
        },
        "AlarmCreate": {
            "address": [
                1
            ],
            "sensor": [
                2
            ],
            "reason": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "AlarmUpdate": {
            "_id": [
                4
            ],
            "aknowledged": [
                5
            ],
            "__typename": [
                1
            ]
        },
        "SensorID": {
            "sensor": [
                4
            ],
            "__typename": [
                1
            ]
        },
        "Subscription": {
            "alarmCreated": [
                6
            ],
            "entryCreated": [
                14
            ],
            "__typename": [
                1
            ]
        },
        "Bell": {
            "_id": [
                4
            ],
            "status": [
                5
            ],
            "__typename": [
                1
            ]
        },
        "BellUpdate": {
            "_id": [
                4
            ],
            "status": [
                5
            ],
            "__typename": [
                1
            ]
        },
        "Entry": {
            "_id": [
                4
            ],
            "address": [
                1
            ],
            "sensor": [
                2
            ],
            "value": [
                15
            ],
            "expireAt": [
                25
            ],
            "createdAt": [
                25
            ],
            "updatedAt": [
                25
            ],
            "__typename": [
                1
            ]
        },
        "Float": {},
        "EntryID": {
            "address": [
                1
            ],
            "sensor": [
                2
            ],
            "period": [
                2
            ],
            "__typename": [
                1
            ]
        },
        "EntryCreate": {
            "address": [
                1
            ],
            "sensor": [
                2
            ],
            "value": [
                15
            ],
            "__typename": [
                1
            ]
        },
        "Sensor": {
            "_id": [
                4
            ],
            "name": [
                1
            ],
            "description": [
                1
            ],
            "address": [
                1
            ],
            "location": [
                1
            ],
            "type": [
                1
            ],
            "sensor_id": [
                2
            ],
            "unit": [
                1
            ],
            "status": [
                5
            ],
            "building": [
                1
            ],
            "up_limit": [
                15
            ],
            "down_limit": [
                15
            ],
            "__typename": [
                1
            ]
        },
        "SensorCreate": {
            "name": [
                1
            ],
            "description": [
                1
            ],
            "address": [
                1
            ],
            "location": [
                1
            ],
            "type": [
                1
            ],
            "sensor_id": [
                2
            ],
            "unit": [
                1
            ],
            "status": [
                5
            ],
            "building": [
                1
            ],
            "up_limit": [
                15
            ],
            "down_limit": [
                15
            ],
            "__typename": [
                1
            ]
        },
        "SensorUpdate": {
            "_id": [
                4
            ],
            "name": [
                1
            ],
            "description": [
                1
            ],
            "address": [
                1
            ],
            "location": [
                1
            ],
            "type": [
                1
            ],
            "sensor_id": [
                2
            ],
            "unit": [
                1
            ],
            "status": [
                5
            ],
            "building": [
                1
            ],
            "up_limit": [
                15
            ],
            "down_limit": [
                15
            ],
            "__typename": [
                1
            ]
        },
        "User": {
            "id": [
                1
            ],
            "username": [
                1
            ],
            "role": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "UserInput": {
            "id": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "Date": {},
        "Time": {},
        "DateTime": {},
        "DateTimeISO": {},
        "Timestamp": {},
        "TimeZone": {},
        "UtcOffset": {},
        "Duration": {},
        "ISO8601Duration": {},
        "LocalDate": {},
        "LocalTime": {},
        "LocalDateTime": {},
        "LocalEndTime": {},
        "EmailAddress": {},
        "NegativeFloat": {},
        "NegativeInt": {},
        "NonEmptyString": {},
        "NonNegativeFloat": {},
        "NonNegativeInt": {},
        "NonPositiveFloat": {},
        "NonPositiveInt": {},
        "PhoneNumber": {},
        "PositiveFloat": {},
        "PositiveInt": {},
        "PostalCode": {},
        "UnsignedFloat": {},
        "UnsignedInt": {},
        "URL": {},
        "BigInt": {},
        "Long": {},
        "Byte": {},
        "UUID": {},
        "GUID": {},
        "Hexadecimal": {},
        "HexColorCode": {},
        "HSL": {},
        "HSLA": {},
        "IP": {},
        "IPv4": {},
        "IPv6": {},
        "ISBN": {},
        "JWT": {},
        "Latitude": {},
        "Longitude": {},
        "MAC": {},
        "Port": {},
        "RGB": {},
        "RGBA": {},
        "SafeInt": {},
        "USCurrency": {},
        "Currency": {},
        "JSON": {},
        "JSONObject": {},
        "IBAN": {},
        "ObjectID": {},
        "Void": {},
        "DID": {},
        "CountryCode": {},
        "Locale": {},
        "RoutingNumber": {},
        "AccountNumber": {},
        "Cuid": {},
        "SemVer": {},
        "SESSN": {},
        "DeweyDecimal": {},
        "LCCSubclass": {},
        "IPCPatent": {}
    }
}