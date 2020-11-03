import React from 'react'
import Header from './Components/Layouts/Header'
import {
  withAuthenticator,
  AmplifySignOut,
} from '@aws-amplify/ui-react'

function App() {
  return (
    <React.Fragment>
      <Header />
      <AmplifySignOut />
    </React.Fragment>
  )
}

export default withAuthenticator(App)
