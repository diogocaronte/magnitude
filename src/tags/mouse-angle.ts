import { addComponent, defineComponent, IWorld } from 'bitecs';

export const MouseAngle = defineComponent();

export function addMouseAngleTag(world: IWorld, entity: number) {
    addComponent(world, MouseAngle, entity);
}
