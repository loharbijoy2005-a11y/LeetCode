function reverse(x: number): number {
    let rev = 0;
    const INT_MAX = 2147483647; // 2^31 - 1
    const INT_MIN = -2147483648; // -2^31

    while (x !== 0) {
        // Extract the last digit. Math.trunc ensures proper truncation for negative numbers in JS.
        let pop = x % 10;
        x = Math.trunc(x / 10);

        // Check for positive overflow before it happens
        if (rev > Math.trunc(INT_MAX / 10) || (rev === Math.trunc(INT_MAX / 10) && pop > 7)) {
            return 0;
        }
        // Check for negative underflow before it happens
        if (rev < Math.trunc(INT_MIN / 10) || (rev === Math.trunc(INT_MIN / 10) && pop < -8)) {
            return 0;
        }

        rev = rev * 10 + pop;
    }

    return rev;
}

