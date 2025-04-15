/**
 * GoThrive Selection Algorithm Implementation
 * 
 * This algorithm helps optimize content selection by balancing exploration and exploitation,
 * similar to Thompson Sampling but with modifications for practical web applications.
 */

class GoThriveSelector {
    constructor(options = {}) {
      // Default configuration
      this.options = {
        explorationFactor: 0.1,
        minSampleSize: 10,
        convergenceThreshold: 0.01,
        decayRate: 0.95,
        ...options
      };
      
      this.variants = new Map();
      this.totalImpressions = 0;
      this.totalConversions = 0;
    }
    
    /**
     * Register a new variant to be considered in the selection process
     * @param {string} variantId - Unique identifier for the variant
     * @param {number} initialWeight - Optional starting weight (default: 1)
     */
    registerVariant(variantId, initialWeight = 1) {
      if (!this.variants.has(variantId)) {
        this.variants.set(variantId, {
          id: variantId,
          impressions: 0,
          conversions: 0,
          conversionRate: 0,
          weight: initialWeight,
          score: 0
        });
      }
      return this;
    }
    
    /**
     * Record an impression for a specific variant
     * @param {string} variantId - The variant that was shown
     */
    recordImpression(variantId) {
      if (!this.variants.has(variantId)) {
        this.registerVariant(variantId);
      }
      
      const variant = this.variants.get(variantId);
      variant.impressions++;
      this.totalImpressions++;
      
      // Recalculate conversion rate
      if (variant.impressions > 0) {
        variant.conversionRate = variant.conversions / variant.impressions;
      }
      
      // Update scores for all variants
      this._updateScores();
      
      return this;
    }
    
    /**
     * Record a conversion for a specific variant
     * @param {string} variantId - The variant that converted
     */
    recordConversion(variantId) {
      if (!this.variants.has(variantId)) {
        throw new Error(`Unknown variant: ${variantId}`);
      }
      
      const variant = this.variants.get(variantId);
      variant.conversions++;
      this.totalConversions++;
      
      // Recalculate conversion rate
      if (variant.impressions > 0) {
        variant.conversionRate = variant.conversions / variant.impressions;
      }
      
      // Update scores for all variants
      this._updateScores();
      
      return this;
    }
    
    /**
     * Select the next variant to show based on current performance data
     * @returns {string} The ID of the selected variant
     */
    selectVariant() {
      // If we have no variants, return null
      if (this.variants.size === 0) {
        return null;
      }
      
      // If we're in pure exploration phase (not enough data)
      if (this.totalImpressions < this.options.minSampleSize * this.variants.size) {
        // Use uniform random selection during initial exploration
        const variantIds = Array.from(this.variants.keys());
        const randomIndex = Math.floor(Math.random() * variantIds.length);
        return variantIds[randomIndex];
      }
      
      // Otherwise, use a weighted probability selection based on scores
      const totalScore = Array.from(this.variants.values())
        .reduce((sum, variant) => sum + variant.score, 0);
      
      if (totalScore <= 0) {
        // Fallback to random if all scores are zero
        const variantIds = Array.from(this.variants.keys());
        return variantIds[Math.floor(Math.random() * variantIds.length)];
      }
      
      // Weighted random selection
      let random = Math.random() * totalScore;
      for (const variant of this.variants.values()) {
        random -= variant.score;
        if (random <= 0) {
          return variant.id;
        }
      }
      
      // Fallback - return the highest scoring variant
      return this._getHighestScoringVariant().id;
    }
    
    /**
     * Get statistics for all variants
     * @returns {Array} Array of variant statistics
     */
    getStats() {
      return Array.from(this.variants.values()).map(variant => ({
        id: variant.id,
        impressions: variant.impressions,
        conversions: variant.conversions,
        conversionRate: variant.conversionRate,
        score: variant.score,
        relativePerformance: this._calculateRelativePerformance(variant)
      }));
    }
    
    /**
     * Check if the experiment has converged on a winning variant
     * @returns {boolean} True if a winner has been determined
     */
    hasConverged() {
      // Need minimum sample size per variant
      if (this.totalImpressions < this.options.minSampleSize * this.variants.size) {
        return false;
      }
      
      const bestVariant = this._getHighestScoringVariant();
      if (!bestVariant) return false;
      
      // Check if the best variant is significantly better than others
      for (const variant of this.variants.values()) {
        if (variant.id === bestVariant.id) continue;
        
        // If any variant is close to the best, we haven't converged
        if (variant.score > 0 && 
            (bestVariant.score - variant.score) / bestVariant.score < this.options.convergenceThreshold) {
          return false;
        }
      }
      
      return true;
    }
    
    /**
     * Get the current winning variant (if any)
     * @returns {Object|null} The winning variant or null if not determined
     */
    getWinner() {
      if (!this.hasConverged()) {
        return null;
      }
      return this._getHighestScoringVariant();
    }
    
    /**
     * Reset the algorithm with fresh data
     */
    reset() {
      this.variants.clear();
      this.totalImpressions = 0;
      this.totalConversions = 0;
      return this;
    }
    
    // Private methods
    
    /**
     * Update scores for all variants
     * @private
     */
    _updateScores() {
      // Find the best current conversion rate
      let bestRate = 0;
      for (const variant of this.variants.values()) {
        if (variant.impressions >= this.options.minSampleSize && variant.conversionRate > bestRate) {
          bestRate = variant.conversionRate;
        }
      }
      
      // Calculate scores (combining exploitation and exploration)
      for (const variant of this.variants.values()) {
        // Exploitation component: Based on observed conversion rate
        let exploitationScore = variant.conversionRate;
        
        // Exploration component: Encourages trying variants with fewer impressions
        const explorationBonus = this.options.explorationFactor * 
          Math.sqrt(2 * Math.log(this.totalImpressions + 1) / (variant.impressions + 1));
        
        // Calculate confidence interval
        const confidenceInterval = variant.impressions > 0 ? 
          1.96 * Math.sqrt(variant.conversionRate * (1 - variant.conversionRate) / variant.impressions) : 1;
        
        // Combine exploitation and exploration with confidence
        variant.score = exploitationScore + explorationBonus + confidenceInterval;
        
        // Apply weight adjustment
        variant.score *= variant.weight;
      }
    }
    
    /**
     * Get the variant with the highest score
     * @private
     * @returns {Object|null} The best variant or null if none exists
     */
    _getHighestScoringVariant() {
      let bestVariant = null;
      let bestScore = -Infinity;
      
      for (const variant of this.variants.values()) {
        if (variant.impressions >= this.options.minSampleSize && variant.score > bestScore) {
          bestScore = variant.score;
          bestVariant = variant;
        }
      }
      
      return bestVariant;
    }
    
    /**
     * Calculate relative performance compared to the best variant
     * @private
     * @param {Object} variant - The variant to evaluate
     * @returns {number} Relative performance (1.0 means best)
     */
    _calculateRelativePerformance(variant) {
      const bestVariant = this._getHighestScoringVariant();
      if (!bestVariant || bestVariant.conversionRate === 0) {
        return 1.0;
      }
      return variant.conversionRate / bestVariant.conversionRate;
    }
  }
  
  // Usage example
  function demo() {
    // Initialize the selector
    const selector = new GoThriveSelector({
      explorationFactor: 0.15,
      minSampleSize: 20
    });
    
    // Register variants
    selector.registerVariant('control');
    selector.registerVariant('variant-a');
    selector.registerVariant('variant-b');
    
    // Simulate traffic and conversions (in real-world this would happen over time)
    const conversionRates = {
      'control': 0.05,    // 5% conversion
      'variant-a': 0.08,  // 8% conversion
      'variant-b': 0.04   // 4% conversion
    };
    
    // Simulate 1000 visitors
    for (let i = 0; i < 1000; i++) {
      // Select which variant to show
      const selectedVariant = selector.selectVariant();
      
      // Record the impression
      selector.recordImpression(selectedVariant);
      
      // Simulate whether this visitor converts
      if (Math.random() < conversionRates[selectedVariant]) {
        selector.recordConversion(selectedVariant);
      }
      
      // Every 100 impressions, check stats
      if (i % 100 === 0) {
        console.log(`After ${i} impressions:`);
        console.log(selector.getStats());
        
        if (selector.hasConverged()) {
          console.log(`Experiment has converged! Winner: ${selector.getWinner().id}`);
        }
      }
    }
    
    return selector.getStats();
  }

  demo()
  
  // Export the selector for use in other modules
  module.exports = { GoThriveSelector, demo };
