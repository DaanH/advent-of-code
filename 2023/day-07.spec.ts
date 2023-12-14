import { describe, expect, it } from 'vitest';
import { inputDay2 } from './input';
import { day7Input } from './day-07.input';

enum HandType {
	FIVE_OF_A_KIND, // 0
	FOUR_OF_A_KIND, // 1
	FULL_HOUSE, // 2
	THREE_OF_A_KIND, // 3
	TWO_PAIR, // 4
	ONE_PAIR, // 5
	HIGH_CARD, // 6
}

const LABELS = {
	[HandType.FIVE_OF_A_KIND]: 'five_of_a_kind',
	[HandType.FOUR_OF_A_KIND]: 'four_of_a_kind',
	[HandType.FULL_HOUSE]: 'full_house',
	[HandType.THREE_OF_A_KIND]: 'three_of_a_kind',
	[HandType.TWO_PAIR]: 'two_pair',
	[HandType.ONE_PAIR]: 'one_pair',
	[HandType.HIGH_CARD]: 'high_card',
};

type Hand = {
	cards: string;
	bid: number;
	type: number;
};

describe('day 07 - part 1', () => {
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
	function getHandType(cards: string): HandType {
		const amounts = [...cards].reduce(
			(acc, ch) => ({ ...acc, [ch]: (acc[ch] || 0) + 1 }),
			{}
		);

		// console.log(amounts);

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

		// console.log('total: ', total);
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

describe('day 07 - part 2', () => {
	const cards = {
		A: 1,
		K: 2,
		Q: 3,
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
		J: 15,
	};
	function getHandType(cards: string): HandType {
		if (cards === 'JJJJJ') return HandType.FIVE_OF_A_KIND;

		const amounts = [...cards].reduce(
			(acc, ch) => ({ ...acc, [ch]: (acc[ch] || 0) + 1 }),
			{}
		);

		let jays = 0;
		if (amounts['J']) {
			jays = amounts['J'];
			delete amounts['J'];
		}

		// console.log(amounts);

		const keys = Object.keys(amounts);
		if (keys.length === 1) return HandType.FIVE_OF_A_KIND;
		if (keys.length === 2 && keys.some((key) => amounts[key] + jays === 4))
			return HandType.FOUR_OF_A_KIND;
		if (keys.length === 2 && keys.some((key) => amounts[key] + jays === 3))
			return HandType.FULL_HOUSE;
		if (keys.length === 3 && keys.some((key) => amounts[key] + jays === 3))
			return HandType.THREE_OF_A_KIND;
		if (keys.length === 3 && !keys.some((key) => amounts[key] + jays === 3))
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
			.map((line) => {
				const bid = Number(line.substring(6));
				const cards = line.substring(0, 5);
				const type = getHandType(cards);
				const typeLabel = LABELS[type];
				return {
					cards,
					bid,
					type,
					typeLabel,
				};
			});

		// console.log(hands.filter((h) => h.cards.indexOf('J') > -1));

		const ordered = hands.sort(sortByType);

		// console.log('ordered: ', ordered);

		let total = ordered.reduce((acc, hand, i) => acc + hand.bid * (i + 1), 0);

		// console.log('total: ', total);
		return total;
	};

	it('should work', () => {
		const result = fn(`
32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483`);
		expect(result).toBe(5905);
	});

	it('shoud classify', () => {
		expect(getHandType('12345')).toBe(HandType.HIGH_CARD);
		expect(getHandType('J2345')).toBe(HandType.ONE_PAIR);
		expect(getHandType('J2245')).toBe(HandType.THREE_OF_A_KIND);
		expect(getHandType('J2244')).toBe(HandType.FULL_HOUSE);
		expect(getHandType('J2224')).toBe(HandType.FOUR_OF_A_KIND);
		expect(getHandType('J2222')).toBe(HandType.FIVE_OF_A_KIND);
		expect(getHandType('22J22')).toBe(HandType.FIVE_OF_A_KIND);

		expect(getHandType('JJ345')).toBe(HandType.THREE_OF_A_KIND);
		expect(getHandType('JJ335')).toBe(HandType.FOUR_OF_A_KIND);
		expect(getHandType('JJ333')).toBe(HandType.FIVE_OF_A_KIND);
		expect(getHandType('JJ333')).toBe(HandType.FIVE_OF_A_KIND);
	});

	it('should work with input', () => {
		const result = fn(day7Input);
		expect(result).toBe(245794069);
	});
});
