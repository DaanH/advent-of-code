import { describe, expect, it } from 'vitest';
import { inputDay2 } from './input';

describe('day 03 - part 1', () => {
	const getHoldTimes = ([time, max]: any) => {
		const start = Math.floor((time - Math.sqrt(time * time - 4 * max)) / 2) + 1;
		const end = time - start;
		const total = end - start + 1;

		return total;
	};

	const fn = (timeString: string, distanceString: string): number => {
		const times = timeString.trim().split(/\s+/);
		const distances = distanceString.trim().split(/\s+/);

		const races = times.map((t, i) => [Number(t), Number(distances[i])]);

		console.log(races);

		let total = 1;
		for (let race of races) {
			total *= getHoldTimes(race);
		}

		return total;
	};

	it('should work', () => {
		const result = fn('7  15   30', '9  40  200');
		expect(result).toBe(288);
	});

	it('should work with input', () => {
		const result = fn('40     82     91     66', '277   1338   1349   1063');
		expect(result).toBe(505494);
	});

	it('should work with part2', () => {
		const result = fn('40829166', '277133813491063');
		expect(result).toBe(23632299);
	});
});
