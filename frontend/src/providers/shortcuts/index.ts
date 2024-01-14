import {Command_Type} from "@/proto/ssl_gc_state";
import {Team} from "@/proto/ssl_gc_common";
import type {ManualActions} from "@/providers/manualActions";


export class Shortcuts {
  private readonly manualActions: ManualActions
  private enabled: boolean = true

  constructor(manualActions: ManualActions) {
    this.manualActions = manualActions
    this.enabled = true
  }

  public enable() {
    this.enabled = true
  }

  public disable() {
    this.enabled = false
  }

  public keyListenerCommands(e: KeyboardEvent) {
    // Always allow escape
    if (e.code === 'Escape') {
      this.manualActions.getCommandAction(Command_Type.HALT).send()
    }

    if (!this.enabled) {
      // Shortcuts are disabled
      return
    }

    switch (e.code) {
      case "Numpad0":
        this.manualActions.getCommandAction(Command_Type.STOP).send()
        break
      case "NumpadDecimal":
        this.manualActions.getCommandAction(Command_Type.HALT).send()
        break
      case "Numpad5":
        this.manualActions.getCommandAction(Command_Type.FORCE_START).send()
        break
      case "Numpad2":
        this.manualActions.getCommandAction(Command_Type.NORMAL_START).send()
        break
      case "Numpad1":
        this.manualActions.getCommandAction(Command_Type.DIRECT, Team.YELLOW).send()
        break
      case "Numpad3":
        this.manualActions.getCommandAction(Command_Type.DIRECT, Team.BLUE).send()
        break
      case "Numpad4":
        this.manualActions.getCommandAction(Command_Type.KICKOFF, Team.YELLOW).send()
        break
      case "Numpad6":
        this.manualActions.getCommandAction(Command_Type.KICKOFF, Team.BLUE).send()
        break
      case "Numpad7":
        this.manualActions.getCommandAction(Command_Type.TIMEOUT, Team.YELLOW).send()
        break
      case "Numpad9":
        this.manualActions.getCommandAction(Command_Type.TIMEOUT, Team.BLUE).send()
        break
      case "NumpadEnter":
        this.manualActions.getContinueAction().send()
        break
    }
    e.preventDefault()
  }
}