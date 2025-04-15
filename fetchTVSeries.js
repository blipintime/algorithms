function retrieveTVSeries() {

  // https://api.example.com/tvseries
  const url = 'https://jsonmock.hackerrank.com/api/tvseries'; // Replace with your actual API URL

  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('TV Series Data:', data);
      return data;
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });
}

retrieveTVSeries()