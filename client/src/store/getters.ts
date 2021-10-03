
import { GetterTree } from 'vuex'
import { State,} from './state'

export type Getters = {
   getFriend(state: State): Function;
}

export const getters: GetterTree<State, State> & Getters = {
 getFriend(state) {
   return  (id:number) =>  state.friendsList.find(friend => friend.id == id)
 },
}
