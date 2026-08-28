function fullJustify(words: string[], maxWidth: number): string[] {
    const result: string[] = [];
    let currentLine: string[] = [];
    let currentLineChars = 0; // Total characters in currentLine without spaces

    for (const word of words) {
        // currentLineChars + word.length + currentLine.length (minimum 1 space between each)
        if (currentLineChars + word.length + currentLine.length > maxWidth) {
            const totalSpaces = maxWidth - currentLineChars;
            const gaps = currentLine.length - 1;

            if (gaps === 0) {
                // Single word on the line -> Left-justify
                result.push(currentLine[0] + " ".repeat(totalSpaces));
            } else {
                // Fully justify: distribute spaces evenly, extra spaces go to left gaps
                const baseSpaces = Math.floor(totalSpaces / gaps);
                const extraSpaces = totalSpaces % gaps;

                let line = "";
                for (let i = 0; i < currentLine.length; i++) {
                    line += currentLine[i];
                    if (i < gaps) {
                        const spacesToAdd = baseSpaces + (i < extraSpaces ? 1 : 0);
                        line += " ".repeat(spacesToAdd);
                    }
                }
                result.push(line);
            }

            currentLine = [];
            currentLineChars = 0;
        }

        currentLine.push(word);
        currentLineChars += word.length;
    }

    // Last line -> Left-justify, pad remaining space at the end
    const lastLine = currentLine.join(" ");
    result.push(lastLine + " ".repeat(maxWidth - lastLine.length));

    return result;
}
    
