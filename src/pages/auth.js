import React, { useEffect } from 'react'
import { Loader, Dimmer, Container } from 'semantic-ui-react'
import { useHistory, useLocation } from 'react-router-dom'

import { requestOauthToken } from '../services/API'

export default () => {
  const useQuery = () => new URLSearchParams(useLocation().search)
  const { replace } = useHistory()
  const query = useQuery()

  const code = query.get('code')
  const token = localStorage.getItem('token')

  const makeLoading = () => {
    return (
      <Container>
        <Dimmer inverted active>
          <Loader inverted>Loading</Loader>
        </Dimmer>
      </Container>
    )
  }

  const requestToken = (c) => {
    requestOauthToken(c)
      .then((response) => {
        console.log(response)
        localStorage.setItem('token', response.data.access_token)
      })
      .catch((error) => {
        console.log('Error request token -------->')
        console.log(error)
        console.log(error.response)
      })
  }

  useEffect(() => {
    if (!token && !code) window.location.replace(`https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&scope=repo,user`)
    if (!token && code) requestToken(code)
    if (token) replace('/')
  }, [])

  return makeLoading()
}
