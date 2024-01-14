import {Command_Type} from "@/proto/ssl_gc_state";
import {Team} from "@/proto/ssl_gc_common";
import {isPausedStage} from "@/helpers";
import type {ControlApi} from "@/providers/controlApi";
import {useMatchStateStore} from "@/store/matchState";
import {commandName} from "@/helpers/texts";
import {useGcStateStore} from "@/store/gcState";
import {ContinueAction_State} from "@/proto/ssl_gc_engine";

export interface ManualAction {
  send: () => void,
  enabled: boolean,
  label: string,
  shortcutLabel?: string,
  team: Team | undefined,
}

export class ManualActions {
  private readonly matchStateStore = useMatchStateStore()
  private readonly gcStateStore = useGcStateStore()
  private readonly controlApi: ControlApi

  constructor(controlApi: ControlApi) {
    this.controlApi = controlApi;
  }

  public getContinueAction(): ManualAction {
    const continueAction = this.gcStateStore.gcState.continueActions?.[0]
    const enabled = continueAction?.state === ContinueAction_State.READY_AUTO
      || continueAction?.state === ContinueAction_State.READY_MANUAL
      || continueAction?.state === ContinueAction_State.WAITING
    return {
      send: () => continueAction && this.controlApi.Continue(continueAction),
      enabled: enabled,
      label: "Continue",
      shortcutLabel: "NumpadEnter",
      team: undefined,
    }
  }

  public getCommandAction(commandType: Command_Type, forTeam?: Team): ManualAction {
    return {
      send: () => this.sendCommand(commandType, forTeam),
      enabled: this.isCommandEnabled(commandType),
      label: this.getCommandLabel(commandType, forTeam),
      shortcutLabel: this.shortcutLabel(commandType, forTeam),
      team: forTeam,
    }
  }

  private getCommandLabel(commandType: Command_Type, forTeam?: Team): string {
    const timeoutRunning = this.matchStateStore.isTimeout
      && this.matchStateStore.matchState.gameState?.forTeam === forTeam
    if (commandType === Command_Type.TIMEOUT) {
      return timeoutRunning ? "Stop Timeout" : "Start Timeout"
    }
    return commandName(commandType)
  }

  private sendCommand(commandType: Command_Type, forTeam?: Team) {
    if (!this.isCommandEnabled(commandType)) {
      return
    }

    if (this.matchStateStore.isTimeout) {
      this.controlApi.NewCommandNeutral(Command_Type.STOP)
      return
    }

    if (forTeam) {
      this.controlApi.NewCommandForTeam(commandType, forTeam)
    } else {
      this.controlApi.NewCommandNeutral(commandType)
    }
  }

  private isCommandEnabled(commandType: Command_Type): boolean {
    switch (commandType) {
      case Command_Type.HALT:
        return this.matchStateStore.matchState.command!.type !== Command_Type.HALT
          && this.matchStateStore.matchState.command!.type !== Command_Type.TIMEOUT
      case Command_Type.STOP:
        return !this.matchStateStore.isStop
          && !isPausedStage(this.matchStateStore.matchState.stage!)
      case Command_Type.NORMAL_START:
        return this.matchStateStore.matchState.command!.type !== Command_Type.NORMAL_START
          && (this.matchStateStore.isKickoff || this.matchStateStore.isPenalty)
      case Command_Type.FORCE_START:
        return this.matchStateStore.isStop
      case Command_Type.DIRECT:
        return this.matchStateStore.isStop
      case Command_Type.KICKOFF:
        return this.matchStateStore.isStop
      case Command_Type.PENALTY:
        return this.matchStateStore.isStop
      case Command_Type.TIMEOUT:
        return (this.matchStateStore.isStop || this.matchStateStore.isHalt || this.matchStateStore.isTimeout)
          && !isPausedStage(this.matchStateStore.matchState.stage!)
    }
    return false
  }

  private shortcutLabel(commandType: Command_Type, team?: Team): string | undefined {
    switch (commandType) {
      case Command_Type.HALT:
        return "NumpadDecimal"
      case Command_Type.STOP:
        return "Numpad0"
      case Command_Type.NORMAL_START:
        return "Numpad2"
      case Command_Type.FORCE_START:
        return "Numpad5"
      case Command_Type.DIRECT:
        switch (team) {
          case Team.YELLOW:
            return "Numpad1"
          case Team.BLUE:
            return "Numpad3"
        }
        return undefined
      case Command_Type.KICKOFF:
        switch (team) {
          case Team.YELLOW:
            return "Numpad4"
          case Team.BLUE:
            return "Numpad6"
        }
        return undefined
      case Command_Type.PENALTY:
        return undefined
      case Command_Type.TIMEOUT:
        switch (team) {
          case Team.YELLOW:
            return "Numpad7"
          case Team.BLUE:
            return "Numpad9"
        }
        return undefined
    }
    return undefined
  }
}
