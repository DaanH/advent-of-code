describe('day 12', () => {
  function parseNodes(input) {
    const nodes = input.split('\n').reduce((acc, line) => {
      const [start, end] = line.split('-');
      const startNode = acc[start] || {
        name: start,
        links: [],
        isSmall: start.charCodeAt(0) > 96,
      };
      startNode.links.push(end);
      acc[start] = startNode;
      const endNode = acc[end] || {
        name: end,
        links: [],
        isSmall: end.charCodeAt(0) > 96,
      };
      endNode.links.push(start);
      acc[end] = endNode;
      return acc;
    }, {});
    return nodes;
  }

  function findRoutes(nodes, start, goal) {
    const result = [];
    let i = 0;
    const tryLinks = (node, stack) => {
      i++;
      // if (stack.length > 2) return;
      // console.log(stack);
      for (let link of node.links) {
        if (link === goal) {
          result.push([...stack, goal]);
        } else {
          const next = nodes[link];
          if (!next.isSmall || !stack.includes(next.name))
            tryLinks(next, [...stack, link]);
        }
      }
    };
    tryLinks(nodes[start], [start]);
    return result;
  }

  function findRoutes2(nodes, start, goal) {
    const result = [];
    let i = 0;
    const smallCaves = Object.values(nodes).filter(
      ({ name, isSmall }) => isSmall && !['start', 'end'].includes(name)
    );

    smallCaves.forEach((specialSmallCave) => {
      const tryLinks = (node, stack) => {
        i++;
        // if (stack.length > 2) return;
        // console.log(stack);
        let specialVisited = false;
        for (let link of node.links) {
          if (link === goal) {
            result.push([...stack, goal]);
          } else {
            const next = nodes[link];
            if (
              !next.isSmall ||
              (next === specialSmallCave &&
                stack.filter((n) => n === next.name).length < 2) ||
              !stack.includes(next.name)
            )
              tryLinks(next, [...stack, link]);
          }
        }
      };
      tryLinks(nodes[start], [start]);
      console.log({ specialSmallCave, result });
    });
    return result;
  }

  test('part 1a', () => {
    const nodes = parseNodes(input1a);
    // console.log({ nodes });
    expect(Object.keys(nodes).length).toEqual(6);

    const routes = findRoutes(nodes, 'start', 'end');
    // console.log({ routes });
    expect(routes.length).toEqual(10);
  });
  test('part 1b', () => {
    const nodes = parseNodes(input1b);
    // console.log(nodes);

    const routes = findRoutes(nodes, 'start', 'end');
    // console.log({ routes });
    expect(routes.length).toEqual(19);
  });
  test('part 1c', () => {
    const nodes = parseNodes(input1c);
    // console.log(nodes);

    const routes = findRoutes(nodes, 'start', 'end');
    // console.log({ routes });
    expect(routes.length).toEqual(226);
  });
  test('part 1', () => {
    const nodes = parseNodes(input1);
    // console.log(nodes);

    const routes = findRoutes(nodes, 'start', 'end');
    // console.log({ routes });
    expect(routes.length).toEqual(3495);
  });

  test('part 2a', () => {
    const nodes = parseNodes(input1a);
    console.log(nodes);

    const routes = [
      ...new Set(
        findRoutes2(nodes, 'start', 'end').map((route) => route.join())
      ), // de-dupe
    ].sort();
    console.log({ routes });
    expect(routes.length).toEqual(36);
  });

  test('part 2', () => {
    const nodes = parseNodes(input1);
    console.log(nodes);

    const routes = [
      ...new Set(
        findRoutes2(nodes, 'start', 'end').map((route) => route.join())
      ), // de-dupe
    ].sort();
    console.log({ routes });
    expect(routes.length).toEqual(94849);
  });
});

const input1a = `start-A
start-b
A-c
A-b
b-d
A-end
b-end`;

const input1b = `dc-end
HN-start
start-kj
dc-start
dc-HN
LN-dc
HN-end
kj-sa
kj-HN
kj-dc`;

const input1c = `fs-end
he-DX
fs-he
start-DX
pj-DX
end-zg
zg-sl
zg-pj
pj-he
RW-he
fs-DX
pj-RW
zg-RW
start-pj
he-WI
zg-he
pj-fs
start-RW`;

const input1 = `OU-xt
hq-xt
br-HP
WD-xt
end-br
start-OU
hq-br
MH-hq
MH-start
xt-br
end-WD
hq-start
MH-br
qw-OU
hm-WD
br-WD
OU-hq
xt-MH
qw-MH
WD-qw
end-qw
qw-xt`;
