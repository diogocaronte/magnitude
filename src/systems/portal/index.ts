import { Portal } from '@/components/portal';
import { Radius } from '@/components/radius';
import { Transform } from '@/components/transform';
import { defineQuery } from 'bitecs';
import { CreatePortalProps } from './types';

export function createPortal({ world }: CreatePortalProps) {
    const portals = defineQuery([Portal, Transform, Radius]);
    const entities = defineQuery([Transform]);

    return () => {
        const { bitworld } = world;
        const _entities = entities(bitworld);

        for (const portal of portals(bitworld)) {
            for (const entity of _entities) {
                if (portal === entity) continue;

                const diff_x = Transform.x[portal] - Transform.x[entity];
                const diff_y = Transform.y[portal] - Transform.y[entity];

                if (Math.hypot(diff_x, diff_y) > Radius.value[portal]) continue;

                Transform.x[entity] = Portal.x[portal] + diff_x * 2;
                Transform.y[entity] = Portal.y[portal] + diff_y * 2;
            }
        }
    };
}
