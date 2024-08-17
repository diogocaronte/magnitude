import { Circle } from '@timohausmann/quadtree-ts';
import { Position } from '../../components/position';
import { Radius } from '../../components/radius';
import { DataTypeEnum } from '../types';
import { CreateCircleQuadtreeProps, ICircleQuadtreeData } from './types';

export const CircleQuadtreeData: ICircleQuadtreeData[] = [];

export function createCircleQuadtreeData({ entity } = {} as CreateCircleQuadtreeProps): ICircleQuadtreeData {
    const instance = new Circle({
        x: Position.x[entity],
        y: Position.y[entity],
        r: Radius.value[entity],
    }) as ICircleQuadtreeData;

    instance.entity = entity;
    instance.type = DataTypeEnum.CIRCLE_QUADTREE;

    return instance;
}
