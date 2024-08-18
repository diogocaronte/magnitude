import { Application } from '@/core/application';
import { Scene } from '@/core/application/types';
import Menu from '@/ui/menu.svelte';
import { CircleScene } from '../circles';
import { MenuSceneProps } from './types';

export class MenuScene implements Scene {
    application: Application;

    constructor(props: MenuSceneProps) {
        this.application = props.application;
    }

    async enter() {
        const $app = document.querySelector('#app')!;

        const menu = new Menu({ target: $app });

        menu.$on('start', () => {
            this.application.leaveScene(this);
            this.application.enterScene(new CircleScene({ application: this.application }));
        });

        return () => {
            menu.$destroy();
        };
    }

    async leave() {}

    render() {}

    update() {}
}
