const initialData = {
  tasks: {
    wwwwww: {
      accDate: "25-02-2019",
      acl: true,
      car_model: "BMW X6",
      collide: true,
      collideACL: false,
      collideVin: 123456,
      dateTime: 1551096636000,
      device_Name: "abc",
      firmwareVersion_ID: "abc",
      id: "wwwwww",
      imgUrl: "abc",
      incident_no: "IN_121212_55",
      status: "ASSIGNED",
      vin: 121212
    },
    wwwwww11: {
      accDate: "25-02-2019",
      acl: false,
      car_model: "Tesla S 100D",
      collide: true,
      collideACL: true,
      collideVin: 121212,
      dateTime: 1551096636000,
      device_Name: "abc",
      firmwareVersion_ID: "abc",
      id: "wwwwww11",
      imgUrl: "abc",
      incident_no: "IN_123456_124",
      status: "NEW ISSUE",
      vin: 123456
    }
  },
  columns: {
    "column-1": {
      id: "column-1",
      title: "NEW ISSUE",
      taskIds: ["wwwwww", "wwwwww11"]
    },
    "column-2": {
      id: "column-2",
      title: "ASSIGNED",
      taskIds: []
    },
    "column-3": {
      id: "column-3",
      title: "REVIEW",
      taskIds: []
    },
    "column-4": {
      id: "column-4",
      title: "DONE",
      taskIds: []
    }
  },
  // Facilitate reordering of the columns
  columnOrder: ["column-1", "column-2", "column-3", "column-4"]
};
export default initialData;
