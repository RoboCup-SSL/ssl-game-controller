import type {ManualActions} from "@/providers/manualActions";
import type {ControlApi} from "@/providers/controlApi";
import {useGcStateStore} from "@/store/gcState";


export class Shortcuts {
  private readonly manualActions: ManualActions
  private readonly controlApi: ControlApi
  private readonly gcStateStore = useGcStateStore()
  private enabled: boolean = true

  constructor(manualActions: ManualActions, controlApi: ControlApi) {
    this.manualActions = manualActions
    this.controlApi = controlApi
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

    if (e.key === " ") {
      this.toggleAutoContinue()
      e.preventDefault()
      return
    } else if (e.code.startsWith('Digit') && !isNaN(Number(e.key))) {
      const id = Number(e.key)
      this.continueWithAction(id - 1)
      e.preventDefault()
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
        this.continueWithAction(0)
        break
      default:
        return
    }
    e.preventDefault()
  }

  private continueWithAction(id: number) {
    if (this.gcStateStore.gcState.continueActions!.length > id) {
      this.controlApi.Continue(this.gcStateStore.gcState.continueActions![id])
    }
  }

  private toggleAutoContinue() {
    this.controlApi.ChangeConfig({autoContinue: !this.gcStateStore.config.autoContinue})
  }
}
