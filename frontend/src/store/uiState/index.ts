import type {SubscriptionCallbackMutation} from "pinia";
import {defineStore} from "pinia";
import type {UnwrapRef} from "vue";

interface UiState {
  matchTeamSettingsExpanded: boolean,
  teamDetailsFoulsExpanded: boolean,
  teamDetailsYellowCardsExpanded: boolean,
  teamDetailsRedCardsExpanded: boolean,
}

export const useUiStateStore = defineStore('uiState', {
  state: () => {
    const defaultState: UiState = {
      matchTeamSettingsExpanded: false,
      teamDetailsFoulsExpanded: true,
      teamDetailsYellowCardsExpanded: true,
      teamDetailsRedCardsExpanded: true,
    }
    const storedData = localStorage.getItem('ui-state')
    if (storedData) {
      return {...defaultState, ...JSON.parse(storedData)}
    }
    return defaultState
  },
})

useUiStateStore().$subscribe((mutation: SubscriptionCallbackMutation<UiState>, state: UnwrapRef<UiState>) => {
  localStorage.setItem('ui-state', JSON.stringify(state))
})
