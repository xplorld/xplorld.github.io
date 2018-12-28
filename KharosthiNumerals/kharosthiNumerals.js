const swap = (d) => {
    let ret = {};
    Object.keys(d).forEach((k) => ret[d[k]] = k);
    return ret;
};


/*
rules:

1
2
3
4
5 = 4 + 1
6 = 4 + 2
7 = 4 + 3
8 = 4 + 4
9 = 4 + 4 + 1
10
20
30 = 20 + 10
40 = 20 + 20
50 = 20 + 20 + 10
60 = 20 + 20 + 20
70 = 20 + 20 + 20 + 10
80 = 20 + 20 + 20 + 20
90 = 20 + 20 + 20 + 20 + 10
100
n00 = n 100
1000
n000 = n 1000
1996 = 1000 + (4+4+1)*100+(20+20+20+20+10)+(4+2)

f(x*1000 + y * 100 + z * 10 + w) = f(x) 1000 f(y) 100 f(z*10) f(w)

*/

const kharosthi = {}

kharosthi.toInt = (str) => {
    return kharosthi._IntArrayToInt(kharosthi._strToIntArray(str));
};

kharosthi.fromInt = (i) => {
    if (Object.is(i, NaN)) {
        throw new Error("NaN");
    }
    return kharosthi._intArrayToStr(kharosthi._intToIntArray(i));
};


kharosthi._strToIntArray = (str) => {
    const ints = [];
    for (const char of str) {
        ints.push(kharosthi.chars[char]);
    }
    return ints;
};

kharosthi._intArrayToStr = (ints) => {
    return ints.map((i) => kharosthi.numbers[i]).join('');
}

kharosthi._intToIntArray = (i) => {
    let ints = [];
    //thousands
    const thousands = Math.floor(i / 1000);
    if (thousands == 1) {
        ints.push(...kharosthi.encodeRule[1000]);
    } else if (thousands > 1) {
        const thousandsInts = kharosthi._intToIntArray(thousands);
        ints.push(...thousandsInts);
        ints.push(...kharosthi.encodeRule[1000]);
    }
    i = i - thousands * 1000;
    
    //hundreds
    const hundreds = Math.floor(i / 100);
    if (hundreds == 1) {
        ints.push(...kharosthi.encodeRule[100]);
    } else if (hundreds > 1) {
        const hundredsInts = kharosthi._intToIntArray(hundreds);
        ints.push(...hundredsInts);
        ints.push(...kharosthi.encodeRule[100]);
    }
    i = i - hundreds * 100;
    
    //tens
    const tens = Math.floor(i / 10);
    if (tens > 0) {
        ints.push(...kharosthi.encodeRule[tens * 10]);
    }

    i = i - tens * 10;

    //ones
    const ones = i;
    if (ones > 0) {
        ints.push(...kharosthi.encodeRule[ones]);
    }
    return ints;
};

kharosthi._IntArrayToInt = (ints) => {
    const result = ints.reduce((acc, cur) => kharosthi.decodeRule[cur](acc), 0);
    if (result <= 0) {
        throw new Error("ill-formed input");
    }
    return result;
}


kharosthi.numbers = {
    1: "𐩀",
    2: "𐩁",
    3: "𐩂",
    4: "𐩃",
    10: "𐩄",
    20: "𐩅",
    100: "𐩆",
    1000: "𐩇",
};
kharosthi.chars = swap(kharosthi.numbers);

kharosthi.encodeRule = {
    1: [1],
    2: [2],
    3: [3],
    4: [4],
    5: [4, 1],
    6: [4, 2],
    7: [4, 3],
    8: [4, 4],
    9: [4, 4, 1],
    10: [10],
    20: [20],
    30: [20, 10],
    40: [20, 20],
    50: [20, 20, 10],
    60: [20, 20, 20],
    70: [20, 20, 20, 10],
    80: [20, 20, 20, 20],
    90: [20, 20, 20, 20, 10],
    100: [100],
    1000: [1000],
};

const adder = (i) => (j) => i + j;

kharosthi.decodeRule = {
    1: adder(1),
    2: adder(2),
    3: adder(3),
    4: adder(4),
    10: adder(10),
    20: adder(20),
    100: (i) => Math.floor(i / 100)*100 + Math.max((i%100)*100, 100),
    1000: (i) => Math.max(i * 1000, 1000),
};