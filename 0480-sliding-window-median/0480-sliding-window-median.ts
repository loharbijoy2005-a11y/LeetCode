function medianSlidingWindow(nums: number[], k: number): number[] {
    const ans: number[] = [];
    
    // Initial window sorted
    const window: number[] = nums.slice(0, k).sort((a, b) => a - b);
    
    const getMedian = (): number => {
        const mid = Math.floor(k / 2);
        if (k % 2 === 1) {
            return window[mid];
        } else {
            return (window[mid - 1] + window[mid]) / 2;
        }
    };
    
    ans.push(getMedian());
    
    for (let i = k; i < nums.length; i++) {
        // Remove outgoing element using binary search
        const outNum = nums[i - k];
        const outIdx = binarySearchFind(window, outNum);
        window.splice(outIdx, 1);
        
        // Insert incoming element maintaining sorted order
        const inNum = nums[i];
        const inIdx = binarySearchInsert(window, inNum);
        window.splice(inIdx, 0, inNum);
        
        ans.push(getMedian());
    }
    
    return ans;
}

// Helper for binary search finding
function binarySearchFind(arr: number[], target: number): number {
    let left = 0, right = arr.length - 1;
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (arr[mid] === target) return mid;
        if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return left;
}

// Helper for binary search insertion index
function binarySearchInsert(arr: number[], target: number): number {
    let left = 0, right = arr.length;
    while (left < right) {
        const mid = Math.floor((left + right) / 2);
        if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid;
        }
    }
    return left;
}
    
