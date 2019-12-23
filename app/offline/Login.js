const Realm = require('realm'),
 Login = {
    name: 'Login',
    properties: {
        userName: 'string',
        password: 'string',
        access_token: 'string',
        expires_in: 'int',
        token_type: 'string'
    }
}

export function storeLoginData(userName, password, response, serviceProviderResponse) {
    Realm.open({ path: `PG_Login.realm`, schema: [Login] })
        .then((realm) => {
            let loginObj = realm.objects('Login');

            realm.write(() => {
                if (loginObj[0] ? loginObj[0].userName && loginObj[0].password : false) {
                    loginObj[0].userName = userName;
                    loginObj[0].password = password;
                    loginObj[0].access_token = response.access_token;
                    loginObj[0].expires_in = response.expires_in;
                    loginObj[0].token_type = response.token_type;
                } else {
                    let newLoginObj = realm.create('Login', {
                        userName,
                        password,
                        access_token: response.access_token,
                        expires_in: response.expires_in,
                        token_type: response.token_type
                    })
                }
            });
        })
        .catch((error) => {
            alert("Problem in caching username and password");
        });
}
export function storeServiceProviderData(userName, password, response) {
    Realm.open({path: `PG_Login.realm`, schema: [Login] })
        .then((realm) => {
            let loginObj = realm.objects('Login');

            realm.write(() => {
                if (loginObj[0] ? loginObj[0].userName && loginObj[0].password
                    : false) {
                    loginObj[0].userName = userName;
                    loginObj[0].password = password;
                    loginObj[0].access_token = response.access_token
                    loginObj[0].expires_in = response.expires_in
                    loginObj[0].token_type = response.token_type
                } else {
                    let newLoginObj = realm.create('Login', {
                        userName,
                        password,
                        access_token: response.access_token,
                        expires_in: response.expires_in,
                        token_type: response.token_type
                    })
                }
                // alert("user name and password cached successfully");
            });
        })
        .catch((error) => {
            alert("Problem in caching username and password");
        });
}
export function getCacheData() {
    return fetchLoginData().then((res) => res)
.catch((err) => {
        throw err;
    })
}
export async function fetchLoginData() {
    let realmPromise = Realm.open({path: `PG_Login.realm`, schema: [Login] })
        .then((realm) => {
            let data = realm.objects('Login');

            return data ? data : [];
        })
        .catch((err) => {
            throw err;
        })

    return realmPromise;
}

export function clearLoginData(){
    Realm.open({path: `PG_Login.realm`, schema: [Login] })
        .then((realm) => {
            realm.write(() => {
                let loginObj = realm.objects('Login');

                realm.delete(loginObj); // Deletes all books
              });
        })
}