function isPalindrome(x: number): number | boolean {
    // Negative numbers aur jin numbers ke end me 0 ho (except 0 itself) palindrome nahi hote
    if (x < 0 || (x % 10 === 0 && x !== 0)) {
        return false;
    }

    let reversedHalf = 0;
    while (x > reversedHalf) {
        reversedHalf = reversedHalf * 10 + (x % 10);
        x = Math.floor(x / 10);
    }

    // Even length numbers ke liye x === reversedHalf
    // Odd length numbers ke liye middle digit hatane ke liye Math.floor(reversedHalf / 10)
    return x === reversedHalf || x === Math.floor(reversedHalf / 10);
}

