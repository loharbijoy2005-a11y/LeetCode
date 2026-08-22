type Fn = (...params: any[]) => any;

function memoize(fn: Fn): Fn {
    const root = new Map();
    const RESULT_KEY = Symbol('result');

    return function(...args: any[]) {
        let curr = root;

        for (const arg of args) {
            if (!curr.has(arg)) {
                curr.set(arg, new Map());
            }
            curr = curr.get(arg);
        }

        if (curr.has(RESULT_KEY)) {
            return curr.get(RESULT_KEY);
        }

        const result = fn(...args);
        curr.set(RESULT_KEY, result);
        return result;
    };
}


    

        













