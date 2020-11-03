import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableFooter from '@material-ui/core/TableFooter'
import TablePagination from '@material-ui/core/TablePagination'
import Paper from '@material-ui/core/Paper'
import { Typography } from '@material-ui/core'
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'
import FirstPageIcon from '@material-ui/icons/FirstPage'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight'
import LastPageIcon from '@material-ui/icons/LastPage'
import OutlinedFlagRoundedIcon from '@material-ui/icons/OutlinedFlagRounded'
import FlagRoundedIcon from '@material-ui/icons/FlagRounded'
var moment = require('moment') // require

const useStyles = makeStyles({
  table: {
    minWidth: 500,
  },
  favoriteCol: {
    cursor: 'pointer',
  },
  tablecell: {
    fontSize: 18,
  },
})

const useStyles1 = makeStyles(theme => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}))

function TablePaginationActions(props) {
  const classes = useStyles1()
  const theme = useTheme()
  const { count, page, rowsPerPage, onChangePage } = props

  const handleFirstPageButtonClick = event => {
    onChangePage(event, 0)
  }

  const handleBackButtonClick = event => {
    onChangePage(event, page - 1)
  }

  const handleNextButtonClick = event => {
    onChangePage(event, page + 1)
  }

  const handleLastPageButtonClick = event => {
    onChangePage(
      event,
      Math.max(0, Math.ceil(count / rowsPerPage) - 1),
    )
  }

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? (
          <LastPageIcon />
        ) : (
          <FirstPageIcon />
        )}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? (
          <FirstPageIcon />
        ) : (
          <LastPageIcon />
        )}
      </IconButton>
    </div>
  )
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
}

function createData(id, info, score, date, link, hits, flagged) {
  info = info.slice(1, -1)
  return { id, info, score, date, link, hits, flagged }
}

export default function DataTable(props) {
  const classes = useStyles()
  const { handleUpdateFlaggedCallback } = props
  const { searchTerm } = props
  const { filterFlagged } = props
  const { switchTabCB } = props
  const { minScore } = props

  const [data, setData] = React.useState([])
  const [rows, setRows] = React.useState([])
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(5)

  const emptyRows =
    rowsPerPage -
    Math.min(rowsPerPage, rows.length - page * rowsPerPage)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  React.useEffect(() => {
    const convertDataToRows = data => {
      let rows = []
      data.forEach(row => {
        rows.push(
          createData(
            row.id,
            row.textfound,
            row.score,
            row.datefound,
            row.url,
            row.hits,
            row.flagged,
          ),
        )
      })
      if (searchTerm.length > 0) {
        rows = filterRows(rows, searchTerm.toLowerCase())
      }
      rows = rows.filter(row => {
        return row.score >= minScore
      })
      rows = filterFlagged
        ? rows.filter(row => {
            return row.flagged
          })
        : rows
      setRows(rows)
    }
    setData(props.data)
    convertDataToRows(props.data)
  }, [props, searchTerm, minScore, filterFlagged])

  const handleUpdateFlagged = event => {
    const index = event.currentTarget.value
    const id = rows[index].id
    const flagged = rows[index].flagged
    const success = handleUpdateFlaggedCallback(id, flagged)
    if (success) {
      let updatedData = [...data]
      let elIndex = updatedData.findIndex(el => el.id === id)
      updatedData[elIndex].flagged = !flagged
      setData([...updatedData])

      let updatedRows = [...rows]
      updatedRows[index].flagged = !flagged
      setRows([...updatedRows])
    }
  }

  const filterRows = (rows, term) => {
    return rows.filter(row => {
      return row.info.toLowerCase().includes(term)
    })
  }

  return (
    <TableContainer component={Paper}>
      <Table
        className={classes.table}
        aria-label="Data scraping table"
      >
        {data.length > 0 ? (
          <React.Fragment>
            <TableHead>
              <TableRow>
                <TableCell align="center">Flagged</TableCell>
                <TableCell align="center">Terms Found</TableCell>
                <TableCell align="center">
                  <Tooltip
                    title="Threat level out of 10"
                    placement="bottom"
                    arrow
                    style={{ marginTop: '10px' }}
                  >
                    <span>Score</span>
                  </Tooltip>
                </TableCell>
                <TableCell align="center">Hits</TableCell>
                <TableCell align="center">Date Found</TableCell>
                <TableCell align="center">Details</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? rows.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage,
                  )
                : rows
              ).map((row, index) => (
                <TableRow key={row.id}>
                  <TableCell
                    align="center"
                    component="th"
                    scope="row"
                  >
                    <IconButton
                      onClick={handleUpdateFlagged}
                      value={index}
                      className={classes.favoriteCol}
                    >
                      {row.flagged ? (
                        <FlagRoundedIcon
                          fontSize="large"
                          style={{ color: '#22559e' }}
                        />
                      ) : (
                        <OutlinedFlagRoundedIcon fontSize="large" />
                      )}
                    </IconButton>
                  </TableCell>
                  <TableCell
                    align="center"
                    className={classes.tablecell}
                  >
                    {row.info}
                  </TableCell>
                  <TableCell
                    align="center"
                    className={classes.tablecell}
                  >
                    {row.score}
                  </TableCell>
                  <TableCell
                    align="center"
                    className={classes.tablecell}
                  >
                    {row.hits}
                  </TableCell>
                  <TableCell
                    align="center"
                    className={classes.tablecell}
                  >
                    {moment(row.date).format('YYYY-MM-DD HH:mm:ss')}
                  </TableCell>
                  <TableCell
                    align="center"
                    className={classes.tablecell}
                  >
                    {row.link}
                    <IconButton
                      onClick={() => {
                        switchTabCB(data[index].id)
                      }}
                    >
                      <KeyboardArrowRight
                        style={{ color: '#22559e' }}
                      />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[
                    5,
                    10,
                    25,
                    { label: 'All', value: -1 },
                  ]}
                  count={rows.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: { 'aria-label': 'rows per page' },
                    native: true,
                  }}
                  onChangePage={handleChangePage}
                  onChangeRowsPerPage={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </React.Fragment>
        ) : (
          <TableCell style={{ textAlign: 'center' }}>
            <Typography variant="h6">No data available</Typography>
          </TableCell>
        )}
      </Table>
    </TableContainer>
  )
}
