import { CircleAppearences } from '@/assets/circle';
import { EnemyAppearences } from '@/assets/enemy';
import { HeroAppearences } from '@/assets/hero';
import { PortalAppearences } from '@/assets/portal';
import { Sprites } from '@/assets/sprite';
import { CircleAppearence } from '@/components/circle/appearence';
import { EnemyAppearence } from '@/components/enemy/appearence';
import { HeroAppearence } from '@/components/hero/appearence';
import { PortalAppearence } from '@/components/portal/appearence';
import { Radius } from '@/components/radius';
import { Sprite } from '@/components/sprite';
import { Transform } from '@/components/transform';
import { PI_1_4, PI_2, PI_2_3 } from '@/utils/math';
import { defineQuery } from 'bitecs';
import { CreateRendererProps } from './types';

export function createRenderer({ world }: CreateRendererProps) {
    const circles = defineQuery([Transform, Radius, CircleAppearence]);
    const portals = defineQuery([Transform, Radius, PortalAppearence]);
    const heroes = defineQuery([Transform, Radius, HeroAppearence]);
    const enemies = defineQuery([Transform, Radius, EnemyAppearence]);
    const sprites = defineQuery([Transform, Sprite]);

    return () => {
        const { screen, viewport, bitworld } = world;
        const { context } = screen;

        context.clearRect(0, 0, context.canvas.width, context.canvas.height);

        context.save();

        const { width, height } = context.canvas;

        context.translate(width / 2, height / 2);
        context.scale(viewport.scale, viewport.scale);
        context.translate(-viewport.x, -viewport.y);

        for (let enemy of enemies(bitworld)) {
            const appearence = EnemyAppearences[EnemyAppearence.value[enemy]];

            context.fillStyle = appearence.fillColor;
            context.strokeStyle = appearence.strokeColor;

            context.beginPath();
            context.arc(Transform.x[enemy], Transform.y[enemy], Radius.value[enemy], 0, PI_2);
            context.fill();
            context.stroke();
        }

        for (let entity of circles(bitworld)) {
            const appearence = CircleAppearences[CircleAppearence.value[entity]];

            context.fillStyle = appearence.fillColor;
            context.strokeStyle = appearence.strokeColor;

            context.beginPath();
            context.arc(Transform.x[entity], Transform.y[entity], Radius.value[entity], 0, PI_2);
            context.fill();
            context.stroke();
        }

        for (let entity of portals(bitworld)) {
            const appearence = PortalAppearences[PortalAppearence.value[entity]];

            context.fillStyle = appearence.fillColor;
            context.strokeStyle = appearence.strokeColor;

            context.beginPath();
            context.arc(Transform.x[entity], Transform.y[entity], Radius.value[entity], 0, PI_2);
            context.fill();
            context.stroke();
        }

        for (const sprite of sprites(bitworld)) {
            const spriteAsset = Sprites[Sprite.index[sprite]];

            context.save();
            context.translate(Transform.x[sprite], Transform.y[sprite]);
            context.rotate(Transform.angle[sprite]);

            context.drawImage(
                spriteAsset.image,
                spriteAsset.sourceX,
                spriteAsset.sourceY,
                spriteAsset.sourceW,
                spriteAsset.sourceH,
                Sprite.offsetX[sprite],
                Sprite.offsetY[sprite],
                Sprite.destinationW[sprite],
                Sprite.destinationH[sprite],
            );

            context.restore();
        }

        for (const hero of heroes(bitworld)) {
            const appearence = HeroAppearences[HeroAppearence.value[hero]];

            context.fillStyle = appearence.fillColor;
            context.strokeStyle = appearence.strokeColor;

            context.save();
            context.translate(Transform.x[hero], Transform.y[hero]);
            context.rotate(Transform.angle[hero]);

            context.rotate(-PI_1_4);
            context.fillRect(0, 0, Radius.value[hero], Radius.value[hero]);
            context.strokeRect(0, 0, Radius.value[hero], Radius.value[hero]);

            context.rotate(PI_2_3);
            context.fillRect(0, 0, Radius.value[hero], Radius.value[hero]);
            context.strokeRect(0, 0, Radius.value[hero], Radius.value[hero]);

            context.rotate(PI_2_3);
            context.fillRect(0, 0, Radius.value[hero], Radius.value[hero]);
            context.strokeRect(0, 0, Radius.value[hero], Radius.value[hero]);

            context.beginPath();
            context.fillStyle = appearence.fillColorCircle;
            context.arc(0, 0, (Radius.value[hero] * 2) / 3, 0, PI_2);
            context.fill();

            context.restore();
        }

        context.restore();
    };
}
