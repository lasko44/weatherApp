//get lat long from location
window.addEventListener('load', () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');




    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const api = 'https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/de710423bcf43514f9fda8c547ce6130/' + lat + ',' + long;

            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    const { temperature, summary, icon } = data.currently;
                    temperatureDegree.textContent = Math.round(temperature);
                    locationTimezone.textContent = data.timezone;
                    temperatureDescription.textContent = summary;

                    //Set Icon
                    setIcon(icon, document.querySelector('.icon'));


                });

        });
    }

    function setIcon(icon, iconID) {
        const skycons = new Skycons({ color: "white" });
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
});