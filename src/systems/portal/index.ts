import { Portal } from '@/components/portal';
import { Position } from '@/components/position';
import { Radius } from '@/components/radius';
import { defineQuery } from 'bitecs';
import { CreatePortalProps } from './types';

export function createPortal({ world }: CreatePortalProps) {
    const portals = defineQuery([Portal, Position, Radius]);
    const entities = defineQuery([Position]);

    return () => {
        const { bitworld } = world;
        const _entities = entities(bitworld);

        for (const portal of portals(bitworld)) {
            for (const entity of _entities) {
                if (portal === entity) continue;

                const diff_x = Position.x[portal] - Position.x[entity];
                const diff_y = Position.y[portal] - Position.y[entity];

                if (Math.hypot(diff_x, diff_y) > Radius.value[portal]) continue;

                Position.x[entity] = Portal.x[portal] + diff_x * 2;
                Position.y[entity] = Portal.y[portal] + diff_y * 2;
            }
        }
    };
}
