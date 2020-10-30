/*
--- Memoization
- What: technique giúp tăng performance bằng cách tái sử dụng KQ trước đó.
- When: Tính toán, xử lý phức tạp, tốn thới gian, sử dụng nhiều.
- Why: Optimize performance
- How:  

- Cache:
 */

const memoizedSum = () => {
  const cache = {};

  return (n) => {
    if (n <= 0) return -1;

    // retunr result from cache first
    const key = `${n}_sum`;
    if (cache[key]) {
      console.log('Use result from cache', cache[key]);
      return cache[key];
    }

    // caculate and save to cache
    const result = (n * (n + 1)) / 2;
    cache[key] = result;
    console.log('Calculate', result);
    return result;
  };
};
const magicSum = memoizedSum();
magicSum(10);
magicSum(100);
magicSum(105);
magicSum(100);
magicSum(100);

console.log('\n\nresult sum 2');
const magicSum2 = memoizedSum();
magicSum2(100);
magicSum2(105);
