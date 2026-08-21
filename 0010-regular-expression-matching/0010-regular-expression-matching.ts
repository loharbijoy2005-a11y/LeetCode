function isMatch(s: string, p: string): boolean {
    const m = s.length;
    const n = p.length;

    // dp[i][j] represents if s[0...i-1] matches p[0...j-1]
    const dp: boolean[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(false));

    // Base case: empty string matches empty pattern
    dp[0][0] = true;

    // Handles patterns with '*' matching an empty string (e.g., "a*", "a*b*")
    for (let j = 2; j <= n; j++) {
        if (p[j - 1] === '*') {
            dp[0][j] = dp[0][j - 2];
        }
    }

    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (p[j - 1] === '.' || p[j - 1] === s[i - 1]) {
                dp[i][j] = dp[i - 1][j - 1];
            } else if (p[j - 1] === '*') {
                // Case 1: Count '*' as zero of the preceding character
                dp[i][j] = dp[i][j - 2];

                // Case 2: Count '*' as one or more of the preceding character
                if (p[j - 2] === '.' || p[j - 2] === s[i - 1]) {
                    dp[i][j] = dp[i][j] || dp[i - 1][j];
                }
            }
        }
    }

    return dp[m][n];
}
    
