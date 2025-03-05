import { useState, useEffect } from 'react';

/**
 * Хук для работы с localStorage с поддержкой типизации и обработкой ошибок.
 * @template T Тип значения, которое будет храниться в localStorage
 * @param {string} key Ключ, по которому будет сохраняться значение
 * @param {T} initialValue Начальное значение
 * @returns {[T, (value: T) => void]} Кортеж из текущего значения и функции для его обновления
 *
 * @example
 * const [value, setValue] = useLocalStorage('my-key', 'initial value');
 * setValue('new value'); // Значение будет сохранено в localStorage
 */
export function useLocalStorage<T>(
	key: string,
	initialValue: T
): [T, (value: T) => void] {
	// Получаем начальное значение из localStorage или используем initialValue
	const [storedValue, setStoredValue] = useState<T>(() => {
		try {
			const item = localStorage.getItem(key);
			return item ? JSON.parse(item) : initialValue;
		} catch (error) {
			console.warn(`Error reading localStorage key "${key}":`, error);
			return initialValue;
		}
	});

	// Сохраняем значение в localStorage при изменении
	useEffect(() => {
		try {
			localStorage.setItem(key, JSON.stringify(storedValue));
		} catch (error) {
			console.warn(`Error saving to localStorage key "${key}":`, error);
		}
	}, [key, storedValue]);

	return [storedValue, setStoredValue];
}
