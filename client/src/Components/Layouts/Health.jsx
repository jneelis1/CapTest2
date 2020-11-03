import React from 'react'
import { makeStyles } from '@material-ui/core'
import HealthCard from '../HealthCard'


const useStyles = makeStyles({
  center: {
    textAlign: 'center',
  },
  header: {
    textAlign: 'center',
  },
})

export default function Health() {
  const classes = useStyles()

  return (
    <div className={classes.center}>
      <div className={classes.header}>
        <h1>Health of the Web Scraper</h1>
      </div>
      <HealthCard />
    </div>
  )
}
