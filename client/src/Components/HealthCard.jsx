import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import ProgressBar from './ProgressBar'
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline'
import {getDescribeInstance} from '../services/health.service'

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  mainDiv: {
    textAlign: 'center',
    paddingTop: '2.5em',
    paddingBottom: '2.5em',
  },
})

export default function SimpleCard() {
  const classes = useStyles()
  const [isLoading, setIsLoading] = React.useState(true)
  const [error, setError] = React.useState({
    error: false,
    message: '',
  })
  const [data, setData] = React.useState([])

  React.useEffect(() => {
    let response = []
    const getHealth = () => {
      return getDescribeInstance()
        .then(res => {
          response = res
          setIsLoading(false)
          setData(response)
        })
        .catch(error => {
          setError({
            error: true,
            message: error.message,
          })
          setIsLoading(false)
        })
    }
  }, [])

  return (
    <Card className={classes.root}>
      <CardContent>
        <div className={classes.mainDiv}>
          <Typography variant="h4" style={{ color: 'green' }}>
            <span style={{ paddingRight: '0.75em' }}>
              Webscraper is up and running!
            </span>
            <CheckCircleOutlineIcon fontSize="large" />
          </Typography>
          <Typography variant="h5">Sites visted: 67</Typography>
          <Typography variant="h6">Time Elapsed: 3:27:10s</Typography>
        </div>
        <ProgressBar />
      </CardContent>
    </Card>
  )
}
