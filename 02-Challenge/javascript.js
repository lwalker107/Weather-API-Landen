document.addEventListener('DOMContentLoaded', function() {
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
            document.getElementById('date').innerText = 'Date: ' + currentDay.dt_txt;
            document.getElementById('temp').innerText = 'Temperature: ' + currentDay.main.temp + ' degrees Fahrenheit';
            document.getElementById('wind').innerText = 'Wind: ' + currentDay.wind.speed + ' MPH';
            document.getElementById('humidity').innerText = 'Humidity: ' + currentDay.main.humidity + '%';
    
            var j = 0
            for (var i = 7; i < data.list.length; i+=8) {
                var day = data.list[i];
                console.log(day)
                j++;
                document.getElementById('date' + j).innerText = 'Date: ' + day.dt_txt;
                document.getElementById('temp' + j).innerText = 'temperature: ' + day.main.temp + ' degrees Fahrenheit';
                document.getElementById('wind' + j).innerText = 'wind: ' + day.wind.speed + ' MPH';
                document.getElementById('humidity' + j).innerText = 'humidity: ' + day.main.humidity + '%';
                
                console.log(day);
            }

            addToSearchHistory(city); 
        });
    });
    
    function addToSearchHistory(city) {
        var recentSearches = getSearchHistory();
        recentSearches.push(city);
        localStorage.setItem('recentSearches', JSON.stringify(recentSearches));

        updateSearchHistoryUI();
    
        console.log(recentSearches)
    }
    
    function getSearchHistory() {
        var recentSearches = localStorage.getItem('recentSearches');
        
        return recentSearches ? JSON.parse(recentSearches) : [];
    }
    
    function updateSearchHistoryUI() {
        var historyList = document.getElementById('historyList');
        var recentSearches = getSearchHistory();
    
        historyList.innerHTML = ''
    
        recentSearches.forEach(function(city) {
            var li = document.createElement('li');
            li.textContent = city;
            historyList.appendChild(li);
        });


    }
    
    document.getElementById('clear').addEventListener('click', function() {
        clearSearchHistoryUI();
        });

    function clearSearchHistoryUI() {
        localStorage.removeItem('recentSearches');
        updateSearchHistoryUI();
    }
    
    
    updateSearchHistoryUI();
    

})

