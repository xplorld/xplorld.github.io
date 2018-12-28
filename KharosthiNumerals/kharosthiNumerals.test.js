const assertEqual = (actual, expected) => {
    if (JSON.stringify(actual) !== JSON.stringify(expected)) {
        throw new Error(
            "equal assertion failed! expected " +
            JSON.stringify(expected) +
            ", actual " +
            JSON.stringify(actual)
        );
    }
}

const cases = [
    [1, [1]],
    [5, [4, 1]],
    [9, [4, 4, 1]],
    [22, [20, 2]],
    [29, [20, 4, 4, 1]],
    [40, [20, 20]],
    [47, [20, 20, 4, 3]],
    [98, [20, 20, 20, 20, 10, 4, 4]],
    [100, [100]],
    [500, [4, 1, 100]],
    [314, [3, 100, 10, 4]],
    [1000, [1000]],
    [1996, [1000, 4, 4, 1, 100, 20, 20, 20, 20, 10, 4, 2]],
    [2000, [2, 1000]],
    [2000000, [2, 1000, 1000]],
    [20181227, [20, 1000, 100, 20, 20, 20, 20, 1, 1000, 2, 100, 20, 4, 3]],
];

cases.forEach(([int, intarray]) => {
    assertEqual(kharosthi._intToIntArray(int), intarray);
    assertEqual(kharosthi._IntArrayToInt(intarray), int);
});
