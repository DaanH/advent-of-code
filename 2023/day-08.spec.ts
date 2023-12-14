import { describe, expect, it } from 'vitest';
import { inputDay2 } from './input';
import { directions, instructions } from './day-08.input';

describe('day 08 - part 1', () => {
	const lOrR = {
		L: 0,
		R: 1,
	};

	const fn = (inputInstructions: string, inputDirections: string): number => {
		const lines = inputDirections.split('\n').filter(Boolean);

		const directions = {};
		for (let line of lines) {
			directions[line.substring(0, 3)] = [
				line.substring(7, 10),
				line.substring(12, 15),
			];
		}

		const instructions = inputInstructions;

		let steps = 0;
		let index = 0;
		let current = 'AAA';
		while (current !== 'ZZZ') {
			steps++;
			const instruction = instructions[index];
			current = directions[current][lOrR[instruction]];
			index++;
			if (index === instructions.length) index = 0;
		}

		let total = steps;

		return total;
	};

	it('should work', () => {
		const result = fn(
			'LLR',
			`
AAA = (BBB, BBB)
BBB = (AAA, ZZZ)
ZZZ = (ZZZ, ZZZ)`
		);
		expect(result).toBe(6);
	});

	it('should work with input', () => {
		const result = fn(instructions, directions);
		expect(result).toBe(20777);
	});
});

describe('day 08 - part 2', () => {
	const lOrR = {
		L: 0,
		R: 1,
	};

	const fn = (inputInstructions: string, inputDirections: string): number => {
		const lines = inputDirections.split('\n').filter(Boolean);

		const directions = {};
		for (let line of lines) {
			directions[line.substring(0, 3)] = [
				line.substring(7, 10),
				line.substring(12, 15),
			];
		}

		const instructions = inputInstructions;

		const ghosts = Object.keys(directions).filter((key) => key[2] === 'A');

		let steps = 0;
		let index = 0;
		const arrived: number[] = [];
		// console.log('starting with ghosts', ghosts);

		while (arrived.length < ghosts.length) {
			steps++;
			const instruction = lOrR[instructions[index]];
			index++;
			if (index === instructions.length) index = 0;

			for (let i = 0; i < ghosts.length; i++) {
				ghosts[i] = directions[ghosts[i]][instruction];

				if (ghosts[i][2] === 'Z') {
					const cycles = steps / instructions.length;
					// console.log(
					// 	`at step ${steps} (${cycles} cycles), ghost ${i} arrived at ${
					// 		ghosts[i]
					// 	}:${JSON.stringify(directions[ghosts[i]])}`
					// );
					arrived.push(steps);
				}
			}
		}

		// console.log('find common denominator of ', arrived);

		let total = findLCM(arrived);

		return total;
	};

	function findLCM(arr) {
		const n = arr.length;
		// Find the maximum value in arr[]
		var max_num = Math.max(...arr);

		// Initialize result
		var res = 1;

		// Find all factors that are present in
		// two or more array elements.
		var x = 2; // Current factor.
		while (x <= max_num) {
			// To store indexes of all array
			// elements that are divisible by x.
			var indexes: number[] = [];
			for (var j = 0; j < n; j++) if (arr[j] % x == 0) indexes.push(j);

			// If there are 2 or more array elements
			// that are divisible by x.
			if (indexes.length >= 2) {
				// Reduce all array elements divisible
				// by x.
				for (var j = 0; j < indexes.length; j++)
					arr[indexes[j]] = arr[indexes[j]] / x;

				res = res * x;
			} else x++;
		}

		// Then multiply all reduced array elements
		for (var i = 0; i < n; i++) res = res * arr[i];

		return res;
	}

	it('should find LCM', () => {
		expect(findLCM([2, 3])).toBe(6);
		expect(findLCM([2, 3, 4])).toBe(12);
		expect(findLCM([4, 6, 12, 24, 30])).toBe(120);
		expect(findLCM([1, 2, 3, 4, 28])).toBe(84);
	});

	it('should work', () => {
		const result = fn(
			'LR',
			`
11A = (11B, XXX)
11B = (XXX, 11Z)
11Z = (11B, XXX)
22A = (22B, XXX)
22B = (22C, 22C)
22C = (22Z, 22Z)
22Z = (22B, 22B)
XXX = (XXX, XXX)`
		);
		expect(result).toBe(6);
	});

	it('should work with input', () => {
		const result = fn(instructions, directions);
		expect(result).toBe(13289612809129);
	});
});
