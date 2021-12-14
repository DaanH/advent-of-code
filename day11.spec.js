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
        if (x !== width - 1) nrg[i + width + 1]++;
      }
    });
  }

  function step(map, doLog = false) {
    let nrg = map.nrg.map((v) => v + 1);
    const { width, height } = map;

    // console.log('next step:\n', nrgToString(nrg, width));
    let newFlashes = (allFlashes = getFlashes(nrg));
    let tries = 0;
    doLog && console.log('------ step');
    doLog && console.log(tries, nrgToString(nrg, width));

    while (newFlashes.length && tries < 100) {
      flash(nrg, width, height, newFlashes);
      tries++;
      newFlashes = getFlashes(nrg).filter((v) => !allFlashes.includes(v));
      // console.log(nrgToString(nrg, width));
      // console.log({ newFlashes, allFlashes });
      allFlashes = [...allFlashes, ...newFlashes];
      doLog && console.log(tries, nrgToString(nrg, width));
    }
    allFlashes.forEach((i) => (nrg[i] = 0));

    map.nrg = nrg;
    return allFlashes.length;
  }

  function nrgToString(nrg, width) {
    const chunks = [];
    let i = 0;
    while (i < nrg.length) {
      chunks.push(nrg.slice(i, i + width));
      i += width;
    }
    return chunks
      .map((nums) => nums.map((num) => (num < 10 ? '  ' : ' ') + num).join(''))
      .join('|\n');
  }
  /*  test('part 1 example 1', () => {
    let parsed = getParsed(`6594254334
3856965822
6375667284
7252447257
7468496589
5278635756
3287952832
7993992245
5957959665
6394862637`);
    console.log(parsed);
    const nrg = parsed.nrg.map((v) => v + 1);
    const flashes = getFlashes(nrg);

    expect(flashes).toEqual([
      2, 14, 45, 49, 64, 71, 72, 74, 75, 81, 84, 86, 92,
    ]);

    console.log('before', nrgToString(nrg, 10));
    flash(nrg, 10, 10, flashes);
    console.log('after', nrgToString(nrg, 10));
  });*/

  test('part 1 example 10', () => {
    let parsed = getParsed(exampleInput);
    console.log(parsed);
    const result = new Array(10).fill(0).reduce((acc, v, i) => {
      const flashes = step(parsed, true);
      console.log(`step ${i}: ${flashes}`);
      return acc + flashes;
    }, 0);
    console.log('1a ', nrgToString(parsed.nrg, parsed.width));

    expect(result).toEqual(204);
  });

  test('part 1 example 100', () => {
    let parsed = getParsed(exampleInput);
    const result = new Array(100).fill(0).reduce((acc, v, i) => {
      const flashes = step(parsed);
      // console.log(`step ${i}: ${flashes}`);
      return acc + flashes;
    }, 0);
    console.log('1b ', nrgToString(parsed.nrg, parsed.width));
    expect(result).toEqual(1656);
  });
  test('part 1', () => {
    let parsed = getParsed(input);
    const result = new Array(100).fill(0).reduce((acc, v, i) => {
      const flashes = step(parsed);
      // console.log(`step ${i}: ${flashes}`);
      return acc + flashes;
    }, 0);
    console.log('fo re4l', nrgToString(parsed.nrg, parsed.width));
    expect(result).toEqual(1705);
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

const input = `3113284886
2851876144
2774664484
6715112578
7146272153
6256656367
3148666245
3857446528
7322422833
8152175168`;
