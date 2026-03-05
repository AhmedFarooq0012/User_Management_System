const API_URL = "https://dummyjson.com/users"

const userTable = document.getElementById("userTable")
const editModal = document.getElementById("editModal")
const messageBox = document.getElementById("messageBox")

const editForm = document.getElementById("editForm")

const editId = document.getElementById("editId")
const editFirstName = document.getElementById("editFirstName")
const editLastName = document.getElementById("editLastName")
const editEmail = document.getElementById("editEmail")
const editPhone = document.getElementById("editPhone")


// LOAD USERS
document.addEventListener("DOMContentLoaded", loadUsers)

async function loadUsers(){

const res = await fetch(API_URL)
const data = await res.json()

displayUsers(data.users)

}


// DISPLAY USERS
function displayUsers(users){

userTable.innerHTML = ""

users.forEach(user => addUserRow(user))

}


// ADD USER ROW
function addUserRow(user){

const row = document.createElement("tr")

row.setAttribute("data-id", user.id)

row.innerHTML = `

<td class="border p-2">${user.id}</td>
<td class="border p-2">${user.firstName}</td>
<td class="border p-2">${user.lastName}</td>
<td class="border p-2">${user.email}</td>
<td class="border p-2">${user.phone}</td>

<td class="border p-2 space-x-2">

<button
onclick="openEditModal(${user.id}, '${user.firstName}', '${user.lastName}', '${user.email}', '${user.phone}')"
class="bg-yellow-400 px-3 py-1 rounded text-sm">
Edit
</button>

<button
onclick="deleteUser(${user.id})"
class="bg-red-500 text-white px-3 py-1 rounded text-sm">
Delete
</button>

</td>

`

userTable.appendChild(row)

}


// OPEN MODAL
function openEditModal(id, firstName, lastName, email, phone){

editModal.classList.remove("hidden")

editId.value = id
editFirstName.value = firstName
editLastName.value = lastName
editEmail.value = email
editPhone.value = phone

}


// CLOSE MODAL
function closeModal(){

editModal.classList.add("hidden")

}


// UPDATE USER
editForm.addEventListener("submit", async function(e){

e.preventDefault()

const id = editId.value

const updatedUser = {

firstName: editFirstName.value,
lastName: editLastName.value,
email: editEmail.value,
phone: editPhone.value

}

await fetch(`https://dummyjson.com/users/${id}`, {

method: "PUT",

headers:{
"Content-Type":"application/json"
},

body: JSON.stringify(updatedUser)

})


// Update UI
const row = document.querySelector(`tr[data-id='${id}']`)

row.children[1].textContent = updatedUser.firstName
row.children[2].textContent = updatedUser.lastName
row.children[3].textContent = updatedUser.email
row.children[4].textContent = updatedUser.phone

closeModal()

showMessage("User updated successfully","green")

})


// MESSAGE
function showMessage(text,color){

messageBox.textContent = text

messageBox.className = `p-3 mb-4 rounded text-center ${
color === "green"
? "bg-green-100 text-green-700"
: "bg-red-100 text-red-700"
}`

messageBox.classList.remove("hidden")

setTimeout(()=>{

messageBox.classList.add("hidden")

},3000)

}