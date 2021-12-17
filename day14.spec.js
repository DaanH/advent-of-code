describe('day 14', () => {
  function parseInput(input) {
    const [source, ruleLines] = input.split('\n\n');
    const rules = ruleLines.split('\n').map((l) => {
      const [pair, insert] = l.split(' -> ');
      return { pair, insert };
    });
    return { source, rules };
  }
  function processRules(source, rules) {
    let i = source.length - 2;
    while (i >= 0) {
      i++;
    }
  }
  test('part 1a', () => {
    const { source, rules } = parseInput(input1a);
    console.log({ source, rules });
  });
});

input1a = `NNCB

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
