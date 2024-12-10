
async function search(a) {
  let t = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=572db232959a4520994142045240712&q=${a}&days=3`
  );
  if (t.ok && 400 != t.status) {
    let a = await t.json();
    displayCurrent(a.location, a.current),
      displayAnother(a.forecast.forecastday)
  }
}

document.getElementById("search").addEventListener("keyup", a => {
  search(a.target.value);
});

var days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
function displayCurrent(a, t) {
  if (null != t) {
    var e = new Date(t.last_updated.replace(" ", "T"));
    let n =` <div class="today forecast col-lg-4  bg-black p-2 text-dark bg-opacity-75 rounded-start pb-5" >\n
            <div class="forecast-header d-flex justify-content-between bg-black p-2 text-white bg-opacity-75 "  id="today"> \n
                    <div class="day"> ${days[e.getDay()]} </div>\n
    <div class="data">${e.getDate() + monthNames[e.getMonth()]}</div>   \n
               </div> \x3c!-- .forecast-header --\x3e\n 
          <div class="forecast-content" id="current">\n
                      <div class="location text-secondary fw-bold">${a.name}</div>\n
       <div class="degree">\n
              <div class="num text-white fw-bold fs-1">${t.temp_c}<sup>o</sup>C</div>\n      \n 
            
              <div class="forecast-icon">\n
                  <img src="https:${t.condition.icon}" alt="" width="90">\n
              </div>\t\n	        \n 
               </div>
              <div class="custom text-warning">${t.condition.text}</div>\n
              <span><img src="photo/icon-umberella.png" alt="">20%</span>\n\t\t\t\t\t\t\t\t
              <span><img src="photo/icon-wind.png" alt="">18km/h</span>\n\t\t\t\t\t\t\t\t
              <span><img src="photo/icon-compass.png" alt="">East</span>\n
          
          </div>
          \n
          </div>
    
    `
    
    document.getElementById("forecast").innerHTML = n
  }
}
function displayAnother(a){
    let t="";
    for(let e=1;e<a.length;e++)
    t += `
              \t<div class=" forecast col-lg-4  bg-black p-2 text-dark bg-opacity-75 pb-5 ">\n
            <div class="forecast-header text-center bg-black p-2 text-white bg-opacity-75 "> \n
               <div class="day">
               ${days[new Date(a[e].date.replace(" ", "T")).getDay()]}
            </div>\n
         
          </div>
          </div> \x3c!-- .forecast-header --\x3e\n        <div class="forecast-content">\n 
          <div class="forecast-icon text-center">
            <img src="https:${a[e].day.condition.icon}" alt="" width="90">
        </div>	
          <div class="forecast-content">\n
          
            <div class="degree">
              <div class="num text-white fw-bold fs-1 text-center">${a[e].day.maxtemp_c}<sup>o</sup>C</div>
              <div class="num  text-secondary fw-bold text-center">${a[e].day.mintemp_c}<sup>o</sup>C</div>
            
         
              <div class="custom text-warning text-center">${a[e].day.condition.text}</div>\n
            
          
          </div>\n
          </div>

          
          </div>
        
    `
    document.getElementById("forecast").innerHTML += t

}
search("cairo");