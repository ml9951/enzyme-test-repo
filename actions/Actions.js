import Dispatcher from '../Dispatcher'

export function save (object) {
  Dispatcher.dispatch({
    type : 'SAVE_OBJECT',
    object : object
  })
}
