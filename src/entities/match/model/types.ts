export type MatchStatus = 'Live' | 'Finished' | 'Scheduled';

export interface Player {
	kills: number;
	username: string;
}

export interface Team {
	name: string;
	place: number;
	players: Player[];
	points: number;
	total_kills: number;
}

export interface Match {
	awayScore: number;
	awayTeam: Team;
	homeScore: number;
	homeTeam: Team;
	status: MatchStatus;
	time: string;
	title: string;
}

export interface MatchesResponse {
	data: {
		matches: Match[];
	};
	ok: boolean;
}

export type FilterStatus = MatchStatus | 'all';
