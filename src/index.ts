import { Application } from './core/application';
import './index.css';
import { SpriteScene } from './scenes/sprites';

async function init() {
    const application = new Application();
    const scene = new SpriteScene({ application });

    if (await application.enterScene(scene)) {
        const $app = document.querySelector('#app')!;
        $app.append(scene.screen.texture);
    }
}

document.addEventListener('DOMContentLoaded', init);
