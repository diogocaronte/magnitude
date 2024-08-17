import { addEntity, IWorld } from 'bitecs';

import { addPosition } from '../../components/position';
import { addRadius } from '../../components/radius';
import { PortalAppearenceEnum } from '../../assets/portal/types';
import { addPortalAppearence } from '../../components/portal/appearence';

export function createPortal(
    world: IWorld,
    { x = 0, y = 0, radius = 5, appearence = PortalAppearenceEnum.CYAN }
) {
    const entity = addEntity(world);

    addPosition(world, entity, x, y);
    addRadius(world, entity, radius);
    addPortalAppearence(world, entity, appearence);

    return entity;
}
