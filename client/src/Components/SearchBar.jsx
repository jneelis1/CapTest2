import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import { IconButton } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}))

export default function BasicTextFields(props) {
  const classes = useStyles()
  const { searchTermCallback } = props

  const handleSearchTermChange = e => {
    searchTermCallback(e.target.value)
  }

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <TextField
        id="standard-basic"
        label="Search"
        onChange={handleSearchTermChange}
        InputProps={{
          endAdornment: (
            <IconButton
              onClick={() => console.log('Adding term to filter by')}
            >
              <AddCircleOutlineIcon  />
            </IconButton>
          ),
        }}
      />
    </form>
  )
}
