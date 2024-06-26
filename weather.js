var temp = document.getElementById('temp');
var cityName = document.getElementById('city');
var humidity = document.getElementById('humidity');
var windspeed = document.getElementById('windspeed');
var searchinput = document.getElementById('searchinput');
var serchbox = document.getElementById('serchbox');
var body_img = document.getElementById('body_img');
var body_data = document.getElementById('body_data');
var deatil = document.getElementById('deatil');
var error = document.getElementById('error');

document.querySelector('.BgVedio').playbackRate = 1.0;

async function checkWeather(city) {
    let Upi_key = 'f27b269d54e4fa1e72993364a80fa8bd';
    try {
        let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${Upi_key}&units=metric`);
        if (!response.ok) {
            throw new Error('City not found');
        }
        let data = await response.json();

        temp.innerHTML = Math.floor(data.main.temp) + '°C';
        cityName.innerHTML = data.name;
        humidity.innerHTML = data.main.humidity + "%";
        windspeed.innerHTML = data.wind.speed + 'km/h';
        console.log(data);

        switch (data.weather[0].main) {
            case 'Clouds':
                body_img.src = 'cloud.png';
                clearInterval(Gap);
                changeVedio('clouds.mp4'); 
                break;
            case 'Clear':
                body_img.src = 'clear.png';
                clearInterval(Gap);
                changeVedio('Clearsky.mp4');
                break;
            case 'Rain':
                body_img.src = 'rain.png';
                clearInterval(Gap);
                changeVedio('Rain2.mp4');
                break;
            case 'Drizzle':
                body_img.src = 'drizzle.png';
                clearInterval(Gap);
                changeVedio('Dizzle.mp4');
                break;
            case 'Mist':
                body_img.src = 'mist.png';
                clearInterval(Gap);
                changeVedio('Mist.mp4');
                break;
            case 'Haze':
                body_img.src = 'haze.png';
                clearInterval(Gap);
                changeVedio('Haze.mp4');
                break;
            default:
                body_img.src = '404.png';
                clearInterval(Gap);
                changeVedio('Rain3.mp4');
        }

        body_data.style.display = 'flex';
        deatil.style.display = 'flex';
        error.style.display = 'none'; // Hide error message
    } catch (err) {
        startInterval();
        error.innerHTML = err.message;
        error.style.display = 'block'; // Show error message
        body_data.style.display = 'none';
        deatil.style.display = 'none';
        body_img.src = '404.png';
    }
}

serchbox.addEventListener('click', () => {
    let cityIn = searchinput.value;
    checkWeather(cityIn);
});

let count=0;


function changeVedio(clip)
{

    var video = document.querySelector('.BgVedio');
    var source = document.querySelector('.videoSource');
        
    source.src = clip;
    video.load();


}

let Gap;
function startInterval()
{
        clearInterval(Gap);
        Gap = setInterval(() => {

        count=count+1;
        console.log(count);

        if (count%6==1) {
            changeVedio('Rain2.mp4'); 
        }

        else if (count%6==2) {
            changeVedio('Mist.mp4'); 
        }

        else if (count%6==3) {
            changeVedio('Dizzle.mp4'); 
        }
        else if (count%6==4) {
            changeVedio('Clearsky.mp4'); 
        }
        else if (count%6==5) {
            changeVedio('Rain3.mp4'); 
        }
        else if (count%6==0) {
            changeVedio('clouds.mp4');
            count=0; 
        }
    }, 2500);

}

startInterval();
