import axios from 'axios'

export const fetchReposByUsername = (username) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'GET',
      url: `https://api.github.com/users/${username}/repos`,
    })
      .then((response) => {
        return resolve(response)
      })
      .catch((err) => {
        return reject(err)
      })
  })
}
