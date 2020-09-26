function sum(firstValue: number, secondValue: number) {
    return firstValue + secondValue;
}
test("adds 1 + 2 to equal 3", () => {
    expect(sum(1, 2)).toBe(3);
});
