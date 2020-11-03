import React from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Grid from '@material-ui/core/Grid'
import Progress from './ProgressCircle'
import Typography from '@material-ui/core/Typography'

export default function LoadingCard(props) {
  const { fetchType } = props

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      style={{ minHeight: '100vh' }}
    >
      <Grid item xs={3}>
        <Card raised="true">
          <CardContent>
            <Typography variant="h4">
              Fetching {fetchType}&nbsp;&nbsp;
              <Progress />
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}
