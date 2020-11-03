import React from 'react'
import Typography from '@material-ui/core/Typography'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import Table from '../Table'
import SearchBar from '../SearchBar'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import {
  getAll,
  updateFlagged,
} from '../../services/webscraper.service'
import LoadingCard from '../LoadingCard'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Grid from '@material-ui/core/Grid'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'

const useStyles = makeStyles(theme => ({
  gmHeader: {
    textAlign: 'center',
    marginTop: 25,
    marginBottom: 25,
  },
  loadingDiv: {
    textAlign: 'center',
    marginTop: '10em',
  },
  error: {
    padding: 10,
    color: 'red',
    textAlign: 'center',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    display: 'flex',
  },
}))

const BlueCheckbox = withStyles({
  root: {
    color: '#22559e',
    '&$checked': {
      color: '#22559e',
    },
  },
  checked: {},
})(props => <Checkbox color="default" {...props} />)

toast.configure()
function AppBody(props) {
  const [data, setData] = React.useState([])
  const classes = useStyles()
  const [isLoading, setIsLoading] = React.useState(true)
  const [error, setError] = React.useState({
    error: false,
    message: '',
  })
  const [searchTerm, setSearchTerm] = React.useState('')
  const [filterFlagged, setFilterFlagged] = React.useState(false)
  const [minScore, setMinScore] = React.useState(5)

  const { switchTabCB } = props

  React.useEffect(() => {
    let response = []
    const getScrapes = () => {
      return getAll()
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
    getScrapes()
  }, [])

  const handleUpdateFlagged = (id, favorite) => {
    return updateFlagged(id, favorite)
      .then(response => {
        if (response.code === 200) {
          return true
        }
      })
      .catch(err => {
        toast.error(err.message, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
        })
      })
  }

  const handleFilterFlaggedChanged = event => {
    setFilterFlagged(event.target.checked)
  }

  const handleScoreListChange = event => {
    setMinScore(event.target.value)
  }

  const loadingTable = (
    <div className={classes.loadingDiv}>
      <LoadingCard fetchType={'Data'} />
    </div>
  )
  const dataTable = (
    <Card raised="true">
      {error.error ? (
        <div className={classes.error}>
          <Typography variant="h5">Something went wrong!</Typography>
          <Typography>{error.message}</Typography>
        </div>
      ) : (
        <CardContent>
          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="flex-end"
          >
            <Grid item>
              <SearchBar searchTermCallback={setSearchTerm} />
            </Grid>
            <Grid item>
              <FormControlLabel
                control={
                  <BlueCheckbox
                    checked={filterFlagged}
                    onChange={handleFilterFlaggedChanged}
                    name="showFlagged"
                  />
                }
                label="Show Flagged"
              />
            </Grid>
            <FormControl className={classes.formControl}>
              <InputLabel id="min-score-label">Score</InputLabel>
              <Select
                labelId="min-score-label"
                id="min-score-select"
                value={minScore}
                onChange={handleScoreListChange}
              >
                {[...Array(11)].map((value, index) => (
                  <MenuItem value={index}>{index}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Table
            searchTerm={searchTerm}
            data={data}
            error={error}
            handleUpdateFlaggedCallback={handleUpdateFlagged}
            filterFlagged={filterFlagged}
            switchTabCB={switchTabCB}
            minScore={minScore}
          />
        </CardContent>
      )}
    </Card>
  )

  return (
    <React.Fragment>
      <div className={classes.gmHeader}>
        <Typography variant="h3">GM Dark Web Scraper</Typography>
      </div>
      {isLoading ? loadingTable : dataTable}
    </React.Fragment>
  )
}

export default AppBody
