import { EventEmitter } from 'events'
import dispatcher from '../Dispatcher'

class Store extends EventEmitter {
  save = object => {
    this.object = object
    this.emit('object-saved')
  }

  handleActions = action => {
    switch (action.type) {
      case 'SAVE_OBJECT': 
        this.save(action.object)
        break
    }
  }
}

const store = new Store()
dispatcher.register(store.handleActions)
export default store
