import { Application } from './core/application';
import './index.css';
import { BattleScene } from './scenes/battle';

async function init() {
    const application = new Application();
    const $container = document.querySelector('#app') as HTMLElement;
    const scene = new BattleScene({ application, $container });
    await application.enterScene(scene);
}

document.addEventListener('DOMContentLoaded', init);
