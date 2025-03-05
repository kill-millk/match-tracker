import styled from '@emotion/styled';
import { COLORS } from '../../config/constants';
import AlertTriangleIconSrc from '../../../assets/alert-triangle.svg';

interface ErrorNotificationProps {
	message?: string;
}

const Container = styled.div`
	display: flex;
	align-items: center;
	gap: 8px;
	padding: 8px 16px;
	background: ${COLORS.BACKGROUND};
	border-radius: 4px;
	color: ${COLORS.ERROR};
`;

const ErrorIcon = styled.img`
	width: 16px;
	height: 16px;
`;

export const ErrorNotification = ({
	message = 'Не удалось загрузить информацию',
}: ErrorNotificationProps) => {
	return (
		<Container>
			<ErrorIcon src={AlertTriangleIconSrc} alt='Error' />
			{message}
		</Container>
	);
};
