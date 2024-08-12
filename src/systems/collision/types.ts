import { Circle, Indexable, Quadtree } from '@timohausmann/quadtree-ts';
import { IWorld } from 'bitecs';
import { CircleCollisionData } from '../../data/circle/types';

export type CreateCollisionProps = {
    world: IWorld;
    circleInstances: Circle<CircleCollisionData>[];
    quadtree: Quadtree<Indexable>;
};
