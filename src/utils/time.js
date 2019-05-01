import moment from 'moment'

export const timeFormat = (time, format = 'YYYY-MM-DD HH:mm:ss') => {
  if (!time) return

  return moment(time).format(format)
}
