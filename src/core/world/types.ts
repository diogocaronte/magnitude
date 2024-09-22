import type { IWorld } from 'bitecs';
import type { Camera } from '../camera';
import type { KeyboardControl } from '../controls/keyboard';
import type { MouseControl } from '../controls/mouse';
import type { CanvasTexture } from '../texture/canvas';

export type WorldProps = {
    world?: IWorld;
    camera?: Camera;
    screen?: CanvasTexture;
    mouse?: MouseControl;
    keyboard?: KeyboardControl;
};

export type IViewportData = {
    x: number;
    y: number;
    scale: number;
    width: number;
    height: number;
    halfWidth: number;
    halfHeight: number;
    left: number;
    right: number;
    top: number;
    bottom: number;
};

export type IPointerData = {
    x: number;
    y: number;
};
