import { SpriteEnum } from '@/assets/sprite/types';

export type SpriteProps = {
    x?: number;
    y?: number;
    angle?: number;
    w?: number;
    h?: number;
    sprite: SpriteEnum;
};
