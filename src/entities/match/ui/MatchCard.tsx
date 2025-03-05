import styled from '@emotion/styled';
import { useState, useEffect, useRef, useCallback } from 'react';
import { Match } from '../model/types';
import { MatchCardContent } from './MatchCardContent';
import { MatchModal } from './MatchModal';
import { COLORS, ANIMATION_DURATION } from '../../../shared/config/constants';

interface MatchCardProps {
	match: Match;
}

interface CloseModalsEvent extends CustomEvent {
	detail: { currentMatchId: string };
}

const Card = styled.div`
	background: ${COLORS.SURFACE};
	border-radius: 8px;
	padding: 16px;
	display: flex;
	align-items: center;
	cursor: pointer;
	transition: all ${ANIMATION_DURATION.FAST}ms ease;
	border: 1px solid transparent;
	position: relative;

	&:hover {
		background: #252525;
		border-color: ${COLORS.BORDER};
		transform: translateY(-1px);
	}
`;

export const MatchCard = ({ match }: MatchCardProps) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isHighlighted, setIsHighlighted] = useState(false);
	const scoreRef = useRef<HTMLDivElement>(null);

	const handleRefresh = useCallback(() => {
		setIsHighlighted(true);
		if (scoreRef.current) {
			scoreRef.current.classList.add('highlight');
			setTimeout(() => {
				setIsHighlighted(false);
				if (scoreRef.current) {
					scoreRef.current.classList.remove('highlight');
				}
			}, ANIMATION_DURATION.NORMAL);
		}
	}, []);

	const handleCloseModals = useCallback(
		(e: CloseModalsEvent) => {
			if (e.detail.currentMatchId !== match.title) {
				setIsModalOpen(false);
			}
		},
		[match.title]
	);

	useEffect(() => {
		window.addEventListener('matchesRefreshed', handleRefresh);
		return () => {
			window.removeEventListener('matchesRefreshed', handleRefresh);
		};
	}, [handleRefresh]);

	useEffect(() => {
		if (isModalOpen) {
			const closeOtherModals = new CustomEvent('closeModals', {
				detail: { currentMatchId: match.title },
			});
			window.dispatchEvent(closeOtherModals);
		}
	}, [isModalOpen, match.title]);

	useEffect(() => {
		window.addEventListener('closeModals', handleCloseModals as EventListener);
		return () => {
			window.removeEventListener(
				'closeModals',
				handleCloseModals as EventListener
			);
		};
	}, [handleCloseModals]);

	return (
		<>
			<Card onClick={() => setIsModalOpen(true)}>
				<MatchCardContent
					match={match}
					isHighlighted={isHighlighted}
					isOpen={isModalOpen}
					scoreRef={scoreRef}
				/>
			</Card>

			<MatchModal
				match={match}
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
			/>
		</>
	);
};
