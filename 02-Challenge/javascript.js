document.addEventListener('DOMContentLoaded', function() {
    function search(preCity) {
        var city = preCity || document.getElementById('searchbar').value;
        // Fetches the city data from searchbar
        var url = "https://api.openweathermap.org/data/2.5/forecast?q="+city+"&appid=c9103decf0b6560550c4308a2a7c8387&units=imperial";
        fetch(url)
        .then(function(res){
            return res.json()
        })
        .then(function(data){
            console.log(data)
            var currentDay = data.list[0];
            document.getElementById('name').innerText = data.city.name;
            document.getElementById('date').innerText = '(' + currentDay.dt_txt.split(' ')[0] + ')';
            document.getElementById('icon').src = 'https://openweathermap.org/img/wn/' + currentDay.weather[0].icon + '.png'
            document.getElementById('temp').innerText = 'Temperature: ' + currentDay.main.temp + ' degrees Fahrenheit';
            document.getElementById('wind').innerText = 'Wind: ' + currentDay.wind.speed + ' MPH';
            document.getElementById('humidity').innerText = 'Humidity: ' + currentDay.main.humidity + '%';
    
            var j = 0
            for (var i = 7; i < data.list.length; i+=8) {
                var day = data.list[i];
                console.log(day)
                j++;
                document.getElementById('date' + j).innerText = '(' + day.dt_txt.split(' ')[0] + ')';
                document.getElementById('icon' + j).src = 'https://openweathermap.org/img/wn/' + day.weather[0].icon + '.png'
                document.getElementById('temp' + j).innerText = 'temperature: ' + day.main.temp + ' degrees Fahrenheit';
                document.getElementById('wind' + j).innerText = 'wind: ' + day.wind.speed + ' MPH';
                document.getElementById('humidity' + j).innerText = 'humidity: ' + day.main.humidity + '%';
                
                console.log(day);
            }

            addToSearchHistory(city); 
        });
    }
    document.getElementById('search').addEventListener('click', function() {
       search();
    });
    
    function addToSearchHistory(city) {
        var recentSearches = getSearchHistory();
        if (recentSearches.includes(city)) {
            return
        }
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
            var button = document.createElement('button');
            button.textContent = city;
            button.addEventListener('click', function(event) {
                search(event.target.innerText);
            })
            historyList.appendChild(button);
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

