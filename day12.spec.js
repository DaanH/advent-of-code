describe('day 12', () => {
    function parseNodes(input) {
        return input.split('\n').reduce((acc, line) => {
            const [start, end] = line.split('-');

            acc[start] = acc[start] || {
                isSmall: start.charCodeAt(0) > 96,
                links: []
            }
            acc[start].links.push(end);

            acc[end] = acc[end] || {
                isSmall: start.charCodeAt(0) > 96,
                links: [start]
            }
            acc[end].links.push(start);
            return acc;
        }, {});
    }
    function findAllRoutes(nodes, start) {

    }
    test('part 1a', () => {
        const nodes = parseNodes(input1a);
        console.log(nodes);
        expect(Object.keys(nodes)).toEqual(['start', 'A', 'b', 'c', 'd', 'end'])

    })
})

const input1a = `start-A
start-b
A-c
A-b
b-d
A-end
b-end`