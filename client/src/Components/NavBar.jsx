/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import AppBody from './Layouts/Body'
import ObjDetails from './Layouts/Details'
import Health from './Layouts/Health';

function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  indicator: {
    backgroundColor: 'silver',
  },
}))

export default function SimpleTabs() {
  const classes = useStyles()
  const [value, setValue] = React.useState(0)
  const [detailId, setDetailId] = React.useState(null)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const handleDetailLinkClicked = (id) => {
    setDetailId(id)
    setValue(1)
  }

  return (
    <div className={classes.root}>
      <AppBar position="static" style={{ background: '#22559e' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
          classes={{ indicator: classes.indicator }}
        >
          <Tab label="Home" {...a11yProps(0)} />
          <Tab label="Details" {...a11yProps(1)} />
          <Tab label="Health" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <AppBody switchTabCB={handleDetailLinkClicked}/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ObjDetails lookupId={detailId}/>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Health />
      </TabPanel>
    </div>
  )
}
