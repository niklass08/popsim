export default function (array) {
  return array.reduce((acc, current, index) => {
    if (index % 10 == 0) acc.push(current);
    return acc;
  }, []);
}
