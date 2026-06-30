import {reactive} from 'vue'
import type {ManualActions} from "@/providers/manualActions";
import type {ControlApi} from "@/providers/controlApi";
import {useGcStateStore} from "@/store/gcState";

// Standard PS5 DualSense / generic gamepad button labels
export const GAMEPAD_BUTTON_LABELS: Record<number, string> = {
  0: 'Cross (×)',
  1: 'Circle (○)',
  2: 'Square (□)',
  3: 'Triangle (△)',
  4: 'L1',
  5: 'R1',
  6: 'L2',
  7: 'R2',
  8: 'Create',
  9: 'Options',
  10: 'L3',
  11: 'R3',
  12: 'D-Pad ↑',
  13: 'D-Pad ↓',
  14: 'D-Pad ←',
  15: 'D-Pad →',
  16: 'PS',
  17: 'Touchpad',
}

// What action each button triggers (for display in the UI)
export const GAMEPAD_BUTTON_ACTIONS: Record<number, string> = {
  0: 'STOP',
  1: 'HALT',
  2: 'Force Start',
  3: 'Normal Start',
  4: 'Kick-off Yellow',
  5: 'Kick-off Blue',
  6: 'Direct Yellow',
  7: 'Direct Blue',
  8: 'Toggle Auto-Continue',
  9: 'Continue (action 1)',
  10: 'Timeout Yellow',
  11: 'Timeout Blue',
  12: 'Continue (action 2)',
  13: 'Continue (action 3)',
  14: 'Continue (action 4)',
  15: 'Continue (action 5)',
}

export interface GamepadControllerState {
  connected: boolean
  gamepadId: string
  activeButton: number | null
}

export class GamepadController {
  private readonly manualActions: ManualActions
  private readonly controlApi: ControlApi
  private readonly gcStateStore = useGcStateStore()
  private enabled: boolean = true
  private animationFrameId: number | null = null
  private previousButtonStates: boolean[] = []
  private currentGamepadIndex: number | null = null

  public readonly state = reactive<GamepadControllerState>({
    connected: false,
    gamepadId: '',
    activeButton: null,
  })

  constructor(manualActions: ManualActions, controlApi: ControlApi) {
    this.manualActions = manualActions
    this.controlApi = controlApi
    this.init()
  }

  public enable() {
    this.enabled = true
  }

  public disable() {
    this.enabled = false
  }

  public destroy() {
    this.stopPolling()
  }

  private init() {
    window.addEventListener('gamepadconnected', (e: GamepadEvent) => {
      this.onGamepadConnected(e.gamepad)
    })
    window.addEventListener('gamepaddisconnected', (e: GamepadEvent) => {
      this.onGamepadDisconnected(e.gamepad)
    })
    // Chrome requires user interaction before dispatching gamepadconnected.
    // Poll once at startup to detect gamepads already plugged in.
    this.checkExistingGamepads()
  }

  private checkExistingGamepads() {
    const gamepads = navigator.getGamepads()
    for (const gamepad of gamepads) {
      if (gamepad) {
        this.onGamepadConnected(gamepad)
        break
      }
    }
  }

  private onGamepadConnected(gamepad: Gamepad) {
    this.currentGamepadIndex = gamepad.index
    this.state.connected = true
    this.state.gamepadId = gamepad.id
    this.previousButtonStates = new Array(gamepad.buttons.length).fill(false)
    this.startPolling()
  }

  private onGamepadDisconnected(gamepad: Gamepad) {
    if (gamepad.index === this.currentGamepadIndex) {
      this.currentGamepadIndex = null
      this.state.connected = false
      this.state.gamepadId = ''
      this.state.activeButton = null
      this.stopPolling()
    }
  }

  private startPolling() {
    if (this.animationFrameId !== null) return
    const poll = () => {
      this.pollGamepad()
      this.animationFrameId = requestAnimationFrame(poll)
    }
    this.animationFrameId = requestAnimationFrame(poll)
  }

  private stopPolling() {
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId)
      this.animationFrameId = null
    }
  }

  private pollGamepad() {
    if (this.currentGamepadIndex === null) return
    const gamepads = navigator.getGamepads()
    const gamepad = gamepads[this.currentGamepadIndex]
    if (!gamepad) return

    gamepad.buttons.forEach((button, index) => {
      const wasPressed = this.previousButtonStates[index] ?? false
      const isPressed = button.pressed

      if (isPressed && !wasPressed) {
        // Rising edge — button just pressed
        this.state.activeButton = index
        if (this.enabled) {
          this.handleButtonPress(index)
        }
      } else if (!isPressed && wasPressed) {
        if (this.state.activeButton === index) {
          this.state.activeButton = null
        }
      }

      this.previousButtonStates[index] = isPressed
    })
  }

  private handleButtonPress(buttonIndex: number) {
    switch (buttonIndex) {
      // Face buttons
      case 0: // Cross (×) → STOP
        this.manualActions.getCommandAction('STOP').send()
        break
      case 1: // Circle (○) → HALT
        this.manualActions.getCommandAction('HALT').send()
        break
      case 2: // Square (□) → Force Start
        this.manualActions.getCommandAction('FORCE_START').send()
        break
      case 3: // Triangle (△) → Normal Start
        this.manualActions.getCommandAction('NORMAL_START').send()
        break

      // Shoulder buttons
      case 4: // L1 → Kick-off Yellow
        this.manualActions.getCommandAction('KICKOFF', 'YELLOW').send()
        break
      case 5: // R1 → Kick-off Blue
        this.manualActions.getCommandAction('KICKOFF', 'BLUE').send()
        break
      case 6: // L2 → Direct Free Kick Yellow
        this.manualActions.getCommandAction('DIRECT', 'YELLOW').send()
        break
      case 7: // R2 → Direct Free Kick Blue
        this.manualActions.getCommandAction('DIRECT', 'BLUE').send()
        break

      // Center buttons
      case 8: // Create/Share → Toggle Auto-Continue
        this.controlApi.ChangeConfig({autoContinue: !this.gcStateStore.config.autoContinue})
        break
      case 9: // Options → Continue with first available action
        this.continueWithAction(0)
        break

      // Stick clicks
      case 10: // L3 → Timeout Yellow
        this.manualActions.getCommandAction('TIMEOUT', 'YELLOW').send()
        break
      case 11: // R3 → Timeout Blue
        this.manualActions.getCommandAction('TIMEOUT', 'BLUE').send()
        break

      // D-Pad → cycle through continue actions
      case 12: // D-Pad Up → Continue action 2
        this.continueWithAction(1)
        break
      case 13: // D-Pad Down → Continue action 3
        this.continueWithAction(2)
        break
      case 14: // D-Pad Left → Continue action 4
        this.continueWithAction(3)
        break
      case 15: // D-Pad Right → Continue action 5
        this.continueWithAction(4)
        break
    }
  }

  private continueWithAction(id: number) {
    const actions = this.gcStateStore.gcState.continueActions
    if (actions && actions.length > id) {
      this.controlApi.Continue(actions[id])
    }
  }
}
