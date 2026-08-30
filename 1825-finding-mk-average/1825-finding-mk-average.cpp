#include <vector>
#include <set>
#include <queue>

using namespace std;

class MKAverage {
private:
    int m, k;
    queue<int> q;
    multiset<int> low, mid, high;
    long long midSum; // To store the sum of elements in the middle multiset

    // Helper to remove an element from a multiset
    void remove(multiset<int>& s, int val) {
        auto it = s.find(val);
        if (it != s.end()) {
            s.erase(it);
        }
    }

public:
    MKAverage(int m, int k) {
        this->m = m;
        this->k = k;
        this->midSum = 0;
    }
    
    void addElement(int num) {
        q.push(num);
        
        // If window exceeds size m, remove the oldest element
        if (q.size() > m) {
            int out = q.front();
            q.pop();
            
            // Find and remove 'out' from whichever multiset it belongs to
            if (low.find(out) != low.end()) {
                remove(low, out);
                // Balance low from mid
                if (!mid.empty()) {
                    int smallestMid = *mid.begin();
                    low.insert(smallestMid);
                    midSum -= smallestMid;
                    remove(mid, smallestMid);
                }
            } else if (mid.find(out) != mid.end()) {
                remove(mid, out);
                midSum -= out;
            } else {
                remove(high, out);
                // Balance high from mid
                if (!mid.empty()) {
                    int largestMid = *mid.rbegin();
                    high.insert(largestMid);
                    midSum -= largestMid;
                    remove(mid, largestMid);
                }
            }
        }
        
        // Insert the new element into the appropriate multiset
        if (low.empty() || num <= *low.rbegin()) {
            low.insert(num);
        } else if (high.empty() || num >= *high.begin()) {
            high.insert(num);
        } else {
            mid.insert(num);
            midSum += num;
        }
        
        // Balance sizes: low should have size k, high should have size k, mid should have size m - 2*k
        while (low.size() > k) {
            int val = *low.rbegin();
            remove(low, val);
            mid.insert(val);
            midSum += val;
        }
        
        while (high.size() > k) {
            int val = *high.begin();
            remove(high, val);
            mid.insert(val);
            midSum += val;
        }
        
        while (low.size() < k && !mid.empty()) {
            int val = *mid.begin();
            remove(mid, val);
            midSum -= val;
            low.insert(val);
        }
        
        while (high.size() < k && !mid.empty()) {
            int val = *mid.rbegin();
            remove(mid, val);
            midSum -= val;
            high.insert(val);
        }
    }
    
    int calculateMKAverage() {
        if (q.size() < m) {
            return -1;
        }
        return midSum / (m - 2 * k);
    }
};


        
    
    
   
        
    
    

        
    







