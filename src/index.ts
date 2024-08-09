import { Application } from './core/application';
import './index.css';
import { CircleScene } from './scenes/circles';

async function init() {
    const application = new Application();
    const scene = new CircleScene({ application });

    if (await application.enterScene(scene)) {
        const $app = document.querySelector('#app')!;
        $app.append(scene.screen.texture);
    }
}

document.addEventListener('DOMContentLoaded', init);
