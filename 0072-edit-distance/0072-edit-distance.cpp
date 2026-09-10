#include <vector>
#include <string>
#include <algorithm>

using namespace std;

class Solution {
public:
    int minDistance(string word1, string word2) {
        int m = word1.length();
        int n = word2.length();
        
        // dp[j] word1 ke prefix ko word2 ke j-length prefix me convert karne ki cost rakhta hai
        vector<int> dp(n + 1);
        
        // Base case: word1 empty ho to word2 banane ke liye saare insert karne padenge
        for (int j = 0; j <= n; ++j) {
            dp[j] = j;
        }
        
        for (int i = 1; i <= m; ++i) {
            int prev_diag = dp[0]; // dp[i-1][j-1] ka kaam karega
            dp[0] = i;              // Base case: word2 empty ho to i deletions lagenge
            
            for (int j = 1; j <= n; ++j) {
                int temp = dp[j];
                
                if (word1[i - 1] == word2[j - 1]) {
                    dp[j] = prev_diag; // Character match, koi extra operation nahi
                } else {
                    dp[j] = 1 + min({
                        dp[j],       // Delete
                        dp[j - 1],   // Insert
                        prev_diag    // Replace
                    });
                }
                prev_diag = temp;
            }
        }
        
        return dp[n];
    }
};

  
        
    
