function sumGame(num: string): boolean {
    const n = num.length;
    const half = n / 2;
    
    let sumDiff = 0;   // sum(left) - sum(right)
    let qDiff = 0;     // count('?' in left) - count('?' in right)

    for (let i = 0; i < n; i++) {
        const char = num[i];
        const isLeft = i < half;

        if (char === '?') {
            qDiff += isLeft ? 1 : -1;
        } else {
            const digit = Number(char);
            sumDiff += isLeft ? digit : -digit;
        }
    }

    // Agar total '?' odd hai, toh Alice last move karegi aur hamesha jeetegi
    if (qDiff % 2 !== 0) {
        return true;
    }

    // Bob tabhi jeet sakta hai jab missing numbers ka balanced contribution (9/2 * qDiff) exact sum difference ko cancel kare
    return sumDiff * 2 + qDiff * 9 !== 0;
}
    
