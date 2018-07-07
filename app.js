/* 
    basic Directions Requests = https://maps.googleapis.com/maps/api/directions/outputFormat?parameters

    where outputFormat may be either of the following values:
        json (recommended) indicates output in JavaScript Object Notation (JSON)
        xml indicates output as XML
    parameters:
        *Required   - Origin (origin=24+Sussex+Drive+Ottawa+ON or origin=41.43206,-81.38992)
                    - Destination 
                    - Key
        Optional    - mode (driving,walking,bicycling,transit)
                    - waypoints
                    - alternatives (true => provide multiple routes)
                    - avoid (tolls,highways, ferries,indoor)
                    - units
                    - region
                    - arrival_time 
                    - departure_time
                    - traffic_model
                    - transit_mode (bus,subway,train,rail, transit_mode=train|tram|subway)

*/


const API_KEY = 'AIzaSyBHxwuIzt3B_3v1WrN4wuhl2QnAnrSc6aE';
//src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBHxwuIzt3B_3v1WrN4wuhl2QnAnrSc6aE&callback=initMap"

// Map 
var map;
function initMap(){
    map = new google.maps.Map(document.getElementById('map'), {
        center:{lat:43.5961307, lng:-79.6388324},
        zoom:8
    });
}
function addMarker(props){
    var marker = new google.maps.Marker({
        position: props.coords,
        map:map,
    });
    if(props.icon){
        marker.setIcon(props.icon);
    }
    if(props.content){
        var infoWindow = new google.maps.InfoWindow({
            content: props.content
        });
        marker.addListener('click', function() {
            infoWindow.open(map,marker)
            });

    }

}



let start = "Square One Mississauga Ontario";
let end = "Sheridan College Mississauga Ontario";
start = start.split(" ").join("+");
end = end.split(" ").join("+");

const form = document.forms[0];
form.addEventListener("submit", function(e) {
    e.preventDefault();
    let start = form.querySelector("#start").value;
    let end = form.querySelector("#end").value;
    start = start.split(" ").join("+");
    end = end.split(" ").join("+");


    let addresses = fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${start}&destination=${end}&key=${API_KEY}`)
    .then(response => response.json())
    .then(data => {
        let obj = data.routes[0].legs[0];
        //console.log(obj);
        let start = obj.start_location;
        let end = obj.end_location;

        addMarker({coords: start, content: "<p>Start</p>"} );
        addMarker({coords: end, content: "<p>End</p>"} );
    })

})




