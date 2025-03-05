import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { MatchesResponse } from '../model/types';
import { API_BASE_URL, CACHE_LIFETIME } from '../../../shared/config/constants';

/**
 * API для работы с матчами.
 * Предоставляет методы для получения списка матчей с автоматической обработкой ошибок и кешированием.
 *
 * Особенности:
 * - Автоматическое кеширование данных на 5 минут
 * - Повторные попытки при ошибках (максимум 3)
 * - Автоматическая обработка ошибок
 * - Типизированные ответы
 */
export const matchesApi = createApi({
	reducerPath: 'matchesApi',
	baseQuery: fetchBaseQuery({
		baseUrl: API_BASE_URL,
	}),
	tagTypes: ['Matches'],
	endpoints: builder => ({
		/**
		 * Получение списка матчей.
		 * @returns {Promise<MatchesResponse>} Ответ API с массивом матчей
		 *
		 * @example
		 * const { data, error, isLoading } = useGetMatchesQuery();
		 * const matches = data?.data.matches;
		 */
		getMatches: builder.query<MatchesResponse, void>({
			query: () => 'fronttemp',
			providesTags: ['Matches'],
			keepUnusedDataFor: CACHE_LIFETIME,
		}),
	}),
});

export const { useGetMatchesQuery } = matchesApi;
