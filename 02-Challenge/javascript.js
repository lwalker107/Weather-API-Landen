document.getElementById('search').addEventListener('click', function() {
    var city = document.getElementById('searchbar').value;
    // Fetches the city data from searchbar
    var url = "https://api.openweathermap.org/data/2.5/forecast?q="+city+"&appid=c9103decf0b6560550c4308a2a7c8387&units=imperial";
    fetch(url)
    .then(function(res){
        return res.json()
    })
    .then(function(data){
        console.log(data)
        var currentDay = data.list[0];
        document.getElementById('temp').innerText = 'temperature: ' + currentDay.main.temp + ' degrees Fahrenheit';
        document.getElementById('wind').innerText = 'wind: ' + currentDay.wind.speed + ' MPH';
        document.getElementById('humidity').innerText = 'humidity: ' + currentDay.main.humidity + '%';

        var j = 0
        for (var i = 7; i < data.list.length; i+=8) {
            var day = data.list[i];
            console.log(day)
            j++;
            document.getElementById('temp' + j).innerText = 'temperature: ' + day.main.temp + ' degrees Fahrenheit';
            document.getElementById('wind' + j).innerText = 'wind: ' + day.wind.speed + ' MPH';
            document.getElementById('humidity' + j).innerText = 'humidity: ' + day.main.humidity + '%';
            

            // document.getElementById('temp2').innerText = 'temperature: ' + day.main.temp + ' degrees Fahrenheit';
            // document.getElementById('wind2').innerText = 'wind: ' + day.wind.speed + ' MPH';
            // document.getElementById('humidity2').innerText = 'humidity: ' + day.main.humidity + '%';
            console.log(day)

            
        }
    })
})




