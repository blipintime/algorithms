/**
 * You are planning out a trek across a snowy mountain. On the mountain it snows in the morning, the snow melts with the sun in the afternoon, and in the evening you can attempt a crossing.

* Snow piles up at each location, making that location higher.
* If it has not snowed at a particular location for 2 days, the snow there starts melting on the afternoon of the second day, at a rate of one unit per day.
* You can climb up and down one level while moving to the next position.
* The player needs to cross the mountain with the least amount of climbing possible.
* The crossing attempts are limited to the days in the forecast because the weather is unpredictable later.

Write a function that, given the base altitude of locations on the mountain and a list of snow forecasts for each day, calculates and returns the best day to perform the crossing as well as the number of climbs needed on that day.

For example, given the initial altitudes: [0,1,2,1]

           3                    
  altitude 2     -
           1   -   -      Side view of the mountain
           0 -        
             0 1 2 3
             position

And the snow forecast for each morning:

 [[1,0,1,0],   # On day zero, one unit of snow will fall on positions 0 and 2.

  [0,0,0,0],   # On day one, it will not snow.
  
  [1,1,0,2]]   # On day two, two units of snow will fall on position 3, and one unit on positions 0 and 1.

This is the resulting mountain profile each evening, the player is represented by the letter P:

            Day 0            Day 1            Day 2    
                                                 
                                           starts melting            
                                                 ↓         
          3     *                          3 P     *    
altitude  2 P   -          no new snow     2 * * - *
          1 * -   -                        1 * -   -   
          0 -              no melting      0 -   
            0 1 2 3                          0 1 2 3
    
            position                        position  


In the example above:
At the end of day 0, the mountain cannot be crossed. The steps are too high to climb.
At the end of day 1, there are no changes, still no crossing.
At the end of day 2, the mountain can be crossed by climbing once. Notice that in position 2, one unit of snow melted. 

In case it's not possible to cross on any of the days, the function should return Null or [-1,-1].

Expected results:

best_day_to_cross(altitudes_1, snow_1) -> [2, 1] at the end of day two, only one climb is required
best_day_to_cross(altitudes_2, snow_2) -> [0, 0] day zero is the best day to cross
best_day_to_cross(altitudes_3, snow_3) -> [2, 0] zero climbs are required at the end of day two
best_day_to_cross(altitudes_4, snow_4) -> [-1,-1] no viable days, the steps are always too high
best_day_to_cross(altitudes_5, snow_5) -> [5, 1] melting can continue over a few days
best_day_to_cross(altitudes_6, snow_6) -> [0, 4] it requires 4 climbs

Complexity variables: 

A - number of altitude positions
D - number of days in the forecast

 * 
 * 
 */


  //          3                    
  // altitude 2     -
  //          1   /   \      Side view of the mountain
  //          0 /        
  //            0 1 2 3
  //            position

// end of day 1
  //          3 *   *                
  // altitude 2     -
  //          1   /   \      Side view of the mountain
  //          0 /        
  //            0 1 2 3
  //            position
  //best_day_to_cross(altitudes_1, snow_1) -> [2, 1] at the end of day two, only one climb is required
  const altitudes_1 = [0, 1, 2, 1];
  const snow_1 = [
      [1, 0, 1, 0], // day 0
      [0, 0, 0, 0], // day 1
      [1, 1, 0, 2] // day 2
  ];
  
  function addWeather(snowAddition, stateByElevation, altitude, yesterdayWeather) {
    // put snow on top of the altitude, unless there is snow already
    // then go higher
    const temp = stateByElevation.slice(Math.min(altitude + 1, 3))
    if (showAddition) {
      let newSnowIdx = stateByElevation.slice(Math.min(altitude + 1, 3)).find(state => state !== '*') + altitude + 1
      
      let snowRemain = snowAddition

      while (snowRemain > 0) {
        stateByElevation[newSnowIdx] = '*'
        snowRemain--
        newSnowIdx++
      }
    } else if (yesterdayWeather === 0) {
      // process snow melting
      for(let elev=3; elev>0; elev--) {
        if (stateByElevation[elev] === '*') {
          stateByElevation[elev] === ''
        }
      }
    }
  
    console.log('--->', newSnowIdx)
  }
  
  // [ which day to cross, number of climbs to cross ]
  // climber starts at position 0
  // return [2, 1]
  function best_day_to_cross(altitudes, days) {

    // shows whether there is snow and how much snow (position, elevation)
    const currentWeatherState = [[0,0,0,0], [0,0,0,0], [0,0,0,0], [0,0,0,0]] 
    for(let i=0 ; i<days.length; i++) {
      const weatherForDay = days[i]
      const yesterdayWeather = i > 0 ? days[i - 1] : []
      // superimpose the state on the currentWeatherState
      for(let pos=0; pos < 4; pos++) {
        addWeather(weatherForDay[pos], currentWeatherState[pos], altitudes[pos], yesterdayWeather[pos])
    }
      // put snow starting on the highest elevations
      // mark if position is 0 and check in next iteration
      // if snow was 0 in previous iteration,
      // update stateAfterTheWeather by reducing snow by 1
    }
    
    // I have the currentWeatherState
    let currPos = 0
    for(let day=0; day<3; day++) {
      // find the place to climb to in altitudes_1
      currPos++
      const placeToClimbto = altitudes_1[currPos]
      if (currentWeatherState[1,1] === 0) {
        // can climb to [1,1]
      } else {
        break
      }
    }
    //
  }

  best_day_to_cross(altitudes_1, snow_1) // -> [2, 1] at the end of day two, only one climb is required
  
//   const altitudes_2 = [0, 0, 0, 0];
//   const snow_2 = [
//       [2, 2, 2, 2],
//       [1, 0, 0, 0],
//       [1, 0, 0, 0]
//   ];
  
//   best_day_to_cross(altitudes_2, snow_2)
  
//   const altitudes_3 = [0, 0, 0, 1];
//   const snow_3 = [
//       [0, 0, 2, 0],
//       [1, 1, 0, 0],
//       [0, 0, 0, 0],
//       [1, 1, 1, 0]
//   ];
  
//   best_day_to_cross(altitudes_3, snow_3)
  
//   const altitudes_4 = [0, 1, 2, 0];
//   const snow_4 = [
//       [1, 0, 0, 0],
//       [0, 1, 0, 0]
//   ];
  
//   best_day_to_cross(altitudes_4, snow_4)
  
//   const altitudes_5 = [0, 0, 0];
//   const snow_5 = [
//       [5, 5, 0],
//       [0, 0, 0],
//       [0, 0, 0],
//       [0, 0, 0],
//       [0, 0, 0],
//       [0, 0, 0]
//   ];
  
//   best_day_to_cross(altitudes_5, snow_5)
  
  