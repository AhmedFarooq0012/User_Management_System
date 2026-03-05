console.log("welcome to my own creation")

const userTable = document.getElementById("userTable")
const url = 'https://dummyjson.com/users';

const loadUser = async () => {
    try {
        const response = await fetch(url)

        if (response.status !== 200) {
            console.log("Error fetching data")
            return
        }

        const data = await response.json()
        displayUsers(data.users)

    } catch (error) {
        console.log("data exception", error)
    }
}

document.addEventListener("DOMContentLoaded", loadUser)

const displayUsers = (users) => {
    userTable.innerHTML = ""

    users.forEach(user => {

        const row = document.createElement("tr")

        row.innerHTML = `
        <td>${user.id}</td>
        <td>${user.firstName}</td>
        <td>${user.lastName}</td>
        <td>${user.email}</td>
        <td>${user.phone}</td>
        <td>
            <button>Edit</button>
            <button>Delete</button>
        </td>
        `

        userTable.appendChild(row)
    })
}