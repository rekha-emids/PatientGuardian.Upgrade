export const SERVICE_CATEGORIES = {
    "requirementsState": {
      "requirementList": [
        {
          "serviceCategoryId": 1,
          "serviceCategoryDescription": "Activities of Daily Living"
        },
        {
          "serviceCategoryId": 2,
          "serviceCategoryDescription": "Help at Home"
        },
        {
          "serviceCategoryId": 3,
          "serviceCategoryDescription": "Groceries and Nutrition"
        },
        {
          "serviceCategoryId": 4,
          "serviceCategoryDescription": "Transportation"
        }
      ],
      "typeList": {
        "1": {
          "1": {
            "serviceTypeId": 1,
            "serviceTypeDescription": "Ambulation and Mobility",
            "serviceTask": [
              {
                "serviceTaskId": 1,
                "serviceTaskDescription": "Locate transfer devices",
                "serviceRequestTypeDetailsId": 0,
                "isDefault": true,
                "serviceTypeId": 1,
                "isByDefaultSelected": true
              },
              {
                "serviceTaskId": 2,
                "serviceTaskDescription": "Assist with transfer(s)",
                "serviceRequestTypeDetailsId": 0,
                "isDefault": true,
                "serviceTypeId": 1,
                "isByDefaultSelected": true
              }
            ],
            "taskCompleted": 0,
            "totalTask": 0,
            "selected": true
          },
          "2": {
            "serviceTypeId": 2,
            "serviceTypeDescription": "Bathing",
            "serviceTask": [
              {
                "serviceTaskId": 3,
                "serviceTaskDescription": "Prepare water and towels",
                "serviceRequestTypeDetailsId": 0,
                "isDefault": true,
                "serviceTypeId": 2,
                "isByDefaultSelected": true
              },
              {
                "serviceTaskId": 4,
                "serviceTaskDescription": "Gather clean clothes",
                "serviceRequestTypeDetailsId": 0,
                "isDefault": true,
                "serviceTypeId": 2,
                "isByDefaultSelected": true
              },
              {
                "serviceTaskId": 5,
                "serviceTaskDescription": "Clean and dry surfaces",
                "serviceRequestTypeDetailsId": 0,
                "isDefault": true,
                "serviceTypeId": 2,
                "isByDefaultSelected": true
              }
            ],
            "taskCompleted": 0,
            "totalTask": 0,
            "selected": true
          },
          "3": {
            "serviceTypeId": 3,
            "serviceTypeDescription": "Continence",
            "serviceTask": [
              {
                "serviceTaskId": 6,
                "serviceTaskDescription": "Discuss concerns",
                "serviceRequestTypeDetailsId": 0,
                "isDefault": true,
                "serviceTypeId": 3,
                "isByDefaultSelected": true
              },
              {
                "serviceTaskId": 7,
                "serviceTaskDescription": "Gather recommendations",
                "serviceRequestTypeDetailsId": 0,
                "isDefault": true,
                "serviceTypeId": 3,
                "isByDefaultSelected": true
              }
            ],
            "taskCompleted": 0,
            "totalTask": 0,
            "selected": false
          },
          "4": {
            "serviceTypeId": 4,
            "serviceTypeDescription": "Eating",
            "serviceTask": [
              {
                "serviceTaskId": 8,
                "serviceTaskDescription": "Prepare each meal",
                "serviceRequestTypeDetailsId": 0,
                "isDefault": true,
                "serviceTypeId": 4,
                "isByDefaultSelected": true
              },
              {
                "serviceTaskId": 9,
                "serviceTaskDescription": "Assist with feeding",
                "serviceRequestTypeDetailsId": 0,
                "isDefault": true,
                "serviceTypeId": 4,
                "isByDefaultSelected": true
              },
              {
                "serviceTaskId": 10,
                "serviceTaskDescription": "Clean surfaces",
                "serviceRequestTypeDetailsId": 0,
                "isDefault": true,
                "serviceTypeId": 4,
                "isByDefaultSelected": true
              }
            ],
            "taskCompleted": 0,
            "totalTask": 0,
            "selected": false
          },
          "5": {
            "serviceTypeId": 5,
            "serviceTypeDescription": "Getting Dressed",
            "serviceTask": [
              {
                "serviceTaskId": 11,
                "serviceTaskDescription": "Prepare clothes",
                "serviceRequestTypeDetailsId": 0,
                "isDefault": true,
                "serviceTypeId": 5,
                "isByDefaultSelected": true
              },
              {
                "serviceTaskId": 12,
                "serviceTaskDescription": "Help with dressing",
                "serviceRequestTypeDetailsId": 0,
                "isDefault": true,
                "serviceTypeId": 5,
                "isByDefaultSelected": true
              },
              {
                "serviceTaskId": 13,
                "serviceTaskDescription": "Assist with transfer(s)",
                "serviceRequestTypeDetailsId": 0,
                "isDefault": true,
                "serviceTypeId": 5,
                "isByDefaultSelected": true
              }
            ],
            "taskCompleted": 0,
            "totalTask": 0,
            "selected": false
          },
          "6": {
            "serviceTypeId": 6,
            "serviceTypeDescription": "Toileting",
            "serviceTask": [
              {
                "serviceTaskId": 14,
                "serviceTaskDescription": "Assist with transfer",
                "serviceRequestTypeDetailsId": 0,
                "isDefault": true,
                "serviceTypeId": 6,
                "isByDefaultSelected": true
              },
              {
                "serviceTaskId": 15,
                "serviceTaskDescription": "Confirm completion",
                "serviceRequestTypeDetailsId": 0,
                "isDefault": true,
                "serviceTypeId": 6,
                "isByDefaultSelected": true
              },
              {
                "serviceTaskId": 16,
                "serviceTaskDescription": "Clean surfaces",
                "serviceRequestTypeDetailsId": 0,
                "isDefault": true,
                "serviceTypeId": 6,
                "isByDefaultSelected": true
              }
            ],
            "taskCompleted": 0,
            "totalTask": 0,
            "selected": false
          },
          "7": {
            "serviceTypeId": 7,
            "serviceTypeDescription": "Transferring",
            "serviceTask": [
              {
                "serviceTaskId": 17,
                "serviceTaskDescription": "Prepare safe environment",
                "serviceRequestTypeDetailsId": 0,
                "isDefault": true,
                "serviceTypeId": 7,
                "isByDefaultSelected": true
              },
              {
                "serviceTaskId": 18,
                "serviceTaskDescription": "Clear pathway",
                "serviceRequestTypeDetailsId": 0,
                "isDefault": true,
                "serviceTypeId": 7,
                "isByDefaultSelected": true
              },
              {
                "serviceTaskId": 19,
                "serviceTaskDescription": "Complete transfer(s)",
                "serviceRequestTypeDetailsId": 0,
                "isDefault": true,
                "serviceTypeId": 7,
                "isByDefaultSelected": true
              }
            ],
            "taskCompleted": 0,
            "totalTask": 0,
            "selected": false
          }
        }
      },
      "requirementObj": {
        "selectedItemCategoryId": 1,
        "selectedCatagoryDescription": "KDLJLSJDF",
        "selectedServiceTypeId": 2,
        "isModalOpen": false,
        "vaidationModalOpen": false,
        "renderer": false
      },
      "selectedServiceCategoryId": 1,
      "getServiceCategoryStauts": 200,
      "getServiceTypesStatus": 200
    },
    "schedulepreferencesState": {
      "scheduleType": [],
      "genderType": [],
      "recurringpatternType": [],
      "slotType": [],
      "singleslotType": [],
      "daysType": [],
      "statesType": [],
      "patientAddressType": [
        {
          "patientId": 1022,
          "addressId": 296,
          "stateName": "Texas",
          "state": null,
          "city": "Fort worth",
          "zip": 10000,
          "street": "9100 Westwood shores",
          "isPrimaryAddress": true,
          "isActive": true,
          "addressTypeId": "HOME",
          "stateId": 43,
          "rowVersionId": null,
          "latitude": 32.89232,
          "longitude": -97.4430161
        },
        {
          "patientId": 1022,
          "addressId": 300,
          "stateName": "California",
          "state": null,
          "city": "Gangs",
          "zip": 65465,
          "street": "Klkjhkmj",
          "isPrimaryAddress": false,
          "isActive": true,
          "addressTypeId": "null",
          "stateId": 5,
          "rowVersionId": null,
          "latitude": 0,
          "longitude": 0
        },
        {
          "patientId": 1022,
          "addressId": 302,
          "stateName": "Arizona",
          "state": null,
          "city": "Lllllll",
          "zip": 0,
          "street": "Wally",
          "isPrimaryAddress": false,
          "isActive": true,
          "addressTypeId": "null",
          "stateId": 3,
          "rowVersionId": null,
          "latitude": 42.02535,
          "longitude": -87.85239
        },
        {
          "patientId": 1022,
          "addressId": 303,
          "stateName": "California",
          "state": null,
          "city": "Lop",
          "zip": 0,
          "street": "Plk",
          "isPrimaryAddress": false,
          "isActive": true,
          "addressTypeId": "null",
          "stateId": 5,
          "rowVersionId": null,
          "latitude": 39.2044449,
          "longitude": -84.37369
        },
        {
          "patientId": 1022,
          "addressId": 304,
          "stateName": "Missouri",
          "state": null,
          "city": "St.Louis",
          "zip": 66666,
          "street": "510 Maryville University",
          "isPrimaryAddress": false,
          "isActive": true,
          "addressTypeId": "",
          "stateId": 25,
          "rowVersionId": null,
          "latitude": 38.6417465,
          "longitude": -90.50381
        },
        {
          "patientId": 1022,
          "addressId": 305,
          "stateName": "Texas",
          "state": null,
          "city": "fort worth",
          "zip": 76179,
          "street": "9100 westwood shores dr",
          "isPrimaryAddress": false,
          "isActive": true,
          "addressTypeId": "Home",
          "stateId": 43,
          "rowVersionId": null,
          "latitude": 32.89232,
          "longitude": -97.4430161
        }
      ],
      "sendpatientAddressType": [],
      "schedulePreferencesObj": {
        "selectedScheduleType": 31,
        "selectedScheduleValue": "OneTime",
        "selectedGenderKey": 8,
        "selectedAddressKey": 296,
        "selectedStateKey": null,
        "selectedDate": "2019-06-13",
        "selectedDateDay": "Thursday",
        "slotData": [
          {
            "id": 21,
            "name": "Morning",
            "selected": true
          },
          {
            "id": 22,
            "name": "Afternoon",
            "selected": true
          },
          {
            "id": 23,
            "name": "Evening",
            "selected": false
          }
        ],
        "selectedSlotKey": null,
        "street": "",
        "city": "",
        "zip": "",
        "minimumServiceProviderExperience": 5,
        "maximumServiceProviderExperience": 20,
        "startDate": null,
        "endDate": null,
        "occurances": null,
        "recurringPattern": 17,
        "availableList": [],
        "recurringPatternLabel": "Weekly",
        "addressLabel": "",
        "state": "",
        "addressType": "",
        "selectedEndType": "END_AFTER",
        "reccuranceSlotData": [
          [
            {
              "id": 21,
              "name": "Morning",
              "selected": false
            },
            {
              "id": 22,
              "name": "Afternoon",
              "selected": false
            },
            {
              "id": 23,
              "name": "Evening",
              "selected": false
            }
          ],
          [
            {
              "id": 21,
              "name": "Morning",
              "selected": false
            },
            {
              "id": 22,
              "name": "Afternoon",
              "selected": false
            },
            {
              "id": 23,
              "name": "Evening",
              "selected": false
            }
          ],
          [
            {
              "id": 21,
              "name": "Morning",
              "selected": false
            },
            {
              "id": 22,
              "name": "Afternoon",
              "selected": false
            },
            {
              "id": 23,
              "name": "Evening",
              "selected": false
            }
          ],
          [
            {
              "id": 21,
              "name": "Morning",
              "selected": false
            },
            {
              "id": 22,
              "name": "Afternoon",
              "selected": false
            },
            {
              "id": 23,
              "name": "Evening",
              "selected": false
            }
          ],
          [
            {
              "id": 21,
              "name": "Morning",
              "selected": false
            },
            {
              "id": 22,
              "name": "Afternoon",
              "selected": false
            },
            {
              "id": 23,
              "name": "Evening",
              "selected": false
            }
          ],
          [
            {
              "id": 21,
              "name": "Morning",
              "selected": false
            },
            {
              "id": 22,
              "name": "Afternoon",
              "selected": false
            },
            {
              "id": 23,
              "name": "Evening",
              "selected": false
            }
          ],
          [
            {
              "id": 21,
              "name": "Morning",
              "selected": false
            },
            {
              "id": 22,
              "name": "Afternoon",
              "selected": false
            },
            {
              "id": 23,
              "name": "Evening",
              "selected": false
            }
          ]
        ],
        "noOfDaysCanSelect": 1,
        "isModalOpen": false,
        "isNextClicked": true,
        "posCustomOpen": false,
        "updateTextInput": false,
        "isUpdated": false
      },
      "getPatientAddressStatus": 200
    },
    "reviewState": {
      "serviceRequestID": "",
      "postServiceRequestStatus": 0
    }
  }