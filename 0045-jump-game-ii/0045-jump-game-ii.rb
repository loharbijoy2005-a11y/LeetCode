# @param {Integer[]} nums
# @return {Integer}
def jump(nums)
  n = nums.length
  return 0 if n <= 1

  jumps = 0
  current_end = 0
  farthest = 0

  # Loop up to n - 2 because once we reach or pass n - 1, no more jumps are needed
  (0...n - 1).each do |i|
    farthest = [farthest, i + nums[i]].max

    # When we reach the boundary of the current jump
    if i == current_end
      jumps += 1
      current_end = farthest
      break if current_end >= n - 1
    end
  end

  jumps
end


    
