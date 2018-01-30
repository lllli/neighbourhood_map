
	var uoh = {
		info: 'Union Oyster House',
		latitude: 42.361288,
		longitude: -71.056908,
		hours: "11am-9:30pm",
        phone: "617 227 2750",
        website: "unionoysterhouse.com",
        description: "Historic eatery serving chowder & other New England seafood standards since 1826.",
        addr: "41 Union St, Boston, MA 02108"
	};

	var nepo = {
		info: 'Neptune Oyster',
		latitude: 42.363261,
		longitude: -71.0581966,
		hours: "11:30am-9:30pm",
        phone: "617 742 3474",
        website: "neptuneoyster.com",
        description: "Lines form for the raw bar & warm, buttered lobster rolls at this tiny, high-end oyster bar.",
        addr: "63 Salem St 1, Boston, MA 02113"
	};

    var bb = {
		info: 'The Bostonian Boston',
		latitude: 42.361234,
		longitude: -71.056043,
		hours: "24/7",
        phone: "617 523 3600",
        website: "millenniumhotels.com",
        description: "Sophisticated hotel offering a refined restaurant & bar with a terrace, plus free Wi-Fi & a gym.",
        addr: "26 North St, Boston, MA 02109"
	};


	var oph = {
		info: 'Omni Parker House',
		latitude: 42.357841,
		longitude: -71.060162,
		hours: "24/7",
        phone: "617 227 8600",
        website: "omnihotels.com",
        description: "Stately rooms featuring old-world decor in an elegant 1800s hotel with fine dining & a cocktail bar.",
        addr: "60 School St, Boston, MA 02108"
	};


	var cmg = {
		info: 'Chipotle Mexican Grill',
		latitude: 42.351987,
		longitude: -71.066998,
		hours: "10:45am-10:00pm",
        phone: "617 248 3821",
        website: "chipotle.com",
        description: "Fast-food chain offering Mexican fare, including design-your-own burritos, tacos & bowls.",
        addr: "8 Park Plaza 1FL D-7, Boston, MA 02116"
	};

    var rcsh = {
		info: "Ruth's Chris Steak House",
		latitude: 42.358395,
		longitude: -71.059283,
		hours: "11:30am-3:00pm, 5:00pm-10:00pm",
        phone: "617 742 8401",
        website: "uthschris.com",
        description: "Outpost of upmarket steakhouse chain known for sizzling, butter-topped beef in an elegant setting.",
        addr: "45 School St, Boston, MA 02108"
	};

	var ss = {
		info: "Silvertone Bar & Grill",
		latitude: 42.357314,
		longitude: -71.060883,
		hours: "11:00am-2:00am",
        phone: "617 338 7887",
        website: "silvertonedowntown.com",
        description: "Comfort food & specialty cocktails in a cozy subterranean locale with a retro vibe.",
        addr: "69 Bromfield St, Boston, MA 02108"
	};

	var mvc = {
		info: "Marriott Vacation Club Pulse at Custom House, Boston",
		latitude: 42.359209,
		longitude: -71.053479,
		hours: "24/7",
        phone: "617 310 6300",
        website: "marriott.com",
        description: "Sophisticated all-suite lodging with free WiFi, plus an open-air observation deck with city views.",
	    addr: "3 McKinley Square, Boston, MA 02109"
	};

    var ll1 = {
		info: "Luke's Lobster",
		latitude: 42.349182,
		longitude: -71.079417,
		hours: "11:00am-10:00pm",
        phone: "857 350 4262",
        website: "lukeslobster.com",
        description: "Seafood counter serving Maine-style lobster rolls with toasted buns, plus clam chowder & microbrews.",
	    addr: "75 Exeter St, Boston, MA 02116"
	};

	var ll2 = {
		info: "Luke's Lobster",
		latitude: 42.357442,
		longitude: -71.058153,
		hours: "11:00am-9:00pm",
        phone: "857 317 4843",
        website: "lukeslobster.com",
        description: "Seafood counter serving Maine-style lobster rolls with toasted buns, plus clam chowder & microbrews.",
	    addr: "290 Washington St., Boston, MA 02108"
	};


	var locations = [
      [uoh.info, uoh.latitude, uoh.longitude, uoh.description],
      [nepo.info, nepo.latitude, nepo.longitude, nepo.description],
      [bb.info, bb.latitude, bb.longitude, bb.description],
      [oph.info, oph.latitude, oph.longitude, oph.description],
      [cmg.info, cmg.latitude, cmg.longitude, cmg.description],
      [rcsh.info, rcsh.latitude, rcsh.longitude, rcsh.description],
      [ss.info, ss.latitude, ss.longitude, ss.description],
      [mvc.info, mvc.latitude, mvc.longitude, mvc.description],
      [ll1.info, ll1.latitude, ll1.longitude, ll1.description],
      [ll2.info, ll2.latitude, ll2.longitude, ll2.description]
    ];

    var map;
    var result = [];
    var markers = [];
    var og_markers = [];
    var infoWindow;
    var locationSelect;
    var ul;
    var foursquare_client_ID = 'BWZGHSNYJXSPNUKBBOYJAKI2VJ133W1ASCST12NHUGJTVRYB';
    var foursquare_client_secret = '2NWUL5T0KGK1AEXG0PW3OYQKVTTZL0ZBVT0YBKZBEZYHAZON';
    var lobster_list = ko.observableArray([]);
    var user_input = ko.observable("");



// initialize the program by calling ko.applyBindings
function initialize() {
	ko.applyBindings(new VM());
}


//location has the format as [name, latitude, longitude, description]
// this function is used to call foursquare api asynchronously to get location's information.
function use_foursquare_api_to_complete_location_infos(location){
    var result = {name:"",
                  latitude: 0,
                  longitude: 0,
                  description: "",
                  foursquare_result:{website:"",
                              address:"",
                              city:"",
                              state:"",
                              postcode:"",
                              phone:""}};
    var name = ko.observable(location[0]);
    var latitude = ko.observable(location[1]);
    var longitude = ko.observable(location[2]);
    var description = ko.observable(location[3]);
    var foursquare_url = ko.computed(function() {
        return 'https://api.foursquare.com/v2/venues/search?ll='+ latitude() + ',' + longitude() + '&client_id=' + foursquare_client_ID + '&client_secret=' + foursquare_client_secret + '&v=20171201' + '&query=' + name();
    }, this);
    $.getJSON(foursquare_url())
        .done(function(data) {
		var first_result = data.response.venues[0];
		var website = first_result.url;
		if (typeof website === 'undefined'){
			website = "website information is missing";
		}
		result.foursquare_result.website = website;
		var address = first_result.location.address;
		if (typeof address === 'undefined'){
			address = "address information is missing";
		}
		result.foursquare_result.address = address;
     	var city = first_result.location.city;
        if (typeof city === 'undefined'){
			city = "city information is missing";
		}
		result.foursquare_result.city = city;
     	var state = first_result.location.state;
     	if (typeof state === 'undefined'){
			state = "state information is missing";
		}
		result.foursquare_result.state = state;
     	var postcode = first_result.location.postalCode;
     	if (typeof postcode === 'undefined'){
			postcode = "postcode information is missing";
		}
		result.foursquare_result.postcode = postcode;
      	var phone = first_result.contact.formattedPhone;
      	if (typeof phone === 'undefined'){
			phone = "phone number is missing";
		}
		result.foursquare_result.phone = phone;
	    })
	    .fail(function() {
		alert("Foursquare API request failed");
	    });

    result.name = name();
	result.latitude = latitude();
	result.longitude = longitude();
	result.description = description();
	console.log(result);
	return result;

}



// use google map api to create markers and fill-in the infowindow
function use_google_api_to_create_marker(complete_location, info_window){
    var latitude = complete_location.latitude;
    var longitude = complete_location.longitude;
    var result = {
                  marker:new google.maps.Marker({
                            position: new google.maps.LatLng(latitude, longitude),
                            title: complete_location.name,
                            map:map,
                            icon: pinSymbol("#ff6b72"),
                            animation: google.maps.Animation.DROP}),
                  click_animation:function(single_location) {
		                            google.maps.event.trigger(result.marker, 'click');
	                              }
                  };

    result.marker.addListener('click', function(){
        result.marker.setAnimation(google.maps.Animation.DROP);
        if (complete_location.foursquare_result.website.indexOf("is missing") >= 0){
            var info_content = ko.computed(function() {
                return '<div style="margin-left:20px; margin-bottom:20px;"><h2>'+complete_location.name+'</h2><p>'+complete_location.description+'</p>'+'<p><b>Address: </b>'+complete_location.foursquare_result.address+'<br/><b>City: </b>'+complete_location.foursquare_result.city+'<br/><b>State:</b>'+complete_location.foursquare_result.state+'<br/><b>PostCode:</b>'+complete_location.foursquare_result.postcode+'<br/><b>Phone:</b>'+complete_location.foursquare_result.phone+'<br/><b>Website:</b>' + complete_location.foursquare_result.website + "</a></p>"+"</div>";
            }, this);
        }else{
            var info_content = ko.computed(function() {
                return '<div style="margin-left:20px; margin-bottom:20px;"><h2>'+complete_location.name+'</h2><p>'+complete_location.description+'</p>'+'<p><b>Address: </b>'+complete_location.foursquare_result.address+'<br/><b>City: </b>'+complete_location.foursquare_result.city+'<br/><b>State:</b>'+complete_location.foursquare_result.state+'<br/><b>PostCode:</b>'+complete_location.foursquare_result.postcode+'<br/><b>Phone:</b>'+complete_location.foursquare_result.phone+'<br/><b>Website:</b>'+'<a href=' + complete_location.foursquare_result.website +'>' + complete_location.foursquare_result.website + "</a></p>"+"</div>";
            }, this);
        }
        info_window.setContent(info_content());
		info_window.open(map, this);

	});
	return result
}



//ViewModel function which is served to create map, and filter the locations.
function VM(){
    var info_window = new google.maps.InfoWindow();
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: new google.maps.LatLng(42.357577, -71.066675),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });
    for (var i = 0; i<locations.length; i++){
        var complete_location = use_foursquare_api_to_complete_location_infos(locations[i]);
        var google_marker = use_google_api_to_create_marker(complete_location,info_window);
        lobster_list.push(google_marker);
    }
	this.search_res = ko.computed( function() {
		var input_name = slugify(user_input());
		return ko.utils.arrayFilter(lobster_list(), function(single_location) {
		    var slug_name = slugify(single_location.marker.title);
			if (slug_name.indexOf(input_name) >= 0){
				single_location.marker.setVisible(true);
				return 1;
			}else{
				single_location.marker.setVisible(false);
				return 0;
			}

			});
	}, this);
}


// slugify the text. Translate all characters to lower case and get rid of non-letter characters.
// slugify is better to make user input and original data into the same format to compare.
function slugify(text)
{
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}


// handle the google map api error
function error(){
    alert("There is some wrong with Google map or your internet connection");
}


//change the markers' colors
function pinSymbol(color) {
    return {
        path: 'M 0,0 C -2,-20 -10,-22 -10,-30 A 10,10 0 1,1 10,-30 C 10,-22 2,-20 0,0 z M -2,-30 a 2,2 0 1,1 4,0 2,2 0 1,1 -4,0',
        fillColor: color,
        fillOpacity: 1,
        strokeColor: '#ffc414',
        strokeWeight: 2,
        scale: 1,
   };
}

