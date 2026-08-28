function getPermutation(n: number, k: number): string {
    const numbers: number[] = [];
    let fact = 1;

    // Build the array of available numbers [1, 2, ..., n]
    // and compute (n - 1)!
    for (let i = 1; i <= n; i++) {
        numbers.push(i);
        if (i < n) {
            fact *= i;
        }
    }

    // Convert k to 0-based index
    k -= 1;

    let result = "";

    for (let i = n - 1; i > 0; i--) {
        const index = Math.floor(k / fact);
        result += numbers[index];
        
        // Remove the used number
        numbers.splice(index, 1);

        // Update k and fact for the next iteration
        k %= fact;
        fact = Math.floor(fact / i);
    }

    // Append the last remaining number
    result += numbers[0];

    return result;
}
    
