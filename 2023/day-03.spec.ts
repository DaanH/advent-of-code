import { describe, expect, it } from 'vitest';
import { inputDay2, inputDay3 } from './input';

describe('day 03 - part 1', () => {
	function isLineSegmentValid(line: string, index: number, end: number) {
		const part = line.substring(index, end);
		const valid = part.match(/[^\.\d]/g) !== null;
		// console.log('checked part', part, ' => ', valid);
		return valid;
	}

	const checkSymbols = (
		item: [string, number, number],
		lines: string[]
	): boolean => {
		const [match, index, lineNr] = item;
		const start = index === 0 ? index : index - 1;
		let end = index + match.length + 1;
		if (end >= lines[lineNr].length) end--;

		return (
			isLineSegmentValid(lines[lineNr], start, end) ||
			(lineNr > 0 && isLineSegmentValid(lines[lineNr - 1], start, end)) ||
			(lineNr < lines.length - 1 &&
				isLineSegmentValid(lines[lineNr + 1], start, end))
		);
	};

	const fn = (input: string): number => {
		const lines = input.split('\n').filter(Boolean);
		// console.log('STARTEN MAAR RE');
		const numbers = lines.reduce((acc, line, lineNr) => {
			// console.log('line', line);
			const RE = /\d+/g;
			let found: RegExpExecArray | null;
			while ((found = RE.exec(line))) {
				// console.log('RE', found);
				acc.push([found[0], found.index, lineNr]);
			}
			return acc;
		}, [] as [string, number, number][]);
		// console.log('numbers', numbers);

		const filtered = numbers.filter((item) => checkSymbols(item, lines));

		// console.log('filtered :', filtered);

		const result = filtered.reduce((acc, item) => {
			const [number] = item;
			return acc + Number(number);
		}, 0);

		// console.log('result', result);
		return result;
	};

	it('should work', () => {
		const result = fn(
			`
467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`
		);
		expect(result).toBe(4361);
	});

	it('should work with input', () => {
		const result = fn(inputDay3);
		expect(result).toBe(509115);
	});
});

type NumPos = {
	label: string;
	index: number;
};

describe('day 03 - part 2', () => {
	const getNumbers = (index: number, numbers: NumPos[]) => {
		const neighbours: NumPos[] = numbers.filter(
			(item) =>
				index >= item.index - 1 && index <= item.index + item.label.length
		);
		// console.log('neighbours at ', index, neighbours);
		return neighbours;
	};

	const getGearRatio = (
		index: number,
		lineNr: number,
		numbers: NumPos[][]
	): number => {
		// console.log('getGearRatio', index, lineNr, numbers[lineNr]);

		const neighbours = getNumbers(index, numbers[lineNr]);
		if (lineNr > 0) neighbours.push(...getNumbers(index, numbers[lineNr - 1]));
		if (lineNr < numbers.length - 1)
			neighbours.push(...getNumbers(index, numbers[lineNr + 1]));

		// console.log('neighbours for ', index, lineNr, neighbours.length);

		if (neighbours.length === 2) {
			const [n1, n2] = neighbours;
			const ratio = Number(n1.label) * Number(n2.label);
			return ratio;
		}

		return 0;
	};

	const fn = (input: string): number => {
		const lines = input.split('\n').filter(Boolean);
		// console.log('STARTEN MAAR RE');
		const numbers = lines.map((line, lineNr) => {
			// console.log('line', line);
			const RE = /\d+/g;
			let found: RegExpExecArray | null;

			const nums: NumPos[] = [];
			while ((found = RE.exec(line))) {
				// console.log('RE', found);
				nums.push({ label: found[0], index: found.index });
			}
			return nums;
		});
		// console.log('numbers', numbers);

		const NUMS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
		let result = 0;
		lines.forEach((line, lineNr) => {
			for (let i = 0; i < line.length; i++) {
				const char = line[i];
				if (char !== '.' && !NUMS.includes(char)) {
					const ratio = getGearRatio(i, lineNr, numbers);
					result += ratio;
				}
			}
		});

		return result;
	};

	it('should work', () => {
		const result = fn(
			`
467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`
		);
		expect(result).toBe(467835);
	});

	it('should work with input', () => {
		const result = fn(inputDay3);
		expect(result).toBe(75220503);
	});
});
