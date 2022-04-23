import mergesort from './index'

test('mergesort sorts correctly', () => {
    const expected = [0,1,2,3,4,5,6,7,8,9]
    const actual = mergesort([3,1,0,2,7,4,8,5,6,9])

    expect(actual.length).toBe(expected.length);
    actual.forEach((element, index) => {
        expect(element).toBe(expected[index]);
    });
})