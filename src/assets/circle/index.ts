import { CircleAppearenceEnum, ICircleAppearence } from './types';

export const CircleAppearences: ICircleAppearence[] = [];

CircleAppearences[CircleAppearenceEnum.RED] = {
    fillColor: '#ff000055',
    strokeColor: '#ff0000',
};

CircleAppearences[CircleAppearenceEnum.BLUE] = {
    fillColor: '#0000ff55',
    strokeColor: '#0000ff',
};

CircleAppearences[CircleAppearenceEnum.GREEN] = {
    fillColor: '#00ff0055',
    strokeColor: '#00ff00',
};
