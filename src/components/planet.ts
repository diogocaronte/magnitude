import { addComponent, defineComponent, IWorld, Types } from 'bitecs';

export const Planet = defineComponent({
    x: Types.f32,
    y: Types.f32,
});

export function addPlanet(world: IWorld, entity: number, x: number, y: number) {
    addComponent(world, Planet, entity);

    Planet.x[entity] = x;
    Planet.y[entity] = y;
}
