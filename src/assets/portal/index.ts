import { IPortalAppearence, PortalAppearenceEnum } from './types';

export const PortalAppearences: IPortalAppearence[] = [];

PortalAppearences[PortalAppearenceEnum.BLACK] = {
    fillColor: '#000',
    strokeColor: '#000',
};

PortalAppearences[PortalAppearenceEnum.CYAN] = {
    fillColor: '#00b5b550',
    strokeColor: '#00b5b5b5',
};
