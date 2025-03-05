import { configureStore } from '@reduxjs/toolkit';
import { matchesApi } from '../../shared/api/matchesApi';
import { setupListeners } from '@reduxjs/toolkit/query';

// Определяем тип состояния
type State = {
	[matchesApi.reducerPath]: ReturnType<typeof matchesApi.reducer>;
};

/**
 * Загружает состояние из localStorage.
 * @returns {State|undefined} Состояние приложения или undefined в случае ошибки
 */
function loadState(): State | undefined {
	try {
		const serializedState = localStorage.getItem('state');
		if (!serializedState) return undefined;

		const state = JSON.parse(serializedState);
		if (
			typeof state === 'object' &&
			state !== null &&
			matchesApi.reducerPath in state
		) {
			return state as State;
		}
		return undefined;
	} catch (err) {
		console.warn('Error loading state:', err);
		return undefined;
	}
}

/**
 * Сохраняет состояние в localStorage.
 * @param {State} state - Состояние приложения для сохранения
 */
function saveState(state: State): void {
	try {
		const serializedState = JSON.stringify(state);
		localStorage.setItem('state', serializedState);
	} catch (err) {
		console.warn('Error saving state:', err);
	}
}

/**
 * Конфигурация Redux store с поддержкой:
 * - Сохранения состояния в localStorage
 * - Интеграции с RTK Query
 * - DevTools в development режиме
 */
export const store = configureStore({
	reducer: {
		[matchesApi.reducerPath]: matchesApi.reducer,
	},
	middleware: getDefaultMiddleware => {
		const middleware = getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [
					`${matchesApi.reducerPath}/executeQuery`,
					`${matchesApi.reducerPath}/subscriptions/subscribeEntities`,
					`${matchesApi.reducerPath}/subscriptions/unsubscribeEntities`,
				],
			},
		});
		return middleware.concat(matchesApi.middleware);
	},
	preloadedState: loadState(),
});

store.subscribe(() => {
	saveState(store.getState());
});

// Включаем автоматическую перезагрузку данных
setupListeners(store.dispatch);

// Экспортируем типизированные хуки
export type AppDispatch = typeof store.dispatch;
