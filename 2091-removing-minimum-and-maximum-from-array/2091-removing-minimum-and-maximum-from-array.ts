function minimumDeletions(nums: number[]): number {
    const n = nums.length;
    if (n <= 2) return n;

    let minIdx = 0;
    let maxIdx = 0;

    // 1. Find indices of minimum and maximum elements
    for (let i = 1; i < n; i++) {
        if (nums[i] < nums[minIdx]) minIdx = i;
        if (nums[i] > nums[maxIdx]) maxIdx = i;
    }

    // Let leftIdx be the smaller index and rightIdx be the larger index
    const leftIdx = Math.min(minIdx, maxIdx);
    const rightIdx = Math.max(minIdx, maxIdx);

    // 2. Evaluate the 3 possible deletion strategies:
    // Option 1: Delete both from the front
    const bothFromFront = rightIdx + 1;

    // Option 2: Delete both from the back
    const bothFromBack = n - leftIdx;

    // Option 3: Delete left from front and right from back
    const frontAndBack = (leftIdx + 1) + (n - rightIdx);

    // 3. Return the minimum of the three strategies
    return Math.min(bothFromFront, bothFromBack, frontAndBack);
}
    
