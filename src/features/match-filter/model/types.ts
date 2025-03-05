import { Match } from '../../../entities/match/model/types';

export type FilterStatus = Match['status'] | 'all';

export interface StatusOption {
	value: FilterStatus;
	label: string;
}
