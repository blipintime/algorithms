function droppedRequests(requestTime) {
    // Write your code here
   let droppedCount = 0
   const timeLog = {}
   
   function countRequestsInInterval(start, finish)  {
     const keys = Object.keys(timeLog)
     const sortedSeconds = keys.sort((a, b) => a - b)
     console.log(sortedSeconds)
     let totalRequests = 0
     for(let k=0; k<sortedSeconds.length; k++) {
        const second = sortedSeconds[k]
        if (second>=start && second<=finish) {
            totalRequests += timeLog[second]
        }
     }
     return totalRequests
   }
   
   for(let j=0; j<requestTime.length; j++) {
        const second = requestTime[j]
        if (!(second in timeLog)) {
            timeLog[second] = 1
        } else {
            timeLog[second]++
        }
        const requestsInOneSecond = countRequestsInInterval(second-1, second)
        const requestsIn10Seconds = countRequestsInInterval(second - 10, second)
        const requestsInOneMinute = countRequestsInInterval(second - 60, second)
        if (requestsInOneSecond>3) {
            droppedCount++
        } else if (requestsIn10Seconds > 20) {
            droppedCount++
        } else if (requestsInOneMinute > 60) {
            droppedCount++
        }
   }
   return droppedCount
}

droppedRequests([1, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 6, 7, 7, 7, 7, 7, 11, 11, 11, 11, 11])

