function findMedianSortedArrays(nums1: number[], nums2: number[]): number {
    // Ensure nums1 is the smaller array
    if (nums1.length > nums2.length) {
        return findMedianSortedArrays(nums2, nums1);
    }

    const m = nums1.length;
    const n = nums2.length;
    let low = 0;
    let high = m;
    const totalLeft = Math.floor((m + n + 1) / 2);

    while (low <= high) {
        const i = Math.floor((low + high) / 2);
        const j = totalLeft - i;

        // Partition boundaries for nums1
        const nums1LeftMax = (i === 0) ? -Infinity : nums1[i - 1];
        const nums1RightMin = (i === m) ? Infinity : nums1[i];

        // Partition boundaries for nums2
        const nums2LeftMax = (j === 0) ? -Infinity : nums2[j - 1];
        const nums2RightMin = (j === n) ? Infinity : nums2[j];

        // Check if partitions are valid
        if (nums1LeftMax <= nums2RightMin && nums2LeftMax <= nums1RightMin) {
            if ((m + n) % 2 === 1) {
                return Math.max(nums1LeftMax, nums2LeftMax);
            } else {
                const maxLeft = Math.max(nums1LeftMax, nums2LeftMax);
                const minRight = Math.min(nums1RightMin, nums2RightMin);
                return (maxLeft + minRight) / 2.0;
            }
        } else if (nums1LeftMax > nums2RightMin) {
            high = i - 1; // Move left in nums1
        } else {
            low = i + 1;  // Move right in nums1
        }
    }

    return 0.0;
}
    
