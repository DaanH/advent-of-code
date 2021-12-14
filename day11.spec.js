describe('day 11', () => {
  function getParsed(input) {
    const width = input.indexOf('\n');
    const nrg = [...input.replace(/\n/g, '')].map((v) => parseInt(v));
    const height = (nrg.length / width) | 0;
    return { width, height, nrg };
  }
  function getFlashes(input) {
    return input.reduce((acc, v, i) => {
      if (v > 9) acc.push(i);
      return acc;
    }, []);
  }
  function flash(nrg, width, height, flashes) {
    flashes.forEach((i) => {
      const x = i % width;
      const y = (i / width) | 0;
      if (y !== 0) {
        if (x !== 0) nrg[i - width - 1]++;
        nrg[i - width]++;
        if (x !== width - 1) nrg[i - width + 1]++;
      }
      if (x !== 0) nrg[i - 1]++;
      if (x !== width - 1) nrg[i + 1]++;
      if (y !== height - 1) {
        if (x !== 0) nrg[i + width - 1]++;
        nrg[i + width]++;
        if (x !== width + 1) nrg[i + width + 1]++;
      }
    });
  }

  function step(map) {
    let nrg = map.nrg.map((v) => v + 1);
    const { width, height } = map;
    let i = 0;

    // console.log('next step:\n', nrgToString(nrg, width));
    let newFlashes = (allFlashes = getFlashes(nrg));
    let tries = 0;

    while (newFlashes.length && tries < 100) {
      flash(nrg, width, height, newFlashes);
      tries++;
      newFlashes = getFlashes(nrg).filter((v) => !allFlashes.includes(v));
      // console.log(nrgToString(nrg, width));
      // console.log({ newFlashes, allFlashes });
      allFlashes = [...allFlashes, ...newFlashes];
    }
    allFlashes.forEach((i) => (nrg[i] = 0));

    console.log('end of step:');
    console.log(nrgToString(nrg, width));
    map.nrg = nrg;
  }

  function nrgToString(nrg, width) {
    const chunks = [];
    let i = 0;
    while (i < nrg.length) {
      chunks.push(nrg.slice(i, i + width));
      i += width;
    }
    return chunks
      .map((nums) => nums.map((num) => (num < 10 ? ' ' : '') + num).join(''))
      .join('|\n');
  }
  test('part 1 example', () => {
    let parsed = getParsed(exampleInput);
    step(parsed);
    step(parsed);
    expect(0).toEqual(1);
  });
});

const exampleInput = `5483143223
2745854711
5264556173
6141336146
6357385478
4167524645
2176841721
6882881134
4846848554
5283751526`;
