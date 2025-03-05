import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { useState, useCallback } from 'react';
import { useGetMatchesQuery } from '../../../entities/match/api/matchesApi';
import { MatchCard } from '../../../entities/match/ui/MatchCard';
import { FilterStatus } from '../../../features/match-filter/model/types';
import { ErrorNotification } from '../../../shared/ui/error/ErrorNotification';
import { Select } from '../../../shared/ui/select/Select';
import { RefreshButton } from '../../../features/match-refresh/ui/RefreshButton';
import { useLocalStorage } from '../../../shared/lib/hooks/useLocalStorage';
import {
	COLORS,
	LOCAL_STORAGE_KEYS,
	ANIMATION_DURATION,
} from '../../../shared/config/constants';

const Container = styled.div`
	max-width: 1200px;
	margin: 0 auto;
	padding: 20px;
`;

const Header = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 24px;
`;

const HeaderLeft = styled.div`
	display: flex;
	flex-direction: column;
	gap: 16px;
`;

const Title = styled.h1`
	color: white;
	margin: 0;
`;

const spinnerRotate = keyframes`
	0% {
		transform: rotate(0deg);
	}
	100% {
		transform: rotate(360deg);
	}
`;

const LoadingSpinner = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 40px;
	color: white;

	&::after {
		content: '';
		width: 24px;
		height: 24px;
		border: 2px solid #ffffff;
		border-right-color: transparent;
		border-radius: 50%;
		margin-left: 8px;
		animation: ${spinnerRotate} 1s linear infinite;
	}
`;

const HeaderRight = styled.div`
	display: flex;
	align-items: center;
	gap: 12px;
`;

const MatchesGrid = styled.div`
	display: grid;
	gap: 16px;
`;

const fadeIn = keyframes`
	from {
		opacity: 0;
		transform: translateY(10px);
	}
	to {
		opacity: 1;
		transform: translateY(0);
	}
`;

interface MatchCardWrapperProps {
	$index: number;
}

const MatchCardWrapper = styled.div<MatchCardWrapperProps>`
	animation: ${fadeIn} ${ANIMATION_DURATION.NORMAL}ms ease forwards;
	animation-delay: ${props => props.$index * 0.05}s;
	opacity: 0;
`;

const EmptyState = styled.div`
	color: #666;
	text-align: center;
	padding: 40px;
	background: ${COLORS.SURFACE};
	border-radius: 8px;
	margin-top: 20px;
	animation: ${fadeIn} ${ANIMATION_DURATION.NORMAL}ms ease forwards;
`;

interface StatusOption {
	value: FilterStatus;
	label: string;
}

const statusOptions: StatusOption[] = [
	{ value: 'all', label: 'Все статусы' },
	{ value: 'Live', label: 'Live' },
	{ value: 'Finished', label: 'Finished' },
	{ value: 'Scheduled', label: 'Match preparing' },
];

export const MatchesList = () => {
	const { data, error, isLoading, isFetching, refetch } = useGetMatchesQuery(
		undefined,
		{
			pollingInterval: 0,
			refetchOnMountOrArgChange: true,
		}
	);

	const [selectedStatus, setSelectedStatus] = useLocalStorage<FilterStatus>(
		LOCAL_STORAGE_KEYS.SELECTED_STATUS,
		'all'
	);

	const [key, setKey] = useState(0);

	const handleRefresh = useCallback(async () => {
		try {
			window.dispatchEvent(new Event('matchesRefreshed'));
			await refetch();
		} catch (error) {
			console.error('Failed to refresh matches:', error);
		}
	}, [refetch]);

	const handleStatusChange = useCallback(
		(newStatus: FilterStatus) => {
			setSelectedStatus(newStatus);
			setKey(prev => prev + 1);
		},
		[setSelectedStatus]
	);

	const filteredMatches = data?.data.matches.filter(match =>
		selectedStatus === 'all' ? true : match.status === selectedStatus
	);

	return (
		<Container>
			<Header>
				<HeaderLeft>
					<Title>Match Tracker</Title>
					<Select
						value={selectedStatus}
						onChange={value => handleStatusChange(value as FilterStatus)}
						options={statusOptions}
					/>
				</HeaderLeft>
				<HeaderRight>
					{error && <ErrorNotification />}
					<RefreshButton onRefresh={handleRefresh} isLoading={isFetching} />
				</HeaderRight>
			</Header>

			{isLoading && !data && (
				<LoadingSpinner>Загрузка матчей...</LoadingSpinner>
			)}

			{filteredMatches?.length === 0 ? (
				<EmptyState key={`empty-${key}`}>
					Матчей с выбранным статусом не найдено
				</EmptyState>
			) : (
				<MatchesGrid key={`grid-${key}`}>
					{filteredMatches?.map((match, index) => (
						<MatchCardWrapper key={`${match.title}-${key}`} $index={index}>
							<MatchCard match={match} />
						</MatchCardWrapper>
					))}
				</MatchesGrid>
			)}
		</Container>
	);
};
