import axios from "axios";

/*
 * Service for pushing the message notifications to mobile.
 */
const pushNotificationService = {
  pushMessageToMobile: postData => {
    let header = {
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "key=AAAAEXpNOJI:APA91bGsVlBc9XFI4RyZRjY-s5zKgRsp4SWdNa52oU0LQtH-6wkc-xR7b5fXQpRQK8OnWZCQlcTdBt6daocR5n-LOmgXDRLVxUjFMSCBJ89Z8FFA6PpPwsVQ4EcHsqvFaKkuXKc-Yxzc"
      }
    };
    return axios.post(
      "https://fcm.googleapis.com/fcm/send",
      JSON.stringify(postData),
      header
    );
  }
};

export default pushNotificationService;
