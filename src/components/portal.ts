import { addComponent, defineComponent, IWorld, Types } from 'bitecs';
import { Position } from './position';
import { Camera } from '../systems/renderer/camera';
import { Radius } from './radius';

export const Portal = defineComponent({
    x: Types.f32,
    y: Types.f32,
});

export function addTeleport(world: IWorld, camera: Camera, entity: number, from: number, to: number) {
    addComponent(world, Portal, entity);

    if (Position.x[entity] <= Position.x[from] + Radius.value[entity] &&
        Position.x[entity] >= Position.x[from] - Radius.value[entity] &&
        Position.y[entity] <= Position.y[from] + Radius.value[entity] &&
        Position.y[entity] >= Position.y[from] - Radius.value[entity]
    ) {
        Position.x[entity] = Position.x[to];
        Position.y[entity] = Position.y[to];
        camera.x = Position.x[to];
        camera.y = Position.y[to];
    }
}
