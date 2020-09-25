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


const deleteUser1 = (event) => {
    const deleteBtn = $(event.currentTarget)
    deleteBtn.parents("tr.wbdv-template").remove()
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
        clone.find(".wbdv-first-name").html(user.fName)
        clone.find(".wbdv-last-name").html(user.lName)
        clone.find(".wbdv-role").html(user.role)
        // assign a click event to the remove icon on i-th row
        clone.find(".wbdv-remove").click(() => deleteUser2(i))

        tbody.append(clone)
    }
}

// modify the user array and reflect the change in data model to DOM
const deleteUser2 = (index) => {
    users.splice(index, 1)
    // re-render the html after deleting the i-th object in user array
    renderUsers(users)
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

    // add this new user object to user array
    const newUser = {
        username: username,
        fName: firstName,
        lName: lastName,
        role: role
    }
    // modify the data model and re-render the DOM
    users.push(newUser)
    renderUsers(users)
}


const init = () => {

    const container = $(".container")
    tbody = $("tbody")
    template = $("tr.wbdv-template")
    $createBtn = $(".wbdv-create").click(createUser)
    $firstNameFld = $("#firstNameFld")
    $usernameFld = $("#usernameFld")
    $lastNameFld = $("#lastNameFld")
    $roleFld = $("#roleFld")

    renderUsers(users)
}

$(init)



