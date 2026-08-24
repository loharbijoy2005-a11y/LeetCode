/**
 Do not return anything, modify board in-place instead.
 */
function solveSudoku(board: string[][]): void {
    const isValid = (row: number, col: number, char: string): boolean => {
        for (let i = 0; i < 9; i++) {
            // Row check
            if (board[row][i] === char) return false;
            // Column check
            if (board[i][col] === char) return false;
            // 3x3 Box check
            const boxRow = 3 * Math.floor(row / 3) + Math.floor(i / 3);
            const boxCol = 3 * Math.floor(col / 3) + (i % 3);
            if (board[boxRow][boxCol] === char) return false;
        }
        return true;
    };

    const backtrack = (): boolean => {
        for (let r = 0; r < 9; r++) {
            for (let c = 0; c < 9; c++) {
                if (board[r][c] === '.') {
                    for (let num = 1; num <= 9; num++) {
                        const char = num.toString();
                        if (isValid(r, c, char)) {
                            board[r][c] = char;

                            if (backtrack()) {
                                return true;
                            }

                            // Undo placement (Backtrack)
                            board[r][c] = '.';
                        }
                    }
                    return false; // Valid placement na milne par peeche laut jao
                }
            }
        }
        return true; // Saare cells fill ho gaye
    };

    backtrack();
}




