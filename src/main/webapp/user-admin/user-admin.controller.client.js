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

const userService = new AdminUserServiceClient();

const deleteUser1 = (event) => {
    const deleteBtn = $(event.currentTarget)
    deleteBtn.parents("tr.wbdv-template").remove()
}

// records which user is selected for update
let selectedUserIndex = -1 // -1 denotes no user is selected
const selectUser = (index) => {

    selectedUserIndex = index
    $usernameFld.val(users[index].username)
    $firstNameFld.val(users[index].first)
    $lastNameFld.val(users[index].last)
    $roleFld.val(users[index].role)

}


const renderUsers = (users) => {
    // remove the redundant current content from table
    // otherwise would add modified user data to current data from last update
    tbody.empty()

    for(let i = 0; i < users.length; i++) {
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
        clone.find(".wbdv-remove").click(() => deleteUser2(i))
        clone.find(".wbdv-edit").click(() => selectUser(i))

        tbody.append(clone)
    }
}


// modify the user array and reflect the change in data model to DOM
const deleteUser2 = (_index) => {
    // users.splice(index, 1)
    // re-render the html after deleting the i-th object in user array
    // renderUsers(users)

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
            users.splice(_index, 1);
            renderUsers(users);
        })
}


const createUser = () => {
    // retrieve the value of input field
    const username = $usernameFld.val()
    const firstName = $firstNameFld.val()
    const lastName = $lastNameFld.val()
    const role = $roleFld.val()
    console.log(role)

    // reset the value of input field
    $usernameFld.val("")
    $firstNameFld.val("")
    $lastNameFld.val("")
    $roleFld.val("Faculty")

    // newUser: the user object sent to remote server
    // this object does not have an id
    const newUser = {
        username: username,
        first: firstName,
        last: lastName,
        role: role
    }

    // actualNewUser: the user object stored in the database
    // the actual user received from server has id
    // that can be used for delete, and it is pushed to local array
    userService.createUser(newUser).then(actualNewUser => {
        users.push(actualNewUser);
        renderUsers(users);
    })
    // modify the data model and re-render the DOM
    // users.push(newUser)
    // renderUsers(users)
}

const updateUser = () => {

    const selectedUser = users[selectedUserIndex];
    // selectedUser.username = $usernameFld.val();
    // selectedUser.first = $firstNameFld.val();
    // selectedUser.last = $lastNameFld.val();

    const newUserName = $usernameFld.val();
    const newFirstName = $firstNameFld.val();
    const newLastName = $lastNameFld.val();

    const updatedUser = {
        username: newUserName,
        first: newFirstName,
        last: newLastName
    }
    // modify the local array after the promise is fulfilled
    userService.updateUser(selectedUser._id, updatedUser)
        .then(() => {
            users[selectedUserIndex] = updatedUser;
            renderUsers(users);
        })

}



const init = () => {

    userService.findAllUsers();

    tbody = $("tbody")
    template = $("tr.wbdv-template")
    $createBtn = $(".wbdv-create").click(createUser)
    $firstNameFld = $("#firstNameFld")
    $usernameFld = $("#usernameFld")
    $lastNameFld = $("#lastNameFld")
    $roleFld = $("#roleFld")

    $(".wbdv-update").click(updateUser);

    // _users: this array is from the server
    // users: local copy of the remote array
    // render the page based on the local copy of users
    userService.findAllUsers()
        .then((_users) => {
            console.log(_users)
            users = _users
            renderUsers(users)
        })

}

$(init)



