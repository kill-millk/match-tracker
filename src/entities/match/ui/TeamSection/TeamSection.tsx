import styled from '@emotion/styled';
import { Team } from '../../model/types';
import { COLORS } from '../../../../shared/config/constants';
import { flexBetween, hoverEffect } from '../../../../shared/ui/styles/common';
import AvatarIconSrc from '../../../../assets/avatar_global.svg';
import { StatItem } from '../../../../shared/ui/StatItem/StatItem';

/**
 * Интерфейс для пропсов компонента TeamSection
 * @param team - Данные команды
 * @param isWinner - Флаг, указывающий является ли команда победителем
 */
interface TeamSectionProps {
	team: Team;
	isWinner: boolean;
}

const Content = styled.div<{ $isWinner: boolean }>`
	padding: 24px;
	background: ${COLORS.BACKGROUND};
	border-left: ${props =>
		props.$isWinner ? `4px solid ${COLORS.SUCCESS}` : 'none'};
	position: relative;

	&::after {
		content: '${props => (props.$isWinner ? 'WINNER' : '')}';
		position: absolute;
		top: 8px;
		right: 8px;
		color: ${COLORS.SUCCESS};
		font-weight: bold;
		font-size: 12px;
	}
`;

const PlayersList = styled.div`
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: 16px;
	margin-bottom: 16px;
`;

const PlayerItem = styled.div`
	display: flex;
	align-items: center;
	gap: 12px;
	padding: 12px;
	background: ${COLORS.SURFACE_ALPHA[80]};
	border-radius: 8px;
	${hoverEffect}
`;

const PlayerAvatar = styled.div`
	width: 32px;
	height: 32px;
	border-radius: 50%;
	overflow: hidden;
	background: ${COLORS.SURFACE};
	display: flex;
	align-items: center;
	justify-content: center;
	flex-shrink: 0;
`;

const PlayerIcon = styled.img`
	width: 100%;
	height: 100%;
	object-fit: contain;
`;

const PlayerInfo = styled.div`
	${flexBetween}
	flex: 1;
`;

const PlayerName = styled.div`
	color: ${COLORS.TEXT.PRIMARY};
	font-size: 14px;
`;

const PlayerKills = styled.div`
	display: flex;
	gap: 4px;
	align-items: center;

	span:first-of-type {
		color: ${COLORS.TEXT.SECONDARY};
	}

	span:last-of-type {
		color: ${COLORS.TEXT.PRIMARY};
		font-weight: 500;
	}
`;

const TeamResults = styled.div`
	${flexBetween}
	width: 100%;
	padding: 16px;
	background: ${COLORS.SURFACE_ALPHA[80]};
	border-radius: 8px;
	margin-top: 24px;
	${hoverEffect}
`;

/**
 * Компонент для отображения информации о команде и ее игроков.
 * Включает список игроков и статистику команды (очки, место, убийства).
 * При победе команды добавляется зеленая полоса слева и метка "WINNER".
 *
 * @param {TeamSectionProps} props - Пропсы компонента
 * @param {Team} props.team - Данные команды
 * @param {boolean} props.isWinner - Флаг, указывающий является ли команда победителем
 */
export const TeamSection = ({ team, isWinner }: TeamSectionProps) => {
	const { players, points, place, total_kills } = team;

	return (
		<Content $isWinner={isWinner}>
			<PlayersList>
				{players.map(player => (
					<PlayerItem key={player.username}>
						<PlayerAvatar>
							<PlayerIcon src={AvatarIconSrc} alt={player.username} />
						</PlayerAvatar>
						<PlayerInfo>
							<PlayerName>{player.username}</PlayerName>
							<PlayerKills>
								<span>Убийств:</span>
								<span>{player.kills}</span>
							</PlayerKills>
						</PlayerInfo>
					</PlayerItem>
				))}
			</PlayersList>
			<TeamResults>
				<StatItem label='Points' value={points} showPlus={true} />
				<StatItem label='Место' value={place} showPlus={false} />
				<StatItem label='Всего убийств' value={total_kills} showPlus={true} />
			</TeamResults>
		</Content>
	);
};
