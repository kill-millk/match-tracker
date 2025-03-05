import { css } from '@emotion/react';
import { COLORS, ANIMATION_DURATION } from '../../config/constants';

export const flexCenter = css`
	display: flex;
	align-items: center;
	justify-content: center;
`;

export const flexBetween = css`
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

export const hoverEffect = css`
	transition: all ${ANIMATION_DURATION.FAST}ms ease;
	border: 1px solid transparent;

	&:hover {
		border-color: ${COLORS.BORDER};
		transform: translateY(-1px);
	}
`;

export const textEllipsis = css`
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
`;

export type HexColor = `#${string}`;

export interface WithStatus {
	status: 'Live' | 'Finished' | 'Scheduled';
}

export const getStatusColor = (status: WithStatus['status']): HexColor => {
	switch (status) {
		case 'Live':
			return COLORS.SUCCESS;
		case 'Finished':
			return COLORS.ERROR;
		default:
			return '#9E9E9E';
	}
};
