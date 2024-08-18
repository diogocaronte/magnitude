import { Application } from './core/application';
import './index.css';
import { MenuScene } from './scenes/menu';

async function init() {
    const application = new Application();
    const scene = new MenuScene({ application });
    await application.enterScene(scene);
}

document.addEventListener('DOMContentLoaded', init);
