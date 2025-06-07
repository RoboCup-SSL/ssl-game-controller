import {type Command_TypeJson} from "@/proto/state/ssl_gc_state_pb";
import {type TeamJson} from "@/proto/state/ssl_gc_common_pb";
import {isPausedStage} from "@/helpers";
import type {ControlApi} from "@/providers/controlApi";
import {useMatchStateStore} from "@/store/matchState";
import {commandName} from "@/helpers/texts";

export interface ManualAction {
  send: () => void,
  enabled: boolean,
  label: string,
  shortcutLabel?: string,
  team?: TeamJson,
}

export class ManualActions {
  private readonly matchStateStore = useMatchStateStore()
  private readonly controlApi: ControlApi

  constructor(controlApi: ControlApi) {
    this.controlApi = controlApi;
  }

  public getCommandAction(commandType: Command_TypeJson, forTeam?: TeamJson): ManualAction {
    return {
      send: () => this.sendCommand(commandType, forTeam),
      enabled: this.isCommandEnabled(commandType),
      label: this.getCommandLabel(commandType, forTeam),
      shortcutLabel: this.shortcutLabel(commandType, forTeam),
      team: forTeam,
    }
  }

  private getCommandLabel(commandType: Command_TypeJson, forTeam?: TeamJson): string {
    const timeoutRunning = this.matchStateStore.isTimeout
      && this.matchStateStore.matchState.gameState?.forTeam === forTeam
    if (commandType === 'TIMEOUT') {
      return timeoutRunning ? "Stop Timeout" : "Start Timeout"
    }
    return commandName(commandType)
  }

  private sendCommand(commandType: Command_TypeJson, forTeam?: TeamJson) {
    if (!this.isCommandEnabled(commandType)) {
      return
    }

    if (this.matchStateStore.isTimeout) {
      this.controlApi.NewCommandNeutral('STOP')
      return
    }

    if (forTeam) {
      this.controlApi.NewCommandForTeam(commandType, forTeam)
    } else {
      this.controlApi.NewCommandNeutral(commandType)
    }
  }

  private isCommandEnabled(commandType: Command_TypeJson): boolean {
    switch (commandType) {
      case 'HALT':
        return this.matchStateStore.matchState.command!.type !== 'HALT'
          && this.matchStateStore.matchState.command!.type !== 'TIMEOUT'
      case 'STOP':
        return !this.matchStateStore.isStop
          && !isPausedStage(this.matchStateStore.matchState.stage!)
      case 'NORMAL_START':
        return this.matchStateStore.matchState.command!.type !== 'NORMAL_START'
          && (this.matchStateStore.isKickoff || this.matchStateStore.isPenalty)
      case 'FORCE_START':
        return this.matchStateStore.isStop
      case 'DIRECT':
        return this.matchStateStore.isStop
      case 'KICKOFF':
        return this.matchStateStore.isStop
      case 'PENALTY':
        return this.matchStateStore.isStop
      case 'TIMEOUT':
        return (this.matchStateStore.isStop || this.matchStateStore.isHalt || this.matchStateStore.isTimeout)
          && !isPausedStage(this.matchStateStore.matchState.stage!)
    }
    return false
  }

  private shortcutLabel(commandType: Command_TypeJson, team?: TeamJson): string | undefined {
    switch (commandType) {
      case 'HALT':
        return "NumpadDecimal"
      case 'STOP':
        return "Numpad0"
      case 'NORMAL_START':
        return "Numpad2"
      case 'FORCE_START':
        return "Numpad5"
      case 'DIRECT':
        switch (team) {
          case 'YELLOW':
            return "Numpad1"
          case 'BLUE':
            return "Numpad3"
        }
        return undefined
      case 'KICKOFF':
        switch (team) {
          case 'YELLOW':
            return "Numpad4"
          case 'BLUE':
            return "Numpad6"
        }
        return undefined
      case 'PENALTY':
        return undefined
      case 'TIMEOUT':
        switch (team) {
          case 'YELLOW':
            return "Numpad7"
          case 'BLUE':
            return "Numpad9"
        }
        return undefined
    }
    return undefined
  }
}
