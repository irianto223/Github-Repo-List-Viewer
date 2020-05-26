import React, { useState, useEffect } from 'react'
import { Container, List, Input, Label } from 'semantic-ui-react'

import { fetchReposByUsername } from '../services/API'

export default (props) => {
  const [repos, reposSetter] = useState([])
  const [username, usernameSetter] = useState('telkomdev')

  const getRepos = (username) => {
    fetchReposByUsername(username)
      .then((response) => {
        if (response.status === 200) return reposSetter(response.data)
        reposSetter([])
      })
      .catch((err) => {
        console.log('Error get repos --------------->')
        console.log(err.response)
        try {
          if (err.response.status === 404) return reposSetter([])
        } catch (e) {
          console.log(e)
        }
      })
  }

  useEffect(() => {
    getRepos(username)
  }, [])

  return (
    <Container>
      <Input
        action={{
          color: 'teal',
          icon: 'search',
          onClick: () => getRepos(username)
        }}
        defaultValue='telkomdev'
        placeholder={username}
        onChange={(_, { value }) => usernameSetter(value)}
      />

      <List divided relaxed>
        {repos.map((d) => (
          <List.Item key={d.id}>
            <List.Icon name='github' size='large' verticalAlign='middle' />
            <List.Content>
              <List.Header as='a'>{d.full_name} {d.private ? <Label size="tiny">Private</Label> : null}</List.Header>
              <List.Description as='a'>{d.description || '-'}</List.Description>
            </List.Content>
          </List.Item>
        ))}
      </List>
    </Container>
  )
}
