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
      this.manualActions.getCommandAction('HALT').send()
    }

    if (!this.enabled) {
      // Shortcuts are disabled
      return
    }

    switch (e.code) {
      case "Numpad0":
        this.manualActions.getCommandAction('STOP').send()
        break
      case "NumpadDecimal":
        this.manualActions.getCommandAction('HALT').send()
        break
      case "Numpad5":
        this.manualActions.getCommandAction('FORCE_START').send()
        break
      case "Numpad2":
        this.manualActions.getCommandAction('NORMAL_START').send()
        break
      case "Numpad1":
        this.manualActions.getCommandAction('DIRECT', 'YELLOW').send()
        break
      case "Numpad3":
        this.manualActions.getCommandAction('DIRECT', 'BLUE').send()
        break
      case "Numpad4":
        this.manualActions.getCommandAction('KICKOFF', 'YELLOW').send()
        break
      case "Numpad6":
        this.manualActions.getCommandAction('KICKOFF', 'BLUE').send()
        break
      case "Numpad7":
        this.manualActions.getCommandAction('TIMEOUT', 'YELLOW').send()
        break
      case "Numpad9":
        this.manualActions.getCommandAction('TIMEOUT', 'BLUE').send()
        break
      case "NumpadEnter":
        this.manualActions.getContinueAction().send()
        break
      default:
        return
    }
    e.preventDefault()
  }
}
