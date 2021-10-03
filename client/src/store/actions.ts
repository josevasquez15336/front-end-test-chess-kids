import { ActionContext, ActionTree } from 'vuex'
import { Mutations, MutationTypes } from './mutations'

import { State } from './state'

export enum ActionTypes {
  UpdateSearchInput = 'UPDATE_SEARCH_INPUT',
  GetFriends = 'GET_FRIENDS'
}

type ActionAugments = Omit<ActionContext<State, State>, 'commit'> & {
    commit<K extends keyof Mutations>(
      key: K,
      payload: Parameters<Mutations[K]>[1]
    ): ReturnType<Mutations[K]>;
  }
  export type Actions = {
     [ActionTypes.UpdateSearchInput](context: ActionAugments, value: string): void;
     [ActionTypes.GetFriends](context: ActionAugments): void;
  }

export const actions: ActionTree<State, State> & Actions = {
  async [ActionTypes.GetFriends]({ commit }) {
    const response = await fetch('http://localhost:8000/api/get-friends');
    const friends = await response.json();
    commit(MutationTypes.SetFriendsList, friends)
  },
  async [ActionTypes.UpdateSearchInput]({ commit }, value ) {
          commit(MutationTypes.UpdateSearchInput, value)
   },
}
