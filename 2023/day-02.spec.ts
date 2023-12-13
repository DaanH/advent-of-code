import { describe, expect, it } from 'vitest';
import { inputDay2 } from './input';

describe('day 02 - part 1', () => {
	const fn = (
		input: string,
		max: { blue: number; red: number; green: number }
	): number => {
		const lines = input.split('\n').filter(Boolean);
		let total = 0;
		for (const line of lines) {
			// console.log('checking line:', line);
			const [game, setsString] = line.split(': ');
			const isValid = setsString.split('; ').every((set) => {
				const colors = set.split(', ');
				// console.log('checking set:', colors);
				return colors.every((color) => {
					const [count, name] = color.split(' ');
					const isValid = max[name] >= Number(count);
					// console.log(`checking ${name}[${count}] < ${max[name]} : ${isValid}`);
					return isValid;
				});
			});

			if (isValid) {
				// console.log('valid game:', game);
				total += parseInt(game.split(' ')[1]);
			}
		}
		return total;
	};

	it('should work', () => {
		const result = fn(
			`
Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green
`,
			{
				red: 12,
				green: 13,
				blue: 14,
			}
		);
		expect(result).toBe(8);
	});

	it('should work with input', () => {
		const result = fn(inputDay2, {
			red: 12,
			green: 13,
			blue: 14,
		});
		expect(result).toBe(2239);
	});
});

describe('day 02 - part 2', () => {
	const fn = (input: string): number => {
		const lines = input.split('\n').filter(Boolean);
		let total = 0;
		for (const line of lines) {
			// console.log('checking line:', line);
			const [game, setsString] = line.split(': ');
			const colors = setsString.split('; ').flatMap((set) => set.split(', '));
			const maximums = colors.reduce((acc, color) => {
				const [count, name] = color.split(' ');
				acc[name] = Math.max(acc[name] ?? 0, Number(count));
				return acc;
			}, {} as Record<string, number>);
			// console.log('maximums:', maximums);
			const power = Object.values(maximums).reduce(
				(acc, count) => acc * count,
				1
			);
			total += power;
		}
		return total;
	};

	it('should work', () => {
		const result = fn(
			`
Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green
`
		);
		expect(result).toBe(2286);
	});

	it('should work with input', () => {
		const result = fn(inputDay2);
		expect(result).toBe(83435);
	});
});
