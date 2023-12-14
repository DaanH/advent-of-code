import { describe, expect, it } from 'vitest';
import { inputDay2 } from './input';
import { day7Input } from '../day7-input';

enum HandType {
	FIVE_OF_A_KIND, // 0
	FOUR_OF_A_KIND, // 1
	FULL_HOUSE, // 2
	THREE_OF_A_KIND, // 3
	TWO_PAIR, // 4
	ONE_PAIR, // 5
	HIGH_CARD, // 6
}

type Hand = {
	cards: string;
	bid: number;
	type: number;
};

const cards = {
	A: 1,
	K: 2,
	Q: 3,
	J: 4,
	T: 5,
	'9': 6,
	'8': 7,
	'7': 8,
	'6': 9,
	'5': 10,
	'4': 11,
	'3': 12,
	'2': 13,
	'1': 14,
};

describe('day 07 - part 1', () => {
	function getHandType(cards: string): HandType {
		const amounts = [...cards].reduce(
			(acc, ch) => ({ ...acc, [ch]: (acc[ch] || 0) + 1 }),
			{}
		);

		console.log(amounts);

		const keys = Object.keys(amounts);
		if (keys.length === 1) return HandType.FIVE_OF_A_KIND;
		if (keys.length === 2 && keys.some((key) => amounts[key] === 1))
			return HandType.FOUR_OF_A_KIND;
		if (keys.length === 2 && keys.some((key) => amounts[key] === 2))
			return HandType.FULL_HOUSE;
		if (keys.length === 3 && keys.some((key) => amounts[key] === 3))
			return HandType.THREE_OF_A_KIND;
		if (keys.length === 3 && !keys.some((key) => amounts[key] === 3))
			return HandType.TWO_PAIR;
		if (keys.length === 4) return HandType.ONE_PAIR;

		return HandType.HIGH_CARD;
	}

	function sortByType(a: Hand, b: Hand): number {
		if (b === a || b.cards === a.cards) return 0;
		if (b.type !== a.type) return b.type - a.type;

		let i = 0;
		while (b.cards[i] === a.cards[i] && i < b.cards.length) i++;
		// console.log('i : ', i, b.cards[i], ' => ', cards[b.cards[i]]);
		return cards[b.cards[i]] - cards[a.cards[i]];
	}

	const fn = (input: string): number => {
		const hands: Hand[] = input
			.split('\n')
			.filter(Boolean)
			.map((line) => ({
				cards: line.substring(0, 5),
				bid: Number(line.substring(6)),
				type: getHandType(line.substring(0, 5)),
			}));

		// console.log(hands);

		const ordered = hands.sort(sortByType);

		// console.log('ordered: ', ordered);

		let total = ordered.reduce((acc, hand, i) => acc + hand.bid * (i + 1), 0);

		console.log('total: ', total);
		return total;
	};

	it('should work', () => {
		const result = fn(`
32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483`);
		expect(result).toBe(6440);
	});

	it('should work with input', () => {
		const result = fn(day7Input);
		expect(result).toBe(246163188);
	});
});
