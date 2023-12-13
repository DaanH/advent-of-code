import { describe, expect, it } from 'vitest';
import { inputDay4 } from './input';

type Card = {
	winners: number[];
	numbers: number[];
	points: number;
};

describe('day 04 - part 1', () => {
	const fn = (input: string): number => {
		const lines = input.split('\n').filter(Boolean);
		let total = 0;

		lines.forEach((line) => {
			const [winners, numbers] = line
				.substring(8)
				.split('|')
				.map((part) => part.split(' ').filter(Boolean).map(Number));

			const points = numbers.reduce((acc, number) => {
				if (winners.includes(number)) {
					acc = acc ? acc * 2 : 1;
				}
				return acc;
			}, 0);
			total += points;
			return { winners, numbers, points };
		});
		// console.log('cards', total, cards);

		return total;
	};

	it('should work', () => {
		const result = fn(
			`
Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`
		);
		expect(result).toBe(13);
	});

	it('should work with input', () => {
		const result = fn(inputDay4);
		expect(result).toBe(24848);
	});
});

describe('day 04 - part 2', () => {
	const fn = (input: string): number => {
		const lines = input.split('\n').filter(Boolean);

		const maxIndex = lines.length - 1;
		const cards: (Card & { amount: number })[] = lines.map((line, index) => {
			const [winners, numbers] = line
				.substring(8)
				.split('|')
				.map((part) => part.split(' ').filter(Boolean).map(Number));

			const wins = numbers.filter((number) => winners.includes(number)).length;

			return { winners, numbers, points: wins, amount: 1 };
		});
		cards.forEach((card, index) => {
			// console.log(
			// 	`card ${index} * ${card.amount}, each has ${
			// 		card.points
			// 	} matches, so adding ${card.amount * card.points} to card ${
			// 		index + 1
			// 	} to ${index + card.points}`
			// );
			for (let i = index + 1; i <= maxIndex && i <= index + card.points; i++) {
				cards[i].amount += card.amount;
			}
		});

		const total = cards.reduce((acc, card) => acc + card.amount, 0);

		// console.log('cards', total, cards);

		return total;
	};

	it('should work', () => {
		const result = fn(
			`
Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`
		);
		expect(result).toBe(30);
	});

	it('should work with input', () => {
		const result = fn(inputDay4);
		expect(result).toBe(7258152);
	});
});
