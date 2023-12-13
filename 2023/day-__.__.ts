import { describe, expect, it } from 'vitest';
import { inputDay2 } from './input';

describe('day 07 - part 1', () => {
	const fn = (input: string): number => {
		const lines = input.split('\n').filter(Boolean);
		let total = 0;

		return total;
	};

	it('should work', () => {
		const result = fn(``);
		expect(result).toBe(4361);
	});
	/*
	it('should work with input', () => {
		const result = fn('');
		expect(result).toBe(2239);
	});
*/
});
