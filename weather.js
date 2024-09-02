let key = "b190a0605344cc4f3af08d0dd473dd25";

function fetchData(){
    let city = document.getElementById("city-name").value;
    let a = fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${key}`)
    a.then((value) => {
        return value.json();
    }).then((val1) => {
        let a= document.getElementById("weather-type").innerHTML=val1['weather']['0']['main'];
        console.log(typeof a);
        console.log(val1);
        console.log(val1["weather"][0]["main"]);
        // console.log(val1["name"])
        document.getElementById("name").innerHTML=val1['name']
        document.getElementById("country").innerHTML=val1['sys']['country']
        document.getElementById("temp").innerHTML=Math.round(val1['main']['temp'])
        document.getElementById("humid").innerHTML=Math.round(val1['main']['humidity'])
        document.getElementById("feel").innerHTML=Math.round(val1['main']['feels_like'])
        document.getElementById("weather-type").innerHTML=val1['weather']['0']['main'];
        document.getElementById("image").src=`icons/${val1["weather"][0]["main"]}.svg`.toLowerCase();
    })
    
}


function input_focus() {
    document.getElementById('city-name').style.border = '2px solid #B23668';
}

function pop_up() {
    document.getElementById("inner1").style.display = "block";
    document.getElementById("inner").style.display = "none";
    fetchData();

}

function back_down() {
    document.getElementById("inner1").style.display = "none";
    document.getElementById("inner").style.display = "block";
}