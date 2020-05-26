import React, { useState, useEffect } from 'react'
import { Container, List, Input } from 'semantic-ui-react'

import { fetchReposByUsername } from '../services/API'

export default (props) => {
  const [repos, reposSetter] = useState([])

  const getRepos = (username) => {
    fetchReposByUsername(username)
      .then((response) => {
        console.log(response)
        if (response.status === 200) return reposSetter(response.data)
      })
      .catch((err) => {
        console.log('Error get repos --------------->')
        console.log(err)
      })
  }

  useEffect(() => {
    getRepos('telkomdev')
  }, [])

  return (
    <Container>
      <Input icon='search' placeholder='Username' />
      <List divided relaxed>
        {repos.map((d) => (
          <List.Item key={d.id}>
            <List.Icon name='github' size='large' verticalAlign='middle' />
            <List.Content>
              <List.Header as='a'>{d.full_name}</List.Header>
              <List.Description as='a'>{d.description || '-'}</List.Description>
            </List.Content>
          </List.Item>
        ))}
      </List>
    </Container>
  )
}
