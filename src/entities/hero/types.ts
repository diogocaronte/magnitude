import { HeroAppearenceEnum } from '@/assets/hero/types';

export type HeroProps = {
    x?: number;
    y?: number;
    angle?: number;
    radius?: number;
    appearence?: HeroAppearenceEnum;
};
