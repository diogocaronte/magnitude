import Timer from '../timer';
import { ApplicationProps, Scene } from './types';

export class Application {
    timer: Timer;

    _scenes = new Set<Scene>();
    _cleanups = new Map<Scene, () => Promise<void> | void>();

    constructor({ autoStart = true, frameRate = 1000 / 60 } = {} as ApplicationProps) {
        this.timer = new Timer();

        this.timer.animation(this.render, 0);
        this.timer.interval(this.update, 0, frameRate);

        if (autoStart) this.timer.play();
    }

    async enterScene(scene: Scene) {
        if (this._scenes.has(scene)) return false;

        const cleanup = await scene.enter();
        this._scenes.add(scene);
        if (cleanup) this._cleanups.set(scene, cleanup);

        return true;
    }

    async leaveScene(scene: Scene) {
        if (!this._scenes.has(scene)) return false;

        const cleanup = this._cleanups.get(scene);
        if (cleanup) {
            await cleanup();
            this._cleanups.delete(scene);
        }

        await scene.leave();
        this._scenes.delete(scene);

        return true;
    }

    render = () => this._scenes.forEach((scene) => scene.render());
    update = () => this._scenes.forEach((scene) => scene.update());
}
