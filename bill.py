def maximize_sum_by_removing(nums):
    """
    Maximize the sum of elements in an array by removing the smallest numbers,
    with the constraint that no two adjacent numbers can be removed.
    
    Args:
        nums: List of integers
        
    Returns:
        The maximum possible sum after removing elements
    """
    if not nums:
        return 0
    
    n = len(nums)
    
    # Base case: if there's only one element
    if n == 1:
        return max(0, nums[0])  # Either keep it or remove it
    
    # dp[i][0] = max sum ending at position i if we keep nums[i]
    # dp[i][1] = max sum ending at position i if we remove nums[i]
    dp = [[0, 0] for _ in range(n)]
    
    # Initialize first element
    dp[0][0] = nums[0]  # Keep the first element
    dp[0][1] = 0        # Remove the first element
    
    for i in range(1, n):
        # If we keep the current element
        # We can either keep or remove the previous element
        dp[i][0] = nums[i] + max(dp[i-1][0], dp[i-1][1])
        
        # If we remove the current element
        # We must keep the previous element (no adjacent removals)
        dp[i][1] = dp[i-1][0]
    
    # The answer is the maximum of keeping or removing the last element
    total_sum = sum(nums)
    removed_sum = total_sum - max(dp[n-1][0], dp[n-1][1])
    return total_sum - removed_sum

# Example usage
nums = [3, 1, 5, 2, 4]
result = maximize_sum_by_removing(nums)
print(f"Original array: {nums}")
print(f"Maximum sum after removals: {result}")