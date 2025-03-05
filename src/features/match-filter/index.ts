import { Match } from '../../shared/api/types';

export type MatchStatus = Match['status'] | 'all';

export const statusOptions: { value: MatchStatus; label: string }[] = [
	{ value: 'all', label: 'Все статусы' },
	{ value: 'Live', label: 'Live' },
	{ value: 'Finished', label: 'Finished' },
	{ value: 'Scheduled', label: 'Match preparing' },
];

export const filterMatches = (matches: Match[], status: MatchStatus) => {
	return status === 'all'
		? matches
		: matches.filter(match => match.status === status);
};
