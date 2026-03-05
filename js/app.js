const API_URL = "https://dummyjson.com/users"

const userTable = document.getElementById("userTable")
const form = document.getElementById("userForm")
const messageBox = document.getElementById("messageBox")

const firstName = document.getElementById("firstName")
const lastName = document.getElementById("lastName")
const email = document.getElementById("email")
const phone = document.getElementById("phone")


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

<button class="bg-yellow-400 px-3 py-1 rounded text-sm">Edit</button>

<button
onclick="deleteUser(${user.id})"
class="bg-red-500 text-white px-3 py-1 rounded text-sm">
Delete
</button>

</td>

`

    userTable.appendChild(row)

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

    addUserToTable(data)

    showMessage("User added successfully", "green")

    form.reset()

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