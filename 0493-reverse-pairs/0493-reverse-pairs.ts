function reversePairs(nums: number[]): number {
    return mergeSort(nums, 0, nums.length - 1);
}

function mergeSort(nums: number[], left: number, right: number): number {
    if (left >= right) return 0;
    
    const mid = Math.floor((left + right) / 2);
    let count = mergeSort(nums, left, mid) + mergeSort(nums, mid + 1, right);
    
    // Count reverse pairs between left and right halves
    let j = mid + 1;
    for (let i = left; i <= mid; i++) {
        while (j <= right && nums[i] > 2 * nums[j]) {
            j++;
        }
        count += (j - (mid + 1));
    }
    
    // Merge the two sorted halves
    merge(nums, left, mid, right);
    
    return count;
}

function merge(nums: number[], left: number, mid: number, right: number): void {
    const temp: number[] = [];
    let i = left;
    let j = mid + 1;
    
    while (i <= mid && j <= right) {
        if (nums[i] <= nums[j]) {
            temp.push(nums[i++]);
        } else {
            temp.push(nums[j++]);
        }
    }
    
    while (i <= mid) {
        temp.push(nums[i++]);
    }
    
    while (j <= right) {
        temp.push(nums[j++]);
    }
    
    for (let k = 0; k < temp.length; k++) {
        nums[left + k] = temp[k];
    }
}
    
