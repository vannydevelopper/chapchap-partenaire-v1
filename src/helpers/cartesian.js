export default function cartesian(arrays) {
          return arrays.reduce(function (a, b) {
                    return a.map(function (x) {
                              return b.map(function (y) {
                                        return [...x, y];
                              });
                    }).reduce(function (a, b) { return a.concat(b) }, []);
          }, [[]]);
}