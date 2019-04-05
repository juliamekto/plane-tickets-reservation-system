let nextUser = 0

export const addLogData = ( email, password ) => ({
  type: 'ADD_LOG_DATA',
  id: nextUser++,
  email,
  password
})