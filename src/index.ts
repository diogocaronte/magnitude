import { Application } from './core/application';
import './index.css';
import { SpriteScene } from './scenes/sprites';

async function init() {
    const application = new Application();
    const $container = document.querySelector('#app') as HTMLElement;
    const scene = new SpriteScene({ application, $container });
    await application.enterScene(scene);
}

document.addEventListener('DOMContentLoaded', init);
