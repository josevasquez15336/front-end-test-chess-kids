import { MutationTree } from 'vuex'
 import type { Friend } from './state'
import { State } from './state'
export enum MutationTypes {
  UpdateSearchInput='UPDATE_SEARCH_INPUT',
  SetFriendsList = 'SET_FRIENDS_LIST',

}

export type Mutations = {
    [MutationTypes.UpdateSearchInput](state: State, value: string ): void;
    [MutationTypes.SetFriendsList](state: State, value: Array<Friend>  ): void;

  }
export const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.SetFriendsList](state, value) {
    state.friendsList = value
  },
 [MutationTypes.UpdateSearchInput](state, value) {
    state.searchInput = value
  },

}
