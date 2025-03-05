import styled from '@emotion/styled';
import { keyframes, css } from '@emotion/react';
import { useState, useCallback } from 'react';
import { COLORS, ANIMATION_DURATION } from '../../../shared/config/constants';

interface RefreshButtonProps {
	onRefresh: () => Promise<void>;
	isLoading: boolean;
}

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const colorPulse = keyframes`
  0% {
    background-color: ${COLORS.PRIMARY};
  }
  50% {
    background-color: ${COLORS.PRIMARY_DARK};
  }
  100% {
    background-color: ${COLORS.PRIMARY};
  }
`;

const Button = styled.button<{ $isLoading: boolean }>`
	background-color: ${COLORS.PRIMARY};
	color: white;
	border: none;
	padding: 8px 16px;
	border-radius: 4px;
	cursor: pointer;
	display: flex;
	align-items: center;
	gap: 8px;
	transition: all ${ANIMATION_DURATION.FAST}ms ease;
	animation: ${props =>
		props.$isLoading
			? css`
					${colorPulse} 2s ease infinite
			  `
			: 'none'};

	&:hover {
		background-color: ${COLORS.PRIMARY_DARK};
		transform: translateY(-1px);
	}

	&:active {
		transform: translateY(1px);
	}

	&:disabled {
		opacity: 0.7;
		cursor: not-allowed;
	}
`;

const Icon = styled.div<{ $isLoading: boolean }>`
	display: inline-flex;
	align-items: center;
	justify-content: center;
	margin-left: 8px;
	font-size: 20px;
	animation: ${props =>
		props.$isLoading
			? css`
					${rotate} 1s linear infinite
			  `
			: 'none'};

	&::before {
		content: '↻';
		display: block;
	}
`;

export const RefreshButton = ({ onRefresh, isLoading }: RefreshButtonProps) => {
	const [isRefreshing, setIsRefreshing] = useState(false);

	const handleClick = useCallback(async () => {
		setIsRefreshing(true);
		await onRefresh();
		setTimeout(() => {
			setIsRefreshing(false);
		}, ANIMATION_DURATION.NORMAL);
	}, [onRefresh]);

	const buttonLoading = isLoading || isRefreshing;

	return (
		<Button
			onClick={handleClick}
			disabled={buttonLoading}
			$isLoading={buttonLoading}
		>
			{buttonLoading ? 'Обновление' : 'Обновить'}
			<Icon $isLoading={buttonLoading} />
		</Button>
	);
};
