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
  console.log(code)
  console.log(process.env.REACT_APP_GITHUB_CLIENT_ID)
  console.log(process.env.REACT_APP_GITHUB_CLIENT_SECRET)

  // const params = {
  //   client_id: process.env.REACT_APP_GITHUB_CLIENT_ID,
  //   client_secret: process.env.REACT_APP_GITHUB_CLIENT_SECRET,
  //   code
  // }

  return new Promise((resolve, reject) => {
    axios({
      method: 'POST',
      url: `https://github.com/login/oauth/access_token`,
      // url: `https://github.com/login/oauth/access_token?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}&code=${code}`,
      headers: {
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      params: {
        client_id: process.env.REACT_APP_GITHUB_CLIENT_ID,
        client_secret: process.env.REACT_APP_GITHUB_CLIENT_SECRET,
        code,
        // redirect_uri: 'http://localhost:3000/auth'
      }
    })
    // axios.post('https://github.com/login/oauth/access_token', {}, { params })
      .then((response) => {
        return resolve(response)
      })
      .catch((err) => {
        return reject(err)
      })
  })
}
