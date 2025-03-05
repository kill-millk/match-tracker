import styled from '@emotion/styled';
import { COLORS } from '../../config/constants';

export interface StatItemProps {
	label: string;
	value: string | number;
	showPlus?: boolean;
}

const Container = styled.div`
	display: flex;
	gap: 8px;
	align-items: center;
	font-size: 12px;

	span:first-of-type {
		color: ${COLORS.TEXT.SECONDARY};
	}

	span:last-of-type {
		color: ${COLORS.TEXT.PRIMARY};
		font-weight: 500;
	}
`;

export const StatItem = ({ label, value, showPlus = true }: StatItemProps) => (
	<Container>
		<span>{label}:</span>
		<span>
			{typeof value === 'number' && value > 0 && showPlus ? `+${value}` : value}
		</span>
	</Container>
);
