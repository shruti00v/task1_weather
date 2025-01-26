

document.addEventListener("DOMContentLoaded", () => {
    const cityName = document.getElementById("cityName");
    const form = document.querySelector("form");

    const weatherof = (city) => {

        // const weatherImage = document.getElementById('weather_image');
        //     imgElement.innerHTML = '';

        cityName.innerHTML = city
        const url = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=2d0d70525615e1d37a41d517d37e44ff'
        const url_forecast = 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&appid=2d0d70525615e1d37a41d517d37e44ff'
        const option = {
            method: 'GET'
        };

        const response = fetch(url, option)
            .then(response => response.json())
            .then((response) => {
                feels_like_f = Math.round((response.main.feels_like) - 273)
                feels_like.innerHTML = feels_like_f + "°C"

                humidity.innerHTML = response.main.humidity + "%"
                temp_current.innerHTML = Math.round((response.main.temp)-273)+"°C"
                speed.innerHTML = Math.round(response.wind.speed*3.6) + " km/h"
                hehe.innerHTML = response.weather[0].main
            }
            )

        const response_forecast = fetch(url_forecast, option)
            .then(response_forecast => response_forecast.json())
            .then((response_forecast) =>
            {   
                Date.prototype.today = function () {
                    return this.getFullYear() + "-" + (((this.getMonth() + 1) < 10) ? "0" : "") + (this.getMonth() + 1) + "-" + ((this.getDate() + 1 < 10) ? "0" : "") + (this.getDate() + 1); 
                }

                const d = new Date();
                const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
                const week = ["SUN","MON","TUE","WED","THU","FRI","SAT"];

                const month_name = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                month_n = month_name[d.getMonth()];
               
                day_n= weekday[d.getDay()];
                const dateStr= day_n+", "+d.getDate()+" "+month_n
                const day_name1=week[d.getDay()+1];
               const day_name2=week[d.getDay()+2];
                const day_name3=week[d.getDay()+3];
                const day_name4=week[d.getDay()+4];
                const dayElement1 = document.getElementById("dayname1");
                dayElement1.innerHTML = day_name1;
                const dayElement2  = document.getElementById("dayname2");
                dayElement2.innerHTML = day_name2;
                const dayElement3  = document.getElementById("dayname3");
                dayElement3.innerHTML = day_name3;
                const dayElement4  = document.getElementById("dayname4");
                dayElement4.innerHTML = day_name4;

                const dateElement = document.getElementById("date_us");
                dateElement.innerHTML = dateStr;
                var datetime = new Date().today()+" "+"00:00:00";          
                const list = response_forecast.list;
                const index = list.findIndex(item => item.dt_txt === datetime);
                // console.log(index)

                temp_min_1 = Math.round((list[index].main.temp_min) - 273) + "°C"
                temp_min_2 = Math.round((list[index+8].main.temp_min) - 273) + "°C"
                temp_min_3 = Math.round((list[index+16].main.temp_min) - 273) + "°C"
                temp_min_4 = Math.round((list[index+24].main.temp_min) - 273) + "°C"
                const weather_1=(list[index+4].weather[0].main)         
                const weather_2=(list[index+12].weather[0].main)
                const weather_3=(list[index+20].weather[0].main)
                const weather_4=(list[index+28].weather[0].main)

                const icons_source_weather={}
                icons_source_weather["Thunderstorm"]=["bi bi-cloud-lightning-rain"]
                icons_source_weather["Drizzle"]=["bi bi-cloud-drizzle"]
                icons_source_weather["Rain"]=["bi bi-cloud-rain-heavy"]
                icons_source_weather["Snow"]=["bi bi-cloud-snow"]
                icons_source_weather["Atmosphere"]=["bi bi-cloud-haze"]
                icons_source_weather["Clear"]=["bi bi-brightness-high"]
                icons_source_weather["Clouds"]=["bi bi-clouds"]

                const weather1=icons_source_weather[weather_1];
                const weather2=icons_source_weather[weather_2];
                const weather3=icons_source_weather[weather_3];
                const weather4=icons_source_weather[weather_4];

                document.querySelector('#day1-icon').className = weather1;
                document.querySelector('#day2-icon').className = weather2;
                document.querySelector('#day3-icon').className = weather3;
                document.querySelector('#day4-icon').className = weather4;
                
                const weather_image={}
                const time_hr=d.getHours();
                if(time_hr>=6 && time_hr <=18){
                    weather_image["Thunderstorm"]=["./images/thunderstorm.png"]
                    weather_image["Drizzle"]=["./images/Drizzle-day.png"]
                    weather_image["Rain"]=["./images/Rain-day.png"]
                    weather_image["Snow"]=["./images/Snow.png"]
                    weather_image["Atmosphere"]=["./images/all.png"]
                    weather_image["Clear"]=["./images/Clear-day.png"]
                    weather_image["Clouds"]=["./images/Clouds-day.png"]


                }else{
                  
                
                    weather_image["Thunderstorm"]=["./images/thunderstorm.png"]
                    weather_image["Drizzle"]=["./images/Drizzle-night.png"]
                    weather_image["Rain"]=["./images/Rain-night.png"]
                    weather_image["Snow"]=["./images/Snow.png"]
                    weather_image["Atmosphere"]=["./images/all.png"]
                    weather_image["Clear"]=["./images/Clear-night.png"]
                    weather_image["Clouds"]=["./images/Clouds-night.png"]
                }
                const curr_weather=(list[0].weather[0].main)
                const element = document.querySelector('img');
                if (element) {
                    element.remove();
                }
                const imgElement = document.createElement("img");
                imgElement.src = weather_image[curr_weather];
                imgElement.style.width = "200px";
                imgElement.style.position = "relative";
                imgElement.style.right = "-250px";
                imgElement.style.top = "-200px";

                const container = document.querySelector("#weather-container"); 
                if (container) {
                    container.appendChild(imgElement);
                }
                temp_max_1 = Math.round((list[index+3].main.temp_max) - 273) + "°C"
                temp_max_2 = Math.round((list[index+11].main.temp_max) - 273) + "°C"
                temp_max_3 = Math.round((list[index+19].main.temp_max) - 273) + "°C"
                temp_max_4 = Math.round((list[index+27].main.temp_max) - 273) + "°C"


                day1.innerHTML = temp_min_1 + "/" + temp_max_1
                day2.innerHTML= temp_min_2+"/"+temp_max_2
                day3.innerHTML= temp_min_3+"/"+temp_max_3
                day4.innerHTML= temp_min_4+"/"+temp_max_4
            }
            )
            .catch(err => console.error(err))
    }
    weatherof("Delhi")
    sub.addEventListener("click", (e) => {
        e.preventDefault();
        weatherof(city.value);

    })

})





