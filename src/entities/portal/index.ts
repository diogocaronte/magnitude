import { PortalAppearenceEnum } from '@/assets/portal/types';
import { addPortal } from '@/components/portal';
import { addPortalAppearence } from '@/components/portal/appearence';
import { addRadius } from '@/components/radius';
import { addTransform } from '@/components/transform';
import { addEntity, IWorld } from 'bitecs';
import { PortalProps } from './types';

export function createPortal(
    world: IWorld,
    { x = 0, y = 0, angle = 0, px = 0, py = 0, radius = 5, appearence = PortalAppearenceEnum.CYAN } = {} as PortalProps,
) {
    const entity = addEntity(world);

    addTransform(world, entity, x, y, angle);
    addRadius(world, entity, radius);
    addPortalAppearence(world, entity, appearence);
    addPortal(world, entity, px, py);

    return entity;
}
