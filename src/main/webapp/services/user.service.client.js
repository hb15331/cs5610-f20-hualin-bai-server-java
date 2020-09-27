function AdminUserServiceClient() {
    this.createUser = createUser;
    this.findAllUsers = findAllUsers;
    this.findUserById = findUserById;
    this.deleteUser = deleteUser;
    this.updateUser = updateUser;
    this.url = 'https://wbdv-generic-server.herokuapp.com/api/jannunzi/users';
    // var self = this;


    // lambda functions that return a promise on calling json()
    // then manipulate the json data in the controller
    function findAllUsers() {
        return fetch(this.url)
            .then(response => response.json());
    }


    // user object is formatted by browser as a stream of bytes
    // and sent to server
    function createUser(user) {
        return fetch(this.url, {
            method: 'POST',
            // body: user,
            // convert jason to a string
            body: JSON.stringify(user),
            headers: {'content-type': 'application/json'
            }
        })
            // server will respond with actual object that
            // was added to server, including some metadata
            .then(response => response.json());
    }


    function findUserById(userId) {

        return fetch(`https://wbdv-generic-server.herokuapp.com/api/jannunzi/users/${userId}`)
            .then(response => response.json());

    }


    // params: userId and all new data of user
    function updateUser(userId, user) {
        // backtick: embed the variable inside the string
        return fetch(`https://wbdv-generic-server.herokuapp.com/api/jannunzi/users/${userId}`, {
            method: 'PUT',
            body: JSON.stringify(user),
            headers: {'content-type': 'application/json'
            }
        })
    }


    // userId is the primary key that specifies which record to remove
    // override the default method GET with DELETE
    function deleteUser(userId) {
        return fetch(`https://wbdv-generic-server.herokuapp.com/api/jannunzi/users/${userId}`, {
            method: 'DELETE'
        });
    }


}