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
      if (i > 100) return;
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

  test('part 1 example', () => {
    const nodes = parseNodes(input1a);
    console.log({ nodes });
    expect(Object.keys(nodes).length).toEqual(6);

    const routes = findRoutes(nodes, 'start', 'end');
    console.log({ routes });
  });
});

const input1a = `start-A
start-b
A-c
A-b
b-d
A-end
b-end`;
