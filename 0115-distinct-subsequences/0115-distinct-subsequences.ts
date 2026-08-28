function numDistinct(s: string, t: string): number {
    const m = s.length;
    const n = t.length;

    // dp[j] represents the number of distinct subsequences of s that form t[0...j-1]
    const dp: number[] = new Array(n + 1).fill(0);

    // Base case: An empty string t can always be formed in exactly 1 way
    dp[0] = 1;

    for (let i = 1; i <= m; i++) {
        // Iterate backwards through t to use values from the previous iteration of s
        for (let j = n; j >= 1; j--) {
            if (s[i - 1] === t[j - 1]) {
                dp[j] += dp[j - 1];
            }
        }
    }

    return dp[n];
}
    
