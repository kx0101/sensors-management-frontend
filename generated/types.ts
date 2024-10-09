export default {
    "scalars": [
        1,
        2,
        3,
        5,
        15,
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
        89,
        90,
        91,
        92
    ],
    "types": {
        "Query": {
            "alarms": [
                6,
                {
                    "limit": [
                        1
                    ],
                    "offset": [
                        1
                    ]
                }
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
                        2,
                        "String!"
                    ],
                    "sensor": [
                        1,
                        "Int!"
                    ]
                }
            ],
            "getAlarmsByAknowledged": [
                6,
                {
                    "aknowledged": [
                        3
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
            "entry": [
                14,
                {
                    "sensorAddress": [
                        2,
                        "String!"
                    ],
                    "sensorId": [
                        1,
                        "Int!"
                    ]
                }
            ],
            "sensors": [
                20
            ],
            "sensor": [
                20,
                {
                    "location": [
                        2,
                        "String!"
                    ]
                }
            ],
            "getSensorByAddressAndId": [
                20,
                {
                    "address": [
                        2,
                        "String!"
                    ],
                    "sensor_id": [
                        1,
                        "Int!"
                    ]
                }
            ],
            "getSensorsByBuilding": [
                20,
                {
                    "building": [
                        2,
                        "String!"
                    ]
                }
            ],
            "getSensorUniqueBuildings": [
                2
            ],
            "getSensorsByBatch": [
                20,
                {
                    "inputs": [
                        23,
                        "[SensorBatchInput!]!"
                    ]
                }
            ],
            "getSensorEntriesLast24Hours": [
                19,
                {
                    "sensors": [
                        23,
                        "[SensorBatchInput!]!"
                    ]
                }
            ],
            "users": [
                24
            ],
            "user": [
                24,
                {
                    "user": [
                        25,
                        "UserInput!"
                    ]
                }
            ],
            "userByUsername": [
                24,
                {
                    "username": [
                        2,
                        "String!"
                    ]
                }
            ],
            "__typename": [
                2
            ]
        },
        "Int": {},
        "String": {},
        "Boolean": {},
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
                2,
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
                2,
                {
                    "entryInput": [
                        16,
                        "EntryID!"
                    ]
                }
            ],
            "createSensor": [
                20,
                {
                    "sensorInput": [
                        21,
                        "SensorCreate!"
                    ]
                }
            ],
            "updateSensor": [
                20,
                {
                    "sensorInput": [
                        22,
                        "SensorUpdate!"
                    ]
                }
            ],
            "deleteSensor": [
                20,
                {
                    "_id": [
                        5,
                        "ID!"
                    ]
                }
            ],
            "updateStatusSensor": [
                20,
                {
                    "_id": [
                        5,
                        "ID!"
                    ],
                    "status": [
                        3,
                        "Boolean!"
                    ]
                }
            ],
            "__typename": [
                2
            ]
        },
        "ID": {},
        "Alarm": {
            "_id": [
                5
            ],
            "address": [
                2
            ],
            "sensor": [
                1
            ],
            "reason": [
                2
            ],
            "aknowledged": [
                3
            ],
            "createdAt": [
                28
            ],
            "updatedAt": [
                28
            ],
            "__typename": [
                2
            ]
        },
        "SensorInput": {
            "address": [
                2
            ],
            "id": [
                1
            ],
            "__typename": [
                2
            ]
        },
        "AlarmCreate": {
            "address": [
                2
            ],
            "sensor": [
                1
            ],
            "reason": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "AlarmUpdate": {
            "_id": [
                5
            ],
            "aknowledged": [
                3
            ],
            "__typename": [
                2
            ]
        },
        "SensorID": {
            "sensor": [
                5
            ],
            "__typename": [
                2
            ]
        },
        "Subscription": {
            "alarmCreated": [
                6
            ],
            "entryCreated": [
                14
            ],
            "timeoutCreated": [
                18
            ],
            "__typename": [
                2
            ]
        },
        "Bell": {
            "_id": [
                5
            ],
            "status": [
                3
            ],
            "__typename": [
                2
            ]
        },
        "BellUpdate": {
            "_id": [
                5
            ],
            "status": [
                3
            ],
            "__typename": [
                2
            ]
        },
        "Entry": {
            "_id": [
                5
            ],
            "address": [
                2
            ],
            "sensor": [
                1
            ],
            "value": [
                15
            ],
            "expireAt": [
                28
            ],
            "createdAt": [
                28
            ],
            "updatedAt": [
                28
            ],
            "__typename": [
                2
            ]
        },
        "Float": {},
        "EntryID": {
            "address": [
                2
            ],
            "sensor": [
                1
            ],
            "period": [
                1
            ],
            "__typename": [
                2
            ]
        },
        "EntryCreate": {
            "address": [
                2
            ],
            "sensor": [
                1
            ],
            "value": [
                15
            ],
            "__typename": [
                2
            ]
        },
        "timeoutData": {
            "sensor_id": [
                2
            ],
            "timeout": [
                28
            ],
            "__typename": [
                2
            ]
        },
        "AverageEntry": {
            "sensorId": [
                1
            ],
            "averages": [
                15
            ],
            "address": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "Sensor": {
            "_id": [
                5
            ],
            "name": [
                2
            ],
            "description": [
                2
            ],
            "address": [
                2
            ],
            "location": [
                2
            ],
            "type": [
                2
            ],
            "sensor_id": [
                1
            ],
            "unit": [
                2
            ],
            "status": [
                3
            ],
            "building": [
                2
            ],
            "up_limit": [
                15
            ],
            "down_limit": [
                15
            ],
            "__typename": [
                2
            ]
        },
        "SensorCreate": {
            "name": [
                2
            ],
            "description": [
                2
            ],
            "address": [
                2
            ],
            "location": [
                2
            ],
            "type": [
                2
            ],
            "sensor_id": [
                1
            ],
            "unit": [
                2
            ],
            "status": [
                3
            ],
            "building": [
                2
            ],
            "up_limit": [
                15
            ],
            "down_limit": [
                15
            ],
            "__typename": [
                2
            ]
        },
        "SensorUpdate": {
            "_id": [
                5
            ],
            "name": [
                2
            ],
            "description": [
                2
            ],
            "address": [
                2
            ],
            "location": [
                2
            ],
            "type": [
                2
            ],
            "sensor_id": [
                1
            ],
            "unit": [
                2
            ],
            "status": [
                3
            ],
            "building": [
                2
            ],
            "up_limit": [
                15
            ],
            "down_limit": [
                15
            ],
            "__typename": [
                2
            ]
        },
        "SensorBatchInput": {
            "address": [
                2
            ],
            "sensor_id": [
                1
            ],
            "__typename": [
                2
            ]
        },
        "User": {
            "id": [
                2
            ],
            "username": [
                2
            ],
            "role": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "UserInput": {
            "id": [
                2
            ],
            "__typename": [
                2
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