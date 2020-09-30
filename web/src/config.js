export const URL = window.location.origin
// export const WEBSOCKET_URL =
//   URL === 'http://localhost:8910/'
//     ? 'http://127.0.0.1:4001'
//     : 'https://afakeartistgoestony.herokuapp.com/'
export const WEBSOCKET_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://127.0.0.1:4001'
    : 'https://afakeartistgoestony.herokuapp.com/'
// export const WEBSOCKET_URL = 'http://127.0.0.1:4001'

export const COLORS = [
  '#F56565',
  '#ED8936',
  '#ECC94B',
  '#48BB78',
  '#38B2AC',
  '#4299E1',
  '#667EEA',
  '#9F7AEA',
  '#ED64A6',
]
