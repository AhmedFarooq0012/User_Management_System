const API_URL = "https://dummyjson.com/users"

const userTable = document.getElementById("userTable")
const form = document.getElementById("userForm")
const messageBox = document.getElementById("messageBox")

const firstName = document.getElementById("firstName")
const lastName = document.getElementById("lastName")
const email = document.getElementById("email")
const phone = document.getElementById("phone")
const searchInput = document.getElementById("searchInput")
// edit form 

const editForm = document.getElementById("edituserForm")

const editFirstName = document.getElementById("editfirstName")
const editLastName = document.getElementById("editlastName")
const editEmail = document.getElementById("editemail")
const editPhone = document.getElementById("editphone")
//edit the form data
let currentEditId = null
function editUser(id) {

    const row = document.querySelector(`tr[data-id='${id}']`)

    if (!row) return

    // Get data from table row
    editFirstName.value = row.children[1].textContent
    editLastName.value = row.children[2].textContent
    editEmail.value = row.children[3].textContent
    editPhone.value = row.children[4].textContent

    currentEditId = id
}
//
editForm.addEventListener("submit", async function(e){

    e.preventDefault()

    if(!currentEditId) return

    const updatedUser = {

        firstName: editFirstName.value,
        lastName: editLastName.value,
        email: editEmail.value,
        phone: editPhone.value

    }

    const res = await fetch(`https://dummyjson.com/users/${currentEditId}`, {

        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedUser)

    })

    const data = await res.json()

    // Update UI Row
    const row = document.querySelector(`tr[data-id='${currentEditId}']`)

    if(row){

        row.children[1].textContent = data.firstName
        row.children[2].textContent = data.lastName
        row.children[3].textContent = data.email
        row.children[4].textContent = data.phone
            editForm.reset()

    }

    showMessage("User updated successfully", "green")



    currentEditId = null

})



// LOAD USERS
document.addEventListener("DOMContentLoaded", loadUsers)

async function loadUsers() {

    const res = await fetch(API_URL)
    const data = await res.json()

    displayUsers(data.users)
}


// DISPLAY USERS
function displayUsers(users) {

    userTable.innerHTML = ""

    users.forEach(user => addUserToTable(user))

}


// ADD USER ROW
function addUserToTable(user) {

    const row = document.createElement("tr")

    row.setAttribute("data-id", user.id)

    row.classList.add("hover:bg-gray-100")

    row.innerHTML = `

<td class="border p-2">${user.id}</td>
<td class="border p-2">${user.firstName}</td>
<td class="border p-2">${user.lastName}</td>
<td class="border p-2">${user.email}</td>
<td class="border p-2">${user.phone}</td>

<td class="border p-2 space-x-2">

<button
onclick="editUser(${user.id})"
class="bg-yellow-400 px-3 py-1 rounded text-sm">
Edit
</button>
<button
onclick="deleteUser(${user.id})"
class="bg-red-500 text-white px-3 py-1 rounded text-sm">
Delete
</button>

</td>`

    userTable.appendChild(row)
    form.reset()

}


// CREATE USER
form.addEventListener("submit", async function (e) {

    e.preventDefault()

    const newUser = {

        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        phone: phone.value

    }

    const res = await fetch("https://dummyjson.com/users/add", {

        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newUser)

    })

    const data = await res.json()

    console.log(data)
    addUserToTable(data)

    showMessage("User added successfully", "green")



})


// DELETE USER
async function deleteUser(id) {

    if (!confirm("Are you sure you want to delete this user?")) return

    await fetch(`https://dummyjson.com/users/${id}`, {

        method: "DELETE"

    })

    // Remove row from table
    const row = document.querySelector(`tr[data-id='${id}']`)

    if (row) {
        row.remove()
    }


    showMessage("User deleted successfully", "red")

}


// SHOW MESSAGE
function showMessage(text, color) {

    messageBox.textContent = text

    messageBox.className = `p-3 mb-4 rounded text-center ${color === "green"
        ? "bg-green-100 text-green-700"
        : "bg-red-100 text-red-700"
        }`

    messageBox.classList.remove("hidden")

    setTimeout(() => {

        messageBox.classList.add("hidden")

    }, 3000)

}
// Search Functionality
searchInput.addEventListener("input", async () => {

    const query = searchInput.value.trim()

    // If search is empty → load all users
    if (query === "") {
        loadUsers()
        return
    }

    try {

        const res = await fetch(`https://dummyjson.com/users/search?q=${query}`)
        const data = await res.json()

        displayUsers(data.users)

    } catch (error) {
        console.error("Search error:", error)
    }

})