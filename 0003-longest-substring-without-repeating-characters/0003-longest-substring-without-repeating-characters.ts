function lengthOfLongestSubstring(s: string): number {
    const map = new Map<string, number>();
    let maxLength = 0;
    let left = 0;

    for (let right = 0; right < s.length; right++) {
        const char = s[right];

        // Agar character window ke andar pehle se present hai
        if (map.has(char) && map.get(char)! >= left) {
            left = map.get(char)! + 1;
        }

        map.set(char, right);
        maxLength = Math.max(maxLength, right - left + 1);
    }

    return maxLength;
}
    
