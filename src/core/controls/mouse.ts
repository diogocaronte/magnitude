export class MouseControl {
    _states: Map<number, boolean>;

    x: number = 0;
    y: number = 0;
    worldX: number = 0;
    worldY: number = 0;

    constructor() {
        this._states = new Map();
    }

    getState(code: number) {
        return this._states.get(code) ?? false;
    }

    onMouseDown = (event: MouseEvent) => {
        this._states.set(event.button, true);
        this.x = event.clientX;
        this.y = event.clientY;
    };

    onMouseUp = (event: MouseEvent) => {
        this._states.set(event.button, false);
        this.x = event.clientX;
        this.y = event.clientY;
    };

    onMouseMove = (event: MouseEvent) => {
        this.x = event.clientX;
        this.y = event.clientY;
    };

    attach($element: HTMLElement) {
        $element.addEventListener('mousedown', this.onMouseDown);
        $element.addEventListener('mouseup', this.onMouseUp);
        window.addEventListener('mousemove', this.onMouseMove);
    }

    detach($element: HTMLElement) {
        $element.removeEventListener('mousedown', this.onMouseDown);
        $element.removeEventListener('mouseup', this.onMouseUp);
        window.removeEventListener('mousemove', this.onMouseMove);
    }
}
