describe('day 6', () => {
  function mutate(fishes) {
    const zeros = fishes.shift();
    fishes[6] += zeros;
    fishes[8] = zeros;
  }
  function getAggregates(fishes) {
    return fishes.reduce(
      (acc, fish) => {
        acc[fish] = (acc[fish] || 0) + 1;
        return acc;
      },
      [0, 0, 0, 0, 0, 0, 0, 0, 0]
    );
  }
  test('part 1 example', () => {
    const fishes = getAggregates([3, 4, 3, 1, 2]);
    console.log({ fishes });

    new Array(18).fill(0).forEach(() => mutate(fishes));
    const result = fishes.reduce((acc, f) => acc + f);
    expect(result).toEqual(26);
  });
  test('part 1 ', () => {
    const fishes = getAggregates(input);
    console.log({ fishes });

    new Array(80).fill(0).forEach(() => mutate(fishes));
    const result = fishes.reduce((acc, f) => acc + f);
    expect(result).toEqual(389726);
  });
  test('part 2 ', () => {
    const fishes = getAggregates(input);
    console.log({ fishes });

    new Array(256).fill(0).forEach(() => mutate(fishes));
    const result = fishes.reduce((acc, f) => acc + f);
    expect(result).toEqual(1743335992042);
  });
});

const input = [
  1, 1, 1, 1, 1, 1, 1, 4, 1, 2, 1, 1, 4, 1, 1, 1, 5, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 5, 1, 1, 1, 1, 3, 1, 1, 2, 1, 2, 1, 3, 3, 4, 1, 4, 1, 1, 3, 1, 1, 5,
  1, 1, 1, 1, 4, 1, 1, 5, 1, 1, 1, 4, 1, 5, 1, 1, 1, 3, 1, 1, 5, 3, 1, 1, 1, 1,
  1, 4, 1, 1, 1, 1, 1, 2, 4, 1, 1, 1, 1, 4, 1, 2, 2, 1, 1, 1, 3, 1, 2, 5, 1, 4,
  1, 1, 1, 3, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 2,
  1, 1, 5, 1, 1, 1, 4, 1, 1, 5, 1, 1, 5, 3, 3, 5, 3, 1, 1, 1, 4, 1, 1, 1, 1, 1,
  1, 5, 3, 1, 2, 1, 1, 1, 4, 1, 3, 1, 5, 1, 1, 2, 1, 1, 1, 1, 1, 5, 1, 1, 1, 1,
  1, 2, 1, 1, 1, 1, 4, 3, 2, 1, 2, 4, 1, 3, 1, 5, 1, 2, 1, 4, 1, 1, 1, 1, 1, 3,
  1, 4, 1, 1, 1, 1, 3, 1, 3, 3, 1, 4, 3, 4, 1, 1, 1, 1, 5, 1, 3, 3, 2, 5, 3, 1,
  1, 3, 1, 3, 1, 1, 1, 1, 4, 1, 1, 1, 1, 3, 1, 5, 1, 1, 1, 4, 4, 1, 1, 5, 5, 2,
  4, 5, 1, 1, 1, 1, 5, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1,
  1, 5, 1, 1, 1, 1, 1, 1, 3, 1, 1, 2, 1, 1,
];
