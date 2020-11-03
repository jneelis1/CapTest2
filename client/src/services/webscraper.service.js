import http from '../http-common'

const success = response => {
  return response.data
}

const error = err => {
  return {
    error: err,
    message: err.message,
  }
}

export const getAll = async () => {
  try {
    const response = await http.get('/')
    console.log(response)
    return success(response)
  } catch (err) {
    console.log(err)
    console.log(err.message)

    throw error(err.response === undefined ? err : err.response.data)
  }
}

export const getOne = async id => {
  try {
    const response = await http.get(`/${id}`)
    return success(response)
  } catch (err) {
    throw error(err.response === undefined ? err : err.response.data)
  }
}

export const updateFlagged = async (id, flagged) => {
  try {
    const URL = `/flagged?id=${id}&flagged=${!flagged}`
    const response = await http.put(URL)
    return response
  } catch (err) {
    throw error(err.response === undefined ? err : err.response.data)
  }
}

export const deleteOne = async id => {
  try {
    const response = await http.delete(`/${id}`)
    return response
  } catch (err) {
    throw error(err.response === undefined ? err : err.response.data)
  }
}
