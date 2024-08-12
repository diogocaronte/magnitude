import { Circle } from '@timohausmann/quadtree-ts';
import { IWorld } from 'bitecs';
import { Camera } from './camera';

export type RendererProps = {
    world: IWorld;
    context: CanvasRenderingContext2D;
    camera: Camera;
    circleInstances: Circle<{ entity: number; check: boolean }>[];
};

export type CameraProps = {
    x: number;
    y: number;
    scale: number;
};
