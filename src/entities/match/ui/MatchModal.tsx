import styled from '@emotion/styled';
import { Match } from '../model/types';
import { Modal } from '../../../shared/ui/odal/Modal';
import { COLORS } from '../../../shared/config/constants';
import {
	flexCenter,
	getStatusColor,
	WithStatus,
} from '../../../shared/ui/styles/common';
import { TeamSection } from './TeamSection/TeamSection';
import TeamIconSrc from '../../../assets/illustrations_role.svg';

interface ModalTeamInfoProps {
	team: Match['homeTeam'] | Match['awayTeam'];
	isReversed?: boolean;
}

interface MatchModalProps {
	match: Match;
	isOpen: boolean;
	onClose: () => void;
}

const ModalCard = styled.div`
	background: ${COLORS.BACKGROUND};
	border-radius: 12px;
	overflow: hidden;
	margin-bottom: 24px;
	border: 1px solid ${COLORS.SURFACE};

	&:last-child {
		margin-bottom: 0;
	}
`;

const ModalHeader = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 24px;
	background: ${COLORS.BACKGROUND};
	border-bottom: 1px solid ${COLORS.SURFACE};
`;

const ModalTeamInfo = styled.div<{ $isReversed?: boolean }>`
	display: flex;
	align-items: center;
	gap: 16px;
	min-width: 200px;
	flex-direction: ${props => (props.$isReversed ? 'row-reverse' : 'row')};
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

const ModalTeamName = styled.div`
	font-size: 20px;
	font-weight: bold;
	color: white;
`;

const ModalScore = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 8px;
`;

const ModalScoreNumbers = styled.div`
	font-size: 32px;
	font-weight: bold;
	color: white;
	display: flex;
	align-items: center;
	gap: 16px;
`;

const ModalStatus = styled.div<WithStatus>`
	padding: 6px 16px;
	border-radius: 4px;
	font-size: 14px;
	font-weight: 500;
	background: ${({ status }) => getStatusColor(status)};
	color: white;
`;

const TeamInfoComponent = ({ team, isReversed }: ModalTeamInfoProps) => (
	<ModalTeamInfo $isReversed={isReversed}>
		<TeamLogo>
			<TeamIcon src={TeamIconSrc} alt={team.name} />
		</TeamLogo>
		<ModalTeamName>{team.name}</ModalTeamName>
	</ModalTeamInfo>
);

export const MatchModal = ({ match, isOpen, onClose }: MatchModalProps) => {
	const { homeTeam, awayTeam, homeScore, awayScore, status } = match;
	const isHomeWinner = homeScore > awayScore;
	const isAwayWinner = awayScore > homeScore;

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalCard>
				<ModalHeader>
					<TeamInfoComponent team={homeTeam} />
					<ModalScore>
						<ModalScoreNumbers>
							{homeScore} : {awayScore}
						</ModalScoreNumbers>
						<ModalStatus status={status}>{status}</ModalStatus>
					</ModalScore>
					<TeamInfoComponent team={awayTeam} isReversed />
				</ModalHeader>
				<TeamSection team={homeTeam} isWinner={isHomeWinner} />
			</ModalCard>

			<ModalCard>
				<TeamSection team={awayTeam} isWinner={isAwayWinner} />
			</ModalCard>
		</Modal>
	);
};
