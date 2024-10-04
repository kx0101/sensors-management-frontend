export default {
    "scalars": [
        1,
        2,
        3,
        5,
        15,
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
        89,
        90,
        91
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
            "sensors": [
                19
            ],
            "sensor": [
                19,
                {
                    "location": [
                        1,
                        "String!"
                    ]
                }
            ],
            "getSensorByAddressAndId": [
                19,
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
                19,
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
            "getSensorsByBatch": [
                19,
                {
                    "inputs": [
                        22,
                        "[SensorBatchInput!]!"
                    ]
                }
            ],
            "users": [
                23
            ],
            "user": [
                23,
                {
                    "user": [
                        24,
                        "UserInput!"
                    ]
                }
            ],
            "userByUsername": [
                23,
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
                19,
                {
                    "sensorInput": [
                        20,
                        "SensorCreate!"
                    ]
                }
            ],
            "updateSensor": [
                19,
                {
                    "sensorInput": [
                        21,
                        "SensorUpdate!"
                    ]
                }
            ],
            "deleteSensor": [
                19,
                {
                    "_id": [
                        5,
                        "ID!"
                    ]
                }
            ],
            "updateStatusSensor": [
                19,
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
                1
            ]
        },
        "ID": {},
        "Alarm": {
            "_id": [
                5
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
                3
            ],
            "createdAt": [
                27
            ],
            "updatedAt": [
                27
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
                5
            ],
            "aknowledged": [
                3
            ],
            "__typename": [
                1
            ]
        },
        "SensorID": {
            "sensor": [
                5
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
            "timeoutCreated": [
                18
            ],
            "__typename": [
                1
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
                1
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
                1
            ]
        },
        "Entry": {
            "_id": [
                5
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
                27
            ],
            "createdAt": [
                27
            ],
            "updatedAt": [
                27
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
        "timeoutData": {
            "sensor_id": [
                1
            ],
            "timeout": [
                27
            ],
            "__typename": [
                1
            ]
        },
        "Sensor": {
            "_id": [
                5
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
                3
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
                3
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
                5
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
                3
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
        "SensorBatchInput": {
            "address": [
                1
            ],
            "sensor_id": [
                2
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