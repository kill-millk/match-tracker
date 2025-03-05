import styled from '@emotion/styled';
import { RefObject } from 'react';
import { Match } from '../model/types';
import { COLORS, ANIMATION_DURATION } from '../../../shared/config/constants';
import {
	flexCenter,
	getStatusColor,
	WithStatus,
} from '../../../shared/ui/styles/common';
import TeamIconSrc from '../../../assets/illustrations_role.svg';

interface MatchCardContentProps {
	match: Match;
	isHighlighted: boolean;
	isOpen: boolean;
	scoreRef: RefObject<HTMLDivElement>;
}

interface StyledTeamInfoProps {
	$isLeft?: boolean;
}

interface StyledToggleButtonProps {
	$isOpen: boolean;
}

const TeamInfo = styled.div<StyledTeamInfoProps>`
	display: flex;
	align-items: center;
	gap: 12px;
	width: 300px;
	${props => (props.$isLeft ? '' : 'justify-content: flex-end;')}
`;

const TeamLogo = styled.div`
	width: 40px;
	height: 40px;
	background: ${COLORS.SURFACE};
	border-radius: 50%;
	${flexCenter}
	padding: 8px;
`;

const TeamIcon = styled.img`
	width: 100%;
	height: 100%;
	object-fit: contain;
`;

const ScoreContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	flex: 1;
	gap: 8px;
`;

const Score = styled.div`
	font-size: 24px;
	font-weight: bold;
	color: white;
	display: flex;
	gap: 8px;
	align-items: center;
	transition: color ${ANIMATION_DURATION.NORMAL}ms ease;

	&.highlight {
		color: ${COLORS.SUCCESS};
	}
`;

const Status = styled.div<WithStatus>`
	padding: 4px 12px;
	border-radius: 4px;
	font-size: 12px;
	background: ${({ status }) => getStatusColor(status)};
	color: white;
`;

const ToggleButton = styled.div<StyledToggleButtonProps>`
	width: 24px;
	height: 24px;
	position: relative;
	transform: rotate(${props => (props.$isOpen ? '180deg' : '0deg')});
	transition: transform ${ANIMATION_DURATION.FAST}ms ease;

	&::before {
		content: '';
		position: absolute;
		width: 8px;
		height: 8px;
		border-right: 2px solid ${COLORS.BORDER};
		border-bottom: 2px solid ${COLORS.BORDER};
		top: 25%;
		left: 50%;
		transform: translateX(-50%) rotate(45deg);
	}
`;

export const MatchCardContent = ({
	match,
	isHighlighted,
	isOpen,
	scoreRef,
}: MatchCardContentProps) => {
	const { homeTeam, awayTeam, homeScore, awayScore, status } = match;

	return (
		<>
			<TeamInfo $isLeft>
				<TeamLogo>
					<TeamIcon src={TeamIconSrc} alt={homeTeam.name} />
				</TeamLogo>
				<div>{homeTeam.name}</div>
			</TeamInfo>

			<ScoreContainer>
				<Score ref={scoreRef} className={isHighlighted ? 'highlight' : ''}>
					{homeScore} : {awayScore}
				</Score>
				<Status status={status}>{status}</Status>
			</ScoreContainer>

			<TeamInfo>
				<div>{awayTeam.name}</div>
				<TeamLogo>
					<TeamIcon src={TeamIconSrc} alt={awayTeam.name} />
				</TeamLogo>
			</TeamInfo>
			<ToggleButton $isOpen={isOpen} />
		</>
	);
};
