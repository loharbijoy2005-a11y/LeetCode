function countSmaller(nums: number[]): number[] {
    const n = nums.length;
    const result: number[] = new Array(n).fill(0);
    
    // Har number ke sath uska original index store karte hain: [value, originalIndex]
    let arr: [number, number][] = nums.map((val, idx) => [val, idx]);

    function mergeSort(left: number, right: number): void {
        if (left >= right) return;

        const mid = Math.floor((left + right) / 2);
        mergeSort(left, mid);
        mergeSort(mid + 1, right);

        const merged: [number, number][] = [];
        let i = left;
        let j = mid + 1;
        let rightCount = 0; // Right side ke kitne elements current left element se chhote hain

        while (i <= mid && j <= right) {
            if (arr[j][0] < arr[i][0]) {
                rightCount++;
                merged.push(arr[j]);
                j++;
            } else {
                result[arr[i][1]] += rightCount;
                merged.push(arr[i]);
                i++;
            }
        }

        while (i <= mid) {
            result[arr[i][1]] += rightCount;
            merged.push(arr[i]);
            i++;
        }

        while (j <= right) {
            merged.push(arr[j]);
            j++;
        }

        for (let k = left; k <= right; k++) {
            arr[k] = merged[k - left];
        }
    }

    mergeSort(0, n - 1);
    return result;
}
    
