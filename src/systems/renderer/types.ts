import { IWorld } from 'bitecs';
import { Camera } from './camera';

export type RendererProps = {
    world: IWorld;
    context: CanvasRenderingContext2D;
    camera: Camera;
};

export type CameraProps = {
    x?: number;
    y?: number;
    scale?: number;
};
