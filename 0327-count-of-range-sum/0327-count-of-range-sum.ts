function countRangeSum(nums: number[], lower: number, upper: number): number {
    const n = nums.length;
    // Prefix sums array (64-bit BigInt to avoid integer overflow)
    const prefix: bigint[] = new Array(n + 1).fill(0n);
    for (let i = 0; i < n; i++) {
        prefix[i + 1] = prefix[i] + BigInt(nums[i]);
    }

    const low = BigInt(lower);
    const up = BigInt(upper);

    function mergeSortCount(left: number, right: number): number {
        if (left >= right) return 0;

        const mid = Math.floor((left + right) / 2);
        let count = mergeSortCount(left, mid) + mergeSortCount(mid + 1, right);

        // Count pairs (i, j) where prefix[j] - prefix[i] is in [lower, upper]
        let j = mid + 1;
        let k = mid + 1;
        for (let i = left; i <= mid; i++) {
            while (k <= right && prefix[k] - prefix[i] < low) {
                k++;
            }
            while (j <= right && prefix[j] - prefix[i] <= up) {
                j++;
            }
            count += (j - k);
        }

        // Standard merge step
        const merged: bigint[] = [];
        let p1 = left;
        let p2 = mid + 1;

        while (p1 <= mid && p2 <= right) {
            if (prefix[p1] <= prefix[p2]) {
                merged.push(prefix[p1++]);
            } else {
                merged.push(prefix[p2++]);
            }
        }

        while (p1 <= mid) merged.push(prefix[p1++]);
        while (p2 <= right) merged.push(prefix[p2++]);

        for (let idx = 0; idx < merged.length; idx++) {
            prefix[left + idx] = merged[idx];
        }

        return count;
    }

    return mergeSortCount(0, n);
}
    
