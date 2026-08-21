/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode() : val(0), next(nullptr) {}
 *     ListNode(int x) : val(x), next(nullptr) {}
 *     ListNode(int x, ListNode *next) : val(x), next(next) {}
 * };
 */
class Solution {
public:
    ListNode* reverseKGroup(ListNode* head, int k) {
        if (!head || k == 1) return head;

        ListNode dummy(0);
        dummy.next = head;
        ListNode* prevGroupEnd = &dummy;

        while (true) {
            // Check if there are at least k nodes left
            ListNode* kthNode = prevGroupEnd;
            for (int i = 0; i < k && kthNode != nullptr; ++i) {
                kthNode = kthNode->next;
            }
            if (!kthNode) break; // Less than k nodes remaining

            ListNode* nextGroupStart = kthNode->next;
            ListNode* curr = prevGroupEnd->next;
            ListNode* prev = nextGroupStart;

            // Reverse k nodes
            while (curr != nextGroupStart) {
                ListNode* temp = curr->next;
                curr->next = prev;
                prev = curr;
                curr = temp;
            }

            // Connect previous group with newly reversed group
            ListNode* currentGroupTail = prevGroupEnd->next;
            prevGroupEnd->next = kthNode;
            prevGroupEnd = currentGroupTail;
        }

        return dummy.next;
    }
};


        

