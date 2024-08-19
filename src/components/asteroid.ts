import { addComponent, defineComponent, IWorld, Types } from 'bitecs';

export const Asteroid = defineComponent({
    x: Types.f32,
    y: Types.f32,
});

export function addAsteroid(world: IWorld, entity: number, x: number, y: number) {
    addComponent(world, Asteroid, entity);

    Asteroid.x[entity] = x;
    Asteroid.y[entity] = y;
}
