describe('day 14', () => {
  function parseInput(input) {
    const [source, ruleLines] = input.split('\n\n');
    const rules = ruleLines.split('\n').reduce((acc, l) => {
      const [pair, insert] = l.split(' -> ');
      return { ...acc, [pair]: insert };
    }, {});
    return { source, rules };
  }
  function processRules(source, rules) {
    let i = source.length - 2;
    let result = source.substr(-1);
    while (i >= 0) {
      const currentPair = source.substr(i, 2);
      const insert = rules[currentPair] || '';
      result = currentPair[0] + insert + result;
      i--;
    }
    return result;
  }
  function getOccurrences(source) {
    const result = {};
    let i = source.length;
    while (i-- !== 0) {
      result[source[i]] = (result[source[i]] || 0) + 1;
    }
    return result;
  }
  test('part 1a', () => {
    const { source, rules } = parseInput(input1a);
    // console.log({ source, rules });
    let p = processRules(source, rules);
    expect(p).toBe('NCNBCHB');
    p = processRules(p, rules);
    expect(p).toBe('NBCCNBBBCBHCB');
    p = processRules(p, rules);
    expect(p).toBe('NBBBCNCCNBBNBNBBCHBHHBCHB');
    p = processRules(p, rules);
    expect(p).toBe('NBBNBNBBCCNBCNCCNBBNBBNBBBNBBNBBCBHCBHHNHCBBCBHCB');
    new Array(6).fill(0).forEach(() => {
      p = processRules(p, rules);
    });
    const occurences = getOccurrences(p);
    expect(occurences).toEqual({ B: 1749, C: 298, H: 161, N: 865 });
    const values = Object.values(occurences);
    expect(values).toEqual([1749, 298, 161, 865]);

    const max = Math.max(...values);
    const min = Math.min(...values);
    expect(max - min).toBe(1749 - 161);
  });

  function parseInput2(input) {
    const [source, ruleLines] = input.split('\n\n');
    const rules = ruleLines.split('\n').reduce((acc, l) => {
      const [pair, insert] = l.split(' -> ');
      return { ...acc, [pair]: { insert } };
    }, {});
    const keys = Object.keys(rules);
    for (let pair in rules) {
      const { insert } = rules[pair];
      rules[pair].pairs = [pair[0] + insert, insert + pair[1]].filter((p) =>
        keys.includes(p)
      );
    }
    return { source, rules };
  }
  function getInitialState(source, rules) {
    const chars = getOccurrences(source);
    const pairs = Object.keys(rules).reduce(
      (acc, pair) => ({
        ...acc,
        [pair]: new Array(source.length - 1)
          .fill(0)
          .filter((v, i) => source.substring(i, i + 2) === pair).length,
      }),
      {}
    );
    return { chars, pairs };
  }
  function processState({ chars, pairs }, rules) {
    const newPairs = { ...pairs };
    Object.entries(pairs).forEach(([pair, amount]) => {
      const { insert, pairs } = rules[pair];
      chars[insert] = (chars[insert] || 0) + amount;
      newPairs[pair] -= amount;
      pairs.forEach((p) => (newPairs[p] += amount));
    });
    return { chars, pairs: newPairs };
  }
  test('part 2a', () => {
    const { source, rules } = parseInput2(input1a);
    // console.log({ source, rules });
    let state = getInitialState(source, rules);
    new Array(40).fill(0).forEach(() => {
      state = processState(state, rules);
    });
    const max = Math.max(...Object.values(state.chars));
    const min = Math.min(...Object.values(state.chars));
    console.log(state, min, max);
    expect(max - min).toEqual(2188189693529);
  });
  test('part 2', () => {
    const { source, rules } = parseInput2(input1);
    // console.log({ source, rules });
    let state = getInitialState(source, rules);
    new Array(40).fill(0).forEach(() => {
      state = processState(state, rules);
    });
    const max = Math.max(...Object.values(state.chars));
    const min = Math.min(...Object.values(state.chars));
    console.log(state, min, max);
    expect(max - min).toEqual(3906445077999);
  });
});

const input1a = `NNCB

CH -> B
HH -> N
CB -> H
NH -> C
HB -> C
HC -> B
HN -> C
NN -> C
BH -> H
NC -> B
NB -> B
BN -> B
BB -> N
BC -> B
CC -> N
CN -> C`;

const input1 = `PBVHVOCOCFFNBCNCCBHK

FV -> C
SS -> B
SC -> B
BP -> K
VP -> S
HK -> K
FS -> F
CC -> V
VB -> P
OP -> B
FO -> N
FH -> O
VK -> N
PV -> S
HV -> O
PF -> F
HH -> F
NK -> S
NC -> S
FC -> H
FK -> K
OO -> N
HP -> C
NN -> H
BB -> H
CN -> P
PS -> N
VF -> S
CB -> B
OH -> S
CF -> C
OK -> P
CV -> V
CS -> H
KN -> B
OV -> S
HB -> C
OS -> V
PC -> B
CK -> S
PP -> K
SN -> O
VV -> C
NS -> F
PN -> K
HS -> P
VO -> B
VC -> B
NV -> P
VS -> N
FP -> F
HO -> S
KS -> O
BN -> F
VN -> P
OC -> K
SF -> P
PO -> P
SB -> O
FN -> F
OF -> F
CP -> C
HC -> O
PH -> O
BC -> O
NO -> C
BH -> C
VH -> S
KK -> O
SV -> K
KB -> K
BS -> S
HF -> B
NH -> S
PB -> N
HN -> K
SK -> B
FB -> F
KV -> S
BF -> S
ON -> S
BV -> P
KC -> S
NB -> S
NP -> B
BK -> K
NF -> C
BO -> K
KF -> B
KH -> N
SP -> O
CO -> S
KO -> V
SO -> B
CH -> C
KP -> C
FF -> K
PK -> F
OB -> H
SH -> C`;
