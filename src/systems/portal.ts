import { defineQuery, IWorld } from 'bitecs';
import { Portal } from '../components/portal';
import { Position } from '../components/position';
import { Radius } from '../components/radius';

export function createPortal(world: IWorld) {
    const portals = defineQuery([Portal, Position, Radius]);
    const entities = defineQuery([Position]);

    return () => {
        const _entities = entities(world);
        for (const portal of portals(world)) {
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
