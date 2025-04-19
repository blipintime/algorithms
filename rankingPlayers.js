// two arrays

function rankPlayers(ranked, player) {
  const results = []
  const rankings = [...ranked]
  function calculateCurrentRanking(score) {
    const rankMap = {}
    let rankCounter = 0
    for(let j=0; j<rankings.length; j++) {
      const currScore = rankings[j]
      if (rankMap[currScore] === undefined) {
        rankCounter++
        rankMap[currScore] = rankCounter
      }
      if (score === currScore) {
        return rankCounter
      }
    }
  }

  let lastInsertedIndex = -1
  player.forEach(game => {

    // remove from array if necessary
    if (lastInsertedIndex !== -1) {
      rankings.splice(lastInsertedIndex, 1)
    }

    lastInsertedIndex = -1

    for (let i = 0; i < rankings.length; i++) {
      if (game >= rankings[i]) {
        // insert here an break
        rankings.splice(i, 0, game)
        lastInsertedIndex = i
        break
      }
    }
    if (lastInsertedIndex === -1) {
      rankings.push(game)
      lastInsertedIndex = rankings.length - 1
    }
    // display rankings
    results.push(calculateCurrentRanking(game))
  })
  return results
}

//rankPlayers([100, 100, 50, 40, 40, 20, 10], [5, 25, 50, 120])
console.log(rankPlayers([100, 90, 90, 80, 75, 60], [50, 65, 77, 90, 102]).join('\n'))
