class Solution {

    /**
     * @param Integer $n
     * @return Boolean
     */
    function checkDivisibility($n) {
        $temp = $n;
        $sum = 0;
        $product = 1;

        while ($temp > 0) {
            $digit = $temp % 10;
            $sum += $digit;
            $product *= $digit;
            $temp = (int)($temp / 10);
        }

        $total = $sum + $product;

        // Check if total is non-zero and n is divisible by total
        if ($total == 0) {
            return false;
        }

        return ($n % $total === 0);
    }
}


        

