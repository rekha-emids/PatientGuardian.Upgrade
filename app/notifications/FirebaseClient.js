import FirebaseConstants from "./FirebaseConstants";

const API_URL = "https://fcm.googleapis.com/fcm/send";

class FirebaseClient {

  async send(body, type) {
		if (FirebaseConstants.KEY === 'API_KEY'){
			return;
		}
  	let headers = new Headers({
  		"Content-Type": "application/json",
      "Authorization": `key=${FirebaseConstants.KEY}`
  	});

		try {
			let response = await fetch(API_URL, { method: "POST", headers, body });

			try {
				response = await response.json();
				if (!response.success){
				}
			} catch (err){
			}
		} catch (err) {
		}
  }

}

let firebaseClient = new FirebaseClient();

export default firebaseClient;
