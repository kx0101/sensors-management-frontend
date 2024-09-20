export default {
    "scalars": [
        1,
        3,
        5,
        6,
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
                4
            ],
            "alarm": [
                4,
                {
                    "sensor": [
                        7,
                        "SensorInput!"
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
        "Mutation": {
            "createAlarm": [
                4,
                {
                    "alarmInput": [
                        8,
                        "AlarmCreate!"
                    ]
                }
            ],
            "updateAlarm": [
                4,
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
                        3,
                        "ID!"
                    ]
                }
            ],
            "__typename": [
                1
            ]
        },
        "ID": {},
        "Alarm": {
            "_id": [
                3
            ],
            "address": [
                1
            ],
            "sensor": [
                5
            ],
            "reason": [
                1
            ],
            "aknowledged": [
                6
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
        "Int": {},
        "Boolean": {},
        "SensorInput": {
            "address": [
                1
            ],
            "id": [
                5
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
                5
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
                3
            ],
            "aknowledged": [
                6
            ],
            "__typename": [
                1
            ]
        },
        "SensorID": {
            "sensor": [
                3
            ],
            "__typename": [
                1
            ]
        },
        "Subscription": {
            "alarmCreated": [
                4
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
                3
            ],
            "status": [
                6
            ],
            "__typename": [
                1
            ]
        },
        "BellUpdate": {
            "_id": [
                3
            ],
            "status": [
                6
            ],
            "__typename": [
                1
            ]
        },
        "Entry": {
            "_id": [
                3
            ],
            "address": [
                1
            ],
            "sensor": [
                5
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
                5
            ],
            "period": [
                5
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
                5
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
                3
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
                5
            ],
            "unit": [
                1
            ],
            "status": [
                6
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
                5
            ],
            "unit": [
                1
            ],
            "status": [
                6
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
                3
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
                5
            ],
            "unit": [
                1
            ],
            "status": [
                6
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