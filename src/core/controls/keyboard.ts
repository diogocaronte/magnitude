export class KeyboardControl {
    _states: Map<string, boolean>;

    constructor() {
        this._states = new Map();
    }

    getState(code: string) {
        return this._states.get(code) ?? false;
    }

    onKeyDown = (event: KeyboardEvent) => {
        this._states.set(event.code, true);
    };

    onKeyUp = (event: KeyboardEvent) => {
        this._states.set(event.code, false);
    };

    onBlur = (_: FocusEvent) => {
        this._states.forEach((_, code) => this._states.set(code, false));
    };

    attach($element: HTMLElement) {
        $element.addEventListener('keydown', this.onKeyDown);
        $element.addEventListener('keyup', this.onKeyUp);
        window.addEventListener('blur', this.onBlur);
    }

    detach($element: HTMLElement) {
        $element.removeEventListener('keydown', this.onKeyDown);
        $element.removeEventListener('keyup', this.onKeyUp);
        window.removeEventListener('blur', this.onBlur);
    }
}
