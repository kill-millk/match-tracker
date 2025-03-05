import styled from '@emotion/styled';
import { ReactNode, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { keyframes } from '@emotion/react';

interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	children: ReactNode;
}

const fadeIn = keyframes`
	from {
		opacity: 0;
	}
	to {
		opacity: 1;
	}
`;

const slideDown = keyframes`
	from {
		transform: translateY(-20px);
		opacity: 0;
	}
	to {
		transform: translateY(0);
		opacity: 1;
	}
`;

const Overlay = styled.div<{ $isOpen: boolean }>`
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: rgba(0, 0, 0, 0.95);
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 1000;
	opacity: 0;
	animation: ${fadeIn} 0.2s ease forwards;
`;

const Content = styled.div`
	background: #0f1318;
	width: 100%;
	max-width: 1200px;
	margin: 0 32px;
	border-radius: 12px;
	color: white;
	position: relative;
	opacity: 0;
	animation: ${slideDown} 0.3s ease forwards;
	animation-delay: 0.1s;
	max-height: calc(100vh - 64px);
	overflow-y: auto;
	box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);

	/* Стилизация скроллбара */
	::-webkit-scrollbar {
		width: 8px;
		height: 8px;
	}

	::-webkit-scrollbar-track {
		background: #0f1318;
	}

	::-webkit-scrollbar-thumb {
		background: #333;
		border-radius: 4px;
	}

	::-webkit-scrollbar-thumb:hover {
		background: #444;
	}
`;

const CloseButton = styled.button`
	position: absolute;
	top: 16px;
	right: 16px;
	background: none;
	border: none;
	color: #666;
	cursor: pointer;
	font-size: 24px;
	padding: 8px;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 50%;
	width: 40px;
	height: 40px;
	transition: all 0.2s ease;
	z-index: 2;

	&:hover {
		background: rgba(255, 255, 255, 0.1);
		color: white;
	}
`;

export const Modal = ({ isOpen, onClose, children }: ModalProps) => {
	useEffect(() => {
		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				onClose();
			}
		};

		if (isOpen) {
			document.addEventListener('keydown', handleEscape);
			document.body.style.overflow = 'hidden';
		}

		return () => {
			document.removeEventListener('keydown', handleEscape);
			document.body.style.overflow = 'unset';
		};
	}, [isOpen, onClose]);

	if (!isOpen) return null;

	return createPortal(
		<Overlay onClick={onClose} $isOpen={isOpen}>
			<Content onClick={e => e.stopPropagation()}>
				<CloseButton onClick={onClose}>×</CloseButton>
				{children}
			</Content>
		</Overlay>,
		document.body
	);
};
