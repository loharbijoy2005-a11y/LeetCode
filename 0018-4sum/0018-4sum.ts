function fourSum(nums: number[], target: number): number[][] {
    nums.sort((a, b) => a - b);
    const n = nums.length;
    const result: number[][] = [];

    for (let i = 0; i < n - 3; i++) {
        // Skip duplicate elements for the first number
        if (i > 0 && nums[i] === nums[i - 1]) continue;

        for (let j = i + 1; j < n - 2; j++) {
            // Skip duplicate elements for the second number
            if (j > i + 1 && nums[j] === nums[j - 1]) continue;

            let left = j + 1;
            let right = n - 1;

            while (left < right) {
                // JavaScript numbers are 64-bit floats, which can safely handle sums up to ~9 x 10^15. 
                // The max sum here is 4 * 10^9, so overflow is not an issue.
                const sum = nums[i] + nums[j] + nums[left] + nums[right];

                if (sum === target) {
                    result.push([nums[i], nums[j], nums[left], nums[right]]);

                    // Skip duplicates for the third and fourth numbers
                    while (left < right && nums[left] === nums[left + 1]) left++;
                    while (left < right && nums[right] === nums[right - 1]) right--;

                    left++;
                    right--;
                } else if (sum < target) {
                    left++;
                } else {
                    right--;
                }
            }
        }
    }

    return result;
}
    
