import Dispatcher from '../Dispatcher'
import $ from 'jquery'

export function save (object) {
  Dispatcher.dispatch({
    type : 'SAVE_OBJECT',
    object : object
  })
}
