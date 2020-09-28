(function () {

    let users = [
        {
            username: 'alice',
            fName: 'Alice',
            lName: 'Wonderland',
            role: 'Faculty'
        },
        {
            username: 'bob',
            fName: 'Robert',
            lName: 'Marley',
            role: 'Student'
        },
        {
            username: 'charlie',
            fName: 'Charlie',
            lName: 'Garcia',
            role: 'Admin'
        }
    ]

    let tbody
    let template
    let clone
    let $createBtn
    let $usernameFld, $firstNameFld, $lastNameFld
    let $roleFld
    let $passwordFld

    const userService = new AdminUserServiceClient();

// records which user is selected for update
    let selectedUserIndex = -1 // -1 denotes no user is selected
    const selectUser = (index) => {

        selectedUserIndex = index
        // copy the selected user's data to form
        $usernameFld.val(users[index].username)
        $firstNameFld.val(users[index].first)
        $lastNameFld.val(users[index].last)
        $roleFld.val(users[index].role)
        $passwordFld.val(users[index].password)

    }

    const renderUsers = (users) => {
        // remove the redundant current content from table
        // otherwise would add modified user data to current data from last update
        tbody.empty()

        for (let i = 0; i < users.length; i++) {
            const user = users[i]
            // template row contains some dummy data
            clone = template.clone()
            clone.removeClass("wbdv-hidden")

            // overwrite the content of cloned row with array data
            clone.find(".wbdv-username").html(user.username)
            clone.find(".wbdv-first-name").html(user.first)
            clone.find(".wbdv-last-name").html(user.last)
            clone.find(".wbdv-role").html(user.role)
            // assign a click event to the remove icon on i-th row
            clone.find(".wbdv-remove").click(() => deleteUser(i))
            clone.find(".wbdv-edit").click(() => selectUser(i))

            tbody.append(clone)
        }
    }

    const deleteUser = (_index) => {

        // use index to get the user from local array that we've clicked on
        const user = users[_index];
        // retrieve the id attribute from that user
        const userId = user._id;
        // pass id to invoke the service delete
        // deleteUser returns a promise
        userService.deleteUser(userId)
            // after the server successfully deletes the record
            // removes the same record from local array
            // can save an extra call to server for latest data
            .then(response => {
                // modify the user array and reflect the change in data model to DOM
                users.splice(_index, 1);
                // re-render the html after deleting the i-th object in user array
                renderUsers(users);
            })
    }

    const createUser = () => {
        // retrieve the value of input field
        const username = $usernameFld.val()
        const firstName = $firstNameFld.val()
        const lastName = $lastNameFld.val()
        const role = $roleFld.val()
        const password = $passwordFld.val()

        // clicking on create or update clears the form
        $usernameFld.val("")
        $firstNameFld.val("")
        $lastNameFld.val("")
        $roleFld.val("FACULTY")
        $passwordFld.val("")

        // newUser: the user object sent to remote server
        // this object does not have an id
        const newUser = {
            username: username,
            first: firstName,
            last: lastName,
            role: role,
            password: password
        }

        // actualNewUser: the user object stored in the database
        // the actual user received from server has id
        // that can be used for delete, and it is pushed to local array
        userService.createUser(newUser).then(actualNewUser => {
            // modify the data model and re-render the DOM
            users.push(actualNewUser);
            renderUsers(users);
        })
    }

    const updateUser = () => {

        const newUsername = $usernameFld.val()
        const newFirstName = $firstNameFld.val()
        const newLastName = $lastNameFld.val()
        const newRole = $roleFld.val()
        const userId = users[selectedUserIndex]._id

        const newPassword = $passwordFld.val()

        // clicking on create or update clears the form
        $usernameFld.val("")
        $firstNameFld.val("")
        $lastNameFld.val("")
        $roleFld.val("FACULTY")
        $passwordFld.val("")

        // modify the local array after the promise is fulfilled
        userService.updateUser(userId, {
            username: newUsername,
            first: newFirstName,
            last: newLastName,
            role: newRole,
            password: newPassword
        })
            .then(response => {
                users[selectedUserIndex].username = newUsername
                users[selectedUserIndex].first = newFirstName
                users[selectedUserIndex].last = newLastName
                users[selectedUserIndex].role = newRole
                users[selectedUserIndex].password = newPassword
                renderUsers(users)
            })

    }

// holds alternative implementation
// wrap the service function in another function
    const findUserById = (userId) => {
        return userService.findUserById(userId);
    }

    const init = () => {

        tbody = $("tbody")
        template = $("tr.wbdv-template")
        $createBtn = $(".wbdv-create").click(createUser)
        $firstNameFld = $("#firstNameFld")
        $usernameFld = $("#usernameFld")
        $lastNameFld = $("#lastNameFld")
        $roleFld = $("#roleFld")
        $passwordFld = $("#passwordFld")

        $(".wbdv-update").click(updateUser);

        // _users: this array is from the server
        // users: local copy of the remote array
        // render the page based on the local copy of users
        userService.findAllUsers()
            .then((_users) => {
                users = _users
                renderUsers(users)
            })

    }

    $(init)

})()


