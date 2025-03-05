import styled from '@emotion/styled';
import { ChangeEvent } from 'react';
import { COLORS, ANIMATION_DURATION } from '../../config/constants';

export interface SelectOption {
	value: string;
	label: string;
}

export interface SelectProps {
	value: string;
	onChange: (value: string) => void;
	options: SelectOption[];
}

const StyledSelect = styled.select`
	background: ${COLORS.SURFACE};
	color: white;
	border: 1px solid ${COLORS.BORDER};
	padding: 8px 12px;
	border-radius: 4px;
	cursor: pointer;
	min-width: 200px;
	transition: border-color ${ANIMATION_DURATION.FAST}ms ease;

	&:hover {
		border-color: #444;
	}

	option {
		background: ${COLORS.SURFACE};
	}
`;

export const Select = ({ value, onChange, options }: SelectProps) => {
	const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
		onChange(event.target.value);
	};

	return (
		<StyledSelect value={value} onChange={handleChange}>
			{options.map(option => (
				<option key={option.value} value={option.value}>
					{option.label}
				</option>
			))}
		</StyledSelect>
	);
};
