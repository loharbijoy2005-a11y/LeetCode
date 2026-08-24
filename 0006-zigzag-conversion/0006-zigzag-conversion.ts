function convert(s: string, numRows: number): string {
    // Agar single row ho ya string length rows se kam ho, pattern same rahega
    if (numRows === 1 || s.length <= numRows) {
        return s;
    }

    const rows: string[] = new Array(numRows).fill('');
    let currentRow = 0;
    let goingDown = false;

    for (const char of s) {
        rows[currentRow] += char;

        // Top ya bottom row par pahunchte hi direction reverse karo
        if (currentRow === 0 || currentRow === numRows - 1) {
            goingDown = !goingDown;
        }

        currentRow += goingDown ? 1 : -1;
    }

    return rows.join('');
}

