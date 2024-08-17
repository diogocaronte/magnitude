import { Circle } from '@timohausmann/quadtree-ts';
import { IData } from '../types';

export type CreateCircleCollisionProps = {
    entity: number;
    check?: boolean;
};

export type ICircleCollisionData = IData & {
    check: boolean;
};

export type CreateCircleQuadtreeProps = {
    entity: number;
};

export type ICircleQuadtreeData = IData & Circle;
