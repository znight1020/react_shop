// Ant Design 홈페이지에서 Collapse 검색해서 기능 사용하기

const categories = [
    {
        _id: 1,
        name: "맨투맨",
    },
    {
        _id: 2,
        name: "청바지",
    },
    {
        _id: 3,
        name: "트레이닝복",
    },
    {
        _id: 4,
        name: "아우터",
    },
];

const price = [
    {
        _id: 0,
        name: "Any",
        array: [],
    },
    {
        _id: 1,
        name: "￦0 to ￦9,999",
        array: [0, 9999],
    },
    {
        _id: 2,
        name: "￦10,000 to ￦24,999",
        array: [10000, 24999],
    },
    {
        _id: 3,
        name: "￦25,000 to ￦50,000",
        array: [25000, 50000],
    },
    {
        _id: 4,
        name: "More than ￦50,000",
        array: [50001, 1000000],
    },
];

export { categories, price };
