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
        lName: 'Marley'
    },
    {
        username: 'charlie',
        fName: 'Charlie',
        lName: 'Garcia'
    }
]


let tbody
let template
let clone
let $createBtn
let $usernameFld, $firstNameFld


const deleteUser1 = (event) => {
    const deleteBtn = $(event.currentTarget)
    deleteBtn.parents("tr.wbdv-template").remove()
}

const renderUsers = (users) => {

    tbody.empty()
    for(let i=0; i < users.length; i++) {
        const user = users[i]

        clone = template.clone()
        clone.removeClass("wbdv-hidden")

        clone.find(".wbdv-username").html(user.username)
        clone.find(".wbdv-first-name").html(user.fName)
        clone.find(".wbdv-remove").click(() => deleteUser2(i))

        tbody.append(clone)
    }
}


const deleteUser2 = (index) => {
    users.splice(index, 1)
    renderUsers(users)
}


const createUser = () => {
    console.log("create user")
    const username = $usernameFld.val()
    const firstName = $firstNameFld.val()

    $usernameFld.val("")
    $firstNameFld.val("")

    const newUser = {
        username: username,
        fName: firstName,
        lName: 'TBD1',
        role: 'TBD2'
    }
    users.push(newUser)
    renderUsers(users)
}


const init = () => {
    const heading1 = jQuery("h1")
    // heading1
    //     .css("color", "yellow")
    //     .css("backgroundColor", "red")
    //     .html("User Administrator")
    //     .append(" - Only for Administrators")
    //     .append("<button>Ok</button>")

    const container = $(".container")
    tbody = $("tbody")
    template = $("tr.wbdv-template")
    $createBtn = $(".wbdv-create").click(createUser)
    $firstNameFld = $("#firstNameFld")
    $usernameFld = $("#usernameFld")

    renderUsers(users)
}

$(init)



