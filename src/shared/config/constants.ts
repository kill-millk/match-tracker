export const API_BASE_URL = 'https://app.ftoyd.com/fronttemp-service/';
export const CACHE_LIFETIME = 300; // 5 минут
export const LOCAL_STORAGE_KEYS = {
	SELECTED_STATUS: 'selectedMatchStatus',
	RTK_CACHE: 'rtk-cache',
} as const;

export const ANIMATION_DURATION = {
	FAST: 200,
	NORMAL: 300,
	SLOW: 500,
} as const;

export const COLORS = {
	PRIMARY: '#e91e63',
	PRIMARY_DARK: '#c2185b',
	SUCCESS: '#4CAF50',
	ERROR: '#F44336',
	BACKGROUND: '#0F1318',
	SURFACE: '#1a1a1a',
	BORDER: '#333',
	TEXT: {
		PRIMARY: '#ffffff',
		SECONDARY: '#666666',
	},
	SURFACE_ALPHA: {
		80: '#1a1a1a80',
		CC: '#1a1a1aCC',
	},
} as const;
