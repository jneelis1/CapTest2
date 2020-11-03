/* eslint-disable import/prefer-default-export */
import axios from 'axios'

const URL = `https://ec2.amazonaws.com/?Action=DescribeInstances&InstanceId.1=${process.env.REACT_APP_EC2_ID}&AUTHPARAMS` // Get AUTH params too

const success = response => {
  return response.data
}

const error = err => {
  return {
    error: err,
    message: err.message,
  }
}

export const getDescribeInstance = async () => {
  try {
    const response = await axios.get(URL)
    return success(response)
  } catch (err) {
    throw error(err.response === undefined ? err : err.response.data)
  }
}
