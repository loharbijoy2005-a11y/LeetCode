function findKthSmallest(coins: number[], k: number): number {
    // Helper function to calculate GCD
    const gcd = (a: bigint, b: bigint): bigint => (b === 0n ? a : gcd(b, a % b));

    // Helper function to calculate LCM
    const lcm = (a: bigint, b: bigint): bigint => (a * b) / gcd(a, b);

    const n = coins.length;
    const bigCoins = coins.map(BigInt);

    // Precompute LCMs and their sign contribution for all subsets
    const subsets: { lcmVal: bigint; sign: number }[] = [];
    const totalSubsets = 1 << n;

    for (let mask = 1; mask < totalSubsets; mask++) {
        let currentLcm = 1n;
        let bitsCount = 0;

        for (let i = 0; i < n; i++) {
            if ((mask & (1 << i)) !== 0) {
                currentLcm = lcm(currentLcm, bigCoins[i]);
                bitsCount++;
            }
        }

        const sign = (bitsCount % 2 === 1) ? 1 : -1;
        subsets.push({ lcmVal: currentLcm, sign });
    }

    // Function to count multiples <= target using Inclusion-Exclusion
    const countMultiples = (target: bigint): bigint => {
        let count = 0n;
        for (const { lcmVal, sign } of subsets) {
            count += BigInt(sign) * (target / lcmVal);
        }
        return count;
    };

    const bigK = BigInt(k);
    let low = 1n;
    // Upper bound: minimum coin * k
    let minCoin = BigInt(Math.min(...coins));
    let high = minCoin * bigK;
    let result = high;

    // Binary search for the smallest target where count >= k
    while (low <= high) {
        const mid = low + (high - low) / 2n;

        if (countMultiples(mid) >= bigK) {
            result = mid;
            high = mid - 1n;
        } else {
            low = mid + 1n;
        }
    }

    return Number(result);
}
    
