/* global window, document, fetch */
/* eslint-disable no-console */

const loadUsers = (nUsers = 3) => {
  return () => {
    console.log('loading %d users', nUsers)
    document.querySelector('#users').innerText = ''

    fetch(`https://jsonplaceholder.cypress.io/users?_limit=${nUsers}`)
    .then((r) => r.json())
    .then((users) => {
      console.table(users)

      const usersHtml = users.map((user) => {
        return `<li class="user">${user.id} - ${user.email}</li>`
      }).join('\n')

      document.querySelector('#users').innerHTML = usersHtml
    })
    .catch((e) => {
      console.error('problem fetching users', e)
      document.querySelector('#users').innerText = `Problem fetching users ${e.message}`
    })
  }
}

const loadUser = (id) => {
  return () => {
    console.log('loading user #%d', id)
    document.querySelector('#users').innerText = ''

    fetch(`https://jsonplaceholder.cypress.io/users/${id}`)
    .then((r) => r.json())
    .then((user) => {
      const users = [user]

      console.table(users)

      const usersHtml = users.map((user) => {
        return `<li class="user">${user.id} - ${user.email}</li>`
      }).join('\n')

      document.querySelector('#users').innerHTML = usersHtml
    })
    .catch((e) => {
      console.error('problem fetching users', e)
      document.querySelector('#users').innerText = `Problem fetching users ${e.message}`
    })
  }
}

document.getElementById('load-users').addEventListener('click', loadUsers(3))
document.getElementById('load-five-users').addEventListener('click', loadUsers(5))
document.getElementById('load-second-user').addEventListener('click', loadUser(2))
