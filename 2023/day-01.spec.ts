import { describe, it, expect } from 'vitest';
import { inputDay1Part1 } from './input';

describe('day 01 - part 2', () => {
	const digits = [
		'0',
		'1',
		'2',
		'3',
		'4',
		'5',
		'6',
		'7',
		'8',
		'9',
		'zero',
		'one',
		'two',
		'three',
		'four',
		'five',
		'six',
		'seven',
		'eight',
		'nine',
	];

	const fn = (input: string): number => {
		const lines = input.split('\n');
		let total = 0;
		for (const line of lines) {
			// console.log(line);

			let first = 0;
			let i = 0;
			while (i < line.length) {
				first = digits.findIndex((digit) => line.startsWith(digit, i)) % 10;
				if (first !== -1) break;
				i++;
			}

			let last = 0;
			i = line.length;
			while (i >= 0) {
				last = digits.findIndex((digit) => line.endsWith(digit, i)) % 10;

				if (last !== -1) break;
				i--;
			}
			// console.log(first, last);
			total += first * 10 + last;
		}
		return total;
	};

	it('should work', () => {
		const result = fn(`two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen`);
		expect(result).toBe(281);
	});

	it('should work with input', () => {
		const result = fn(inputDay1Part1);
		expect(result).toBe(55652);
	});
});
