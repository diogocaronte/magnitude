import { AsteroidAppearenceEnum } from '@/assets/asteroid/types';

export type AsteroidProps = {
    x?: number;
    y?: number;
    angle?: number;
    value?: number;
    maximum?: number;
    radius?: number;
    appearence?: AsteroidAppearenceEnum;
};
