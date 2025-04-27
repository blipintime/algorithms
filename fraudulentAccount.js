function activityNotifications(expenditure, d) {
  // Write your code here
  let noticeCount = 0
  for(let i=0; i<expenditure.length; i++) {
    if ( (i+1) > d) {
      // check for fraud
      const median = expenditure.slice(i-d, i).reduce((acc, curr) => acc += curr , 0) / d
      const daysExp = expenditure[i]
      if ( daysExp >= median * 2) {
        noticeCount++
      }
    }
  }
  return noticeCount
}

//console.log(activityNotifications([10, 20, 30, 40, 50], 3))
console.log(activityNotifications([2, 3, 4, 2, 3, 6, 8, 4, 5], 5))