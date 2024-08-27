import { CircleAppearences } from '@/assets/circle';
import { CircleAppearenceEnum } from '@/assets/circle/types';
import { PortalAppearences } from '@/assets/portal';
import { Sprites } from '@/assets/sprite';
import { CircleAppearence } from '@/components/circle/appearence';
import { CircleCollision } from '@/components/circle/collision';
import { PortalAppearence } from '@/components/portal/appearence';
import { Position } from '@/components/position';
import { Radius } from '@/components/radius';
import { Sprite } from '@/components/sprite';
import { CircleCollisionData } from '@/data/circle/collision';
import { PlayerTag } from '@/tags/player';
import { TWO_PI } from '@/utils/math';
import { defineQuery, Not } from 'bitecs';
import { CreateRendererProps } from './types';

export function createRenderer({ world }: CreateRendererProps) {
    const circles = defineQuery([Position, Radius, CircleAppearence]);
    const portals = defineQuery([Position, Radius, PortalAppearence]);
    const circlesCollision = defineQuery([Position, Radius, CircleAppearence, CircleCollision, Not(PlayerTag)]);
    const sprites = defineQuery([Position, Sprite]);

    return () => {
        const { screen, viewport, bitworld } = world;
        const { context } = screen;

        for (const entity of circlesCollision(bitworld)) {
            const data = CircleCollisionData[CircleCollision.index[entity]];
            CircleAppearence.value[entity] = data.check ? CircleAppearenceEnum.RED : CircleAppearenceEnum.BLUE;
        }

        context.clearRect(0, 0, context.canvas.width, context.canvas.height);

        context.save();

        const { width, height } = context.canvas;

        context.translate(width / 2, height / 2);
        context.scale(viewport.scale, viewport.scale);
        context.translate(-viewport.x, -viewport.y);

        for (let entity of circles(bitworld)) {
            const appearence = CircleAppearences[CircleAppearence.value[entity]];

            context.fillStyle = appearence.fillColor;
            context.strokeStyle = appearence.strokeColor;

            context.beginPath();
            context.arc(Position.x[entity], Position.y[entity], Radius.value[entity], 0, TWO_PI);
            context.fill();
            context.stroke();
        }

        for (let entity of portals(bitworld)) {
            const appearence = PortalAppearences[PortalAppearence.value[entity]];

            context.fillStyle = appearence.fillColor;
            context.strokeStyle = appearence.strokeColor;

            context.beginPath();
            context.arc(Position.x[entity], Position.y[entity], Radius.value[entity], 0, TWO_PI);
            context.fill();
            context.stroke();
        }

        for (const sprite of sprites(bitworld)) {
            const spriteAsset = Sprites[Sprite.index[sprite]];

            context.drawImage(
                spriteAsset.image,
                spriteAsset.sourceX,
                spriteAsset.sourceY,
                spriteAsset.sourceW,
                spriteAsset.sourceH,
                Position.x[sprite] + Sprite.offsetX[sprite],
                Position.y[sprite] + Sprite.offsetY[sprite],
                Sprite.destinationW[sprite],
                Sprite.destinationH[sprite],
            );
        }

        context.restore();
    };
}
