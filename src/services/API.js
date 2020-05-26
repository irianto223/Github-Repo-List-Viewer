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

export const requestOauthToken = (code) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'POST',
      url: `/login/oauth/access_token`,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Accept': 'application/json',
        // 'Content-Type': 'application/json'
      },
      params: {
        client_id: process.env.REACT_APP_GITHUB_CLIENT_ID,
        client_secret: process.env.REACT_APP_GITHUB_CLIENT_SECRET,
        code,
      }
    })
      .then((response) => {
        return resolve(response)
      })
      .catch((err) => {
        return reject(err)
      })
  })
}

export const fetchMyRepos = () => {
  // const dummyToken = '46575bfaa5f17273f5df434ac892ab838585bca6'
  const token = localStorage.getItem('token')

  return new Promise((resolve, reject) => {
    axios({
      method: 'GET',
      url: `/user/repos`,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    })
      .then((response) => {
        return resolve(response)
      })
      .catch((err) => {
        return reject(err)
      })
  })
}
