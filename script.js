// Google Maps initialization
let map;
let trafficLayer;
let transitLayer;
let constructionLayer;
let directionsService;
let directionsRenderer;
let animationInterval;
let currentStep = 0;
let polylines = [];

// Map styles
const mapStyles = {
    default: [],
    silver: [
        {
            "elementType": "geometry",
            "stylers": [{"color": "#f5f5f5"}]
        },
        {
            "elementType": "labels.icon",
            "stylers": [{"visibility": "off"}]
        },
        {
            "elementType": "labels.text.fill",
            "stylers": [{"color": "#616161"}]
        },
        {
            "elementType": "labels.text.stroke",
            "stylers": [{"color": "#f5f5f5"}]
        },
        {
            "featureType": "administrative.land_parcel",
            "elementType": "labels.text.fill",
            "stylers": [{"color": "#bdbdbd"}]
        },
        {
            "featureType": "poi",
            "elementType": "geometry",
            "stylers": [{"color": "#eeeeee"}]
        },
        {
            "featureType": "poi",
            "elementType": "labels.text.fill",
            "stylers": [{"color": "#757575"}]
        },
        {
            "featureType": "poi.park",
            "elementType": "geometry",
            "stylers": [{"color": "#e5e5e5"}]
        },
        {
            "featureType": "poi.park",
            "elementType": "labels.text.fill",
            "stylers": [{"color": "#9e9e9e"}]
        },
        {
            "featureType": "road",
            "elementType": "geometry",
            "stylers": [{"color": "#ffffff"}]
        },
        {
            "featureType": "road.arterial",
            "elementType": "labels.text.fill",
            "stylers": [{"color": "#757575"}]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry",
            "stylers": [{"color": "#dadada"}]
        },
        {
            "featureType": "road.highway",
            "elementType": "labels.text.fill",
            "stylers": [{"color": "#616161"}]
        },
        {
            "featureType": "road.local",
            "elementType": "labels.text.fill",
            "stylers": [{"color": "#9e9e9e"}]
        },
        {
            "featureType": "transit.line",
            "elementType": "geometry",
            "stylers": [{"color": "#e5e5e5"}]
        },
        {
            "featureType": "transit.station",
            "elementType": "geometry",
            "stylers": [{"color": "#eeeeee"}]
        },
        {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [{"color": "#c9c9c9"}]
        },
        {
            "featureType": "water",
            "elementType": "labels.text.fill",
            "stylers": [{"color": "#9e9e9e"}]
        }
    ],
    night: [
        {
            "elementType": "geometry",
            "stylers": [{"color": "#242f3e"}]
        },
        {
            "elementType": "labels.text.fill",
            "stylers": [{"color": "#746855"}]
        },
        {
            "elementType": "labels.text.stroke",
            "stylers": [{"color": "#242f3e"}]
        },
        {
            "featureType": "administrative.locality",
            "elementType": "labels.text.fill",
            "stylers": [{"color": "#d59563"}]
        },
        {
            "featureType": "poi",
            "elementType": "labels.text.fill",
            "stylers": [{"color": "#d59563"}]
        },
        {
            "featureType": "poi.park",
            "elementType": "geometry",
            "stylers": [{"color": "#263c3f"}]
        },
        {
            "featureType": "poi.park",
            "elementType": "labels.text.fill",
            "stylers": [{"color": "#6b9a76"}]
        },
        {
            "featureType": "road",
            "elementType": "geometry",
            "stylers": [{"color": "#38414e"}]
        },
        {
            "featureType": "road",
            "elementType": "geometry.stroke",
            "stylers": [{"color": "#212a37"}]
        },
        {
            "featureType": "road",
            "elementType": "labels.text.fill",
            "stylers": [{"color": "#9ca5b3"}]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry",
            "stylers": [{"color": "#746855"}]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry.stroke",
            "stylers": [{"color": "#1f2835"}]
        },
        {
            "featureType": "road.highway",
            "elementType": "labels.text.fill",
            "stylers": [{"color": "#f3d19c"}]
        },
        {
            "featureType": "transit",
            "elementType": "geometry",
            "stylers": [{"color": "#2f3948"}]
        },
        {
            "featureType": "transit.station",
            "elementType": "labels.text.fill",
            "stylers": [{"color": "#d59563"}]
        },
        {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [{"color": "#17263c"}]
        },
        {
            "featureType": "water",
            "elementType": "labels.text.fill",
            "stylers": [{"color": "#515c6d"}]
        },
        {
            "featureType": "water",
            "elementType": "labels.text.stroke",
            "stylers": [{"color": "#17263c"}]
        }
    ],
    retro: [
        {
            "elementType": "geometry",
            "stylers": [{"color": "#ebe3cd"}]
        },
        {
            "elementType": "labels.text.fill",
            "stylers": [{"color": "#523735"}]
        },
        {
            "elementType": "labels.text.stroke",
            "stylers": [{"color": "#f5f1e6"}]
        },
        {
            "featureType": "administrative",
            "elementType": "geometry.stroke",
            "stylers": [{"color": "#c9b2a6"}]
        },
        {
            "featureType": "administrative.land_parcel",
            "elementType": "geometry.stroke",
            "stylers": [{"color": "#dcd2be"}]
        },
        {
            "featureType": "administrative.land_parcel",
            "elementType": "labels.text.fill",
            "stylers": [{"color": "#ae9e90"}]
        },
        {
            "featureType": "landscape.natural",
            "elementType": "geometry",
            "stylers": [{"color": "#dfd2ae"}]
        },
        {
            "featureType": "poi",
            "elementType": "geometry",
            "stylers": [{"color": "#dfd2ae"}]
        },
        {
            "featureType": "poi",
            "elementType": "labels.text.fill",
            "stylers": [{"color": "#93817c"}]
        },
        {
            "featureType": "poi.park",
            "elementType": "geometry.fill",
            "stylers": [{"color": "#a5b076"}]
        },
        {
            "featureType": "poi.park",
            "elementType": "labels.text.fill",
            "stylers": [{"color": "#447530"}]
        },
        {
            "featureType": "road",
            "elementType": "geometry",
            "stylers": [{"color": "#f5f1e6"}]
        },
        {
            "featureType": "road.arterial",
            "elementType": "geometry",
            "stylers": [{"color": "#fdfcf8"}]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry",
            "stylers": [{"color": "#f8c967"}]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry.stroke",
            "stylers": [{"color": "#e9bc62"}]
        },
        {
            "featureType": "road.highway.controlled_access",
            "elementType": "geometry",
            "stylers": [{"color": "#e98d58"}]
        },
        {
            "featureType": "road.highway.controlled_access",
            "elementType": "geometry.stroke",
            "stylers": [{"color": "#db8555"}]
        },
        {
            "featureType": "road.local",
            "elementType": "labels.text.fill",
            "stylers": [{"color": "#806b63"}]
        },
        {
            "featureType": "transit.line",
            "elementType": "geometry",
            "stylers": [{"color": "#dfd2ae"}]
        },
        {
            "featureType": "transit.line",
            "elementType": "labels.text.fill",
            "stylers": [{"color": "#8f7d77"}]
        },
        {
            "featureType": "transit.line",
            "elementType": "labels.text.stroke",
            "stylers": [{"color": "#ebe3cd"}]
        },
        {
            "featureType": "transit.station",
            "elementType": "geometry",
            "stylers": [{"color": "#dfd2ae"}]
        },
        {
            "featureType": "water",
            "elementType": "geometry.fill",
            "stylers": [{"color": "#b9d3c2"}]
        },
        {
            "featureType": "water",
            "elementType": "labels.text.fill",
            "stylers": [{"color": "#92998d"}]
        }
    ],
    monochrome: [
        {
            "featureType": "all",
            "elementType": "labels.text.fill",
            "stylers": [
                { "saturation": 36 },
                { "color": "#333333" },
                { "lightness": 40 }
            ]
        },
        {
            "featureType": "all",
            "elementType": "labels.text.stroke",
            "stylers": [
                { "visibility": "on" },
                { "color": "#ffffff" },
                { "lightness": 16 }
            ]
        },
        {
            "featureType": "all",
            "elementType": "labels.icon",
            "stylers": [
                { "visibility": "off" }
            ]
        },
        {
            "featureType": "administrative",
            "elementType": "geometry.fill",
            "stylers": [
                { "color": "#fefefe" },
                { "lightness": 20 }
            ]
        },
        {
            "featureType": "administrative",
            "elementType": "geometry.stroke",
            "stylers": [
                { "color": "#fefefe" },
                { "lightness": 17 },
                { "weight": 1.2 }
            ]
        },
        {
            "featureType": "landscape",
            "elementType": "geometry",
            "stylers": [
                { "color": "#f5f5f5" },
                { "lightness": 20 }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "geometry",
            "stylers": [
                { "color": "#f5f5f5" },
                { "lightness": 21 }
            ]
        },
        {
            "featureType": "poi.park",
            "elementType": "geometry",
            "stylers": [
                { "color": "#dedede" },
                { "lightness": 21 }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry.fill",
            "stylers": [
                { "color": "#ffffff" },
                { "lightness": 17 }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry.stroke",
            "stylers": [
                { "color": "#ffffff" },
                { "lightness": 29 },
                { "weight": 0.2 }
            ]
        },
        {
            "featureType": "road.arterial",
            "elementType": "geometry",
            "stylers": [
                { "color": "#ffffff" },
                { "lightness": 18 }
            ]
        },
        {
            "featureType": "road.local",
            "elementType": "geometry",
            "stylers": [
                { "color": "#ffffff" },
                { "lightness": 16 }
            ]
        },
        {
            "featureType": "transit",
            "elementType": "geometry",
            "stylers": [
                { "color": "#f2f2f2" },
                { "lightness": 19 }
            ]
        },
        {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [
                { "color": "#e9e9e9" },
                { "lightness": 17 }
            ]
        }
    ],
    dark: [
        { "elementType": "geometry", "stylers": [ { "color": "#212121" } ] },
        { "elementType": "labels.icon", "stylers": [ { "visibility": "off" } ] },
        { "elementType": "labels.text.fill", "stylers": [ { "color": "#757575" } ] },
        { "elementType": "labels.text.stroke", "stylers": [ { "color": "#212121" } ] },
        { "featureType": "administrative", "elementType": "geometry", "stylers": [ { "color": "#757575" } ] },
        { "featureType": "administrative.country", "elementType": "labels.text.fill", "stylers": [ { "color": "#9e9e9e" } ] },
        { "featureType": "administrative.land_parcel", "stylers": [ { "visibility": "off" } ] },
        { "featureType": "administrative.locality", "elementType": "labels.text.fill", "stylers": [ { "color": "#bdbdbd" } ] },
        { "featureType": "poi", "elementType": "labels.text.fill", "stylers": [ { "color": "#757575" } ] },
        { "featureType": "poi.park", "elementType": "geometry", "stylers": [ { "color": "#181818" } ] },
        { "featureType": "poi.park", "elementType": "labels.text.fill", "stylers": [ { "color": "#616161" } ] },
        { "featureType": "poi.park", "elementType": "labels.text.stroke", "stylers": [ { "color": "#1b1b1b" } ] },
        { "featureType": "road", "elementType": "geometry.fill", "stylers": [ { "color": "#2c2c2c" } ] },
        { "featureType": "road", "elementType": "labels.text.fill", "stylers": [ { "color": "#8a8a8a" } ] },
        { "featureType": "road.arterial", "elementType": "geometry", "stylers": [ { "color": "#373737" } ] },
        { "featureType": "road.highway", "elementType": "geometry", "stylers": [ { "color": "#3c3c3c" } ] },
        { "featureType": "road.highway.controlled_access", "elementType": "geometry", "stylers": [ { "color": "#4e4e4e" } ] },
        { "featureType": "road.local", "elementType": "labels.text.fill", "stylers": [ { "color": "#616161" } ] },
        { "featureType": "transit", "elementType": "labels.text.fill", "stylers": [ { "color": "#757575" } ] },
        { "featureType": "water", "elementType": "geometry", "stylers": [ { "color": "#000000" } ] },
        { "featureType": "water", "elementType": "labels.text.fill", "stylers": [ { "color": "#3d3d3d" } ] }
    ]
};

// Initialize the map
function initMap() {
    // Default location (New York City)
    const defaultLocation = { lat: 40.7128, lng: -74.0060 };
    
    // Create the map
    map = new google.maps.Map(document.getElementById("map"), {
        center: defaultLocation,
        zoom: 13,
        mapTypeControl: false,
        fullscreenControl: false,
        streetViewControl: false
    });

    // Initialize traffic layer
    trafficLayer = new google.maps.TrafficLayer();
    
    // Initialize transit layer
    transitLayer = new google.maps.TransitLayer();
    
    // Initialize construction layer (a custom layer for construction areas)
    constructionLayer = new google.maps.Data();
    fetchConstructionData();
    
    // Initialize directions service and renderer
    directionsService = new google.maps.DirectionsService();
    directionsRenderer = new google.maps.DirectionsRenderer({
        map: map,
        suppressMarkers: false,
        polylineOptions: {
            strokeColor: '#3498db',
            strokeWeight: 6,
            strokeOpacity: 0.7
        }
    });

    // Check if traffic layer checkbox is checked
    if (document.getElementById("traffic-layer").checked) {
        trafficLayer.setMap(map);
    }

    // Set up event listeners
    setupEventListeners();
}

// Fetch construction data and add it to the map
function fetchConstructionData() {
    // In a real application, you would fetch construction data from an API
    // For this example, we'll create some sample construction zones
    const constructionZones = [
        { lat: 40.7128, lng: -74.0060, radius: 500, title: 'Downtown Construction' },
        { lat: 40.7328, lng: -73.9860, radius: 300, title: 'Midtown Road Work' },
        { lat: 40.7028, lng: -74.0160, radius: 400, title: 'Bridge Maintenance' }
    ];

    // Add construction zones to the layer
    constructionZones.forEach((zone, i) => {
        const constructionCircle = new google.maps.Circle({
            strokeColor: '#FF4500',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#FF4500',
            fillOpacity: 0.35,
            center: { lat: zone.lat, lng: zone.lng },
            radius: zone.radius,
            map: null,
            id: `construction-${i}`
        });
        
        // Store circle in the polylines array for later access
        polylines.push(constructionCircle);
        
        // Add click event to show info about the construction zone
        constructionCircle.addListener('click', () => {
            document.getElementById("traffic-info").innerHTML = `
                <p><strong>${zone.title}</strong></p>
                <p>Construction area affecting traffic.</p>
                <p>Expected completion: ${getRandomFutureDate()}</p>
            `;
        });
    });
}

// Helper function to generate a random future date for construction completion
function getRandomFutureDate() {
    const currentDate = new Date();
    const randomDays = Math.floor(Math.random() * 90) + 30; // 30-120 days from now
    currentDate.setDate(currentDate.getDate() + randomDays);
    return currentDate.toLocaleDateString();
}

// Calculate and display route between two locations
function calculateAndDisplayRoute() {
    const startLocation = document.getElementById('start-location').value;
    const endLocation = document.getElementById('end-location').value;
    
    if (!startLocation || !endLocation) {
        document.getElementById('route-info').innerHTML = '<p>Please enter both start and end locations.</p>';
        return;
    }
    
    // Clear any existing animation
    clearAnimation();
    
    const request = {
        origin: startLocation,
        destination: endLocation,
        travelMode: 'DRIVING',
        provideRouteAlternatives: false
    };
    
    directionsService.route(request, (response, status) => {
        if (status === 'OK') {
            directionsRenderer.setDirections(response);
            
            // Display route information with animation
            const route = response.routes[0];
            const leg = route.legs[0];
            
            let routeInfoHTML = `
                <div class="route-detail"><i class="fas fa-route"></i> <strong>Distance:</strong> ${leg.distance.text}</div>
                <div class="route-detail"><i class="fas fa-clock"></i> <strong>Duration:</strong> ${leg.duration.text}</div>
                <div class="route-detail"><i class="fas fa-map-marker-alt"></i> <strong>From:</strong> ${leg.start_address}</div>
                <div class="route-detail"><i class="fas fa-flag-checkered"></i> <strong>To:</strong> ${leg.end_address}</div>
                <h4 style="margin-top: 15px; margin-bottom: 10px;">Turn-by-turn directions:</h4>
                <div id="steps-container"></div>
            `;
            
            document.getElementById('route-info').innerHTML = routeInfoHTML;
            
            // Animate steps one by one with a slight delay for visual effect
            setTimeout(() => {
                animateRouteSteps(leg.steps);
            }, 300);
        } else {
            document.getElementById('route-info').innerHTML = `<p>Directions request failed due to ${status}</p>`;
        }
    });
}

// Animate the display of route steps
function animateRouteSteps(steps) {
    const stepsContainer = document.getElementById('steps-container');
    currentStep = 0;
    
    // Clear any existing animation
    clearTimeout(animationInterval);
    stepsContainer.innerHTML = '';
    
    // Display steps one by one with animation
    function showNextStep() {
        if (currentStep < steps.length) {
            const step = steps[currentStep];
            const stepElement = document.createElement('div');
            stepElement.className = 'route-step';
            stepElement.innerHTML = `<p>${currentStep + 1}. ${step.instructions}</p>`;
            stepsContainer.appendChild(stepElement);
            
            currentStep++;
            animationInterval = setTimeout(showNextStep, 300); // Show next step after 300ms
        }
    }
    
    showNextStep();
}

// Clear any ongoing animation
function clearAnimation() {
    clearTimeout(animationInterval);
    currentStep = 0;
}

// Set up event listeners for UI controls
function setupEventListeners() {
    // Traffic layer toggle
    document.getElementById("traffic-layer").addEventListener("change", function() {
        if (this.checked) {
            trafficLayer.setMap(map);
        } else {
            trafficLayer.setMap(null);
        }
    });
    
    // Construction layer toggle
    document.getElementById("construction-layer").addEventListener("change", function() {
        if (this.checked) {
            polylines.forEach(circle => {
                if (circle.id && circle.id.startsWith('construction')) {
                    circle.setMap(map);
                }
            });
        } else {
            polylines.forEach(circle => {
                if (circle.id && circle.id.startsWith('construction')) {
                    circle.setMap(null);
                }
            });
        }
    });

    // Transit layer toggle
    document.getElementById("transit-layer").addEventListener("change", function() {
        if (this.checked) {
            transitLayer.setMap(map);
        } else {
            transitLayer.setMap(null);
        }
    });

    // Map style selector
    document.getElementById("map-style").addEventListener("change", function() {
        const style = this.value;
        map.setOptions({
            styles: mapStyles[style]
        });
    });
    
    // Get directions button event listener
    document.getElementById("get-directions").addEventListener("click", function() {
        calculateAndDisplayRoute();
    });
    
    // Add keypress event listeners to the input fields
    document.getElementById("start-location").addEventListener("keypress", function(e) {
        if (e.key === "Enter") {
            document.getElementById("end-location").focus();
        }
    });
    
    document.getElementById("end-location").addEventListener("keypress", function(e) {
        if (e.key === "Enter") {
            calculateAndDisplayRoute();
        }
    });

    // Current location button - use for directions start point
    document.getElementById("my-location").addEventListener("click", function() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const userLocation = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };
                    map.setCenter(userLocation);
                    map.setZoom(15);
                    
                    // Add a marker for the user's location
                    new google.maps.Marker({
                        position: userLocation,
                        map: map,
                        title: "Your Location",
                        animation: google.maps.Animation.DROP
                    });

                    // Reverse geocode the coordinates to get an address
                    const geocoder = new google.maps.Geocoder();
                    geocoder.geocode({ location: userLocation }, (results, status) => {
                        if (status === "OK" && results[0]) {
                            // Set the start location input to the current location address
                            document.getElementById("start-location").value = results[0].formatted_address;
                            
                            // Focus on the end location input
                            document.getElementById("end-location").focus();
                            
                            // Update traffic info
                            document.getElementById("traffic-info").innerHTML = 
                                `<p>Set start location to your current location.</p>
                                <p>${results[0].formatted_address}</p>`;
                        } else {
                            // If geocoding fails, use coordinates
                            const coordStr = `${position.coords.latitude.toFixed(6)}, ${position.coords.longitude.toFixed(6)}`;
                            document.getElementById("start-location").value = coordStr;
                            document.getElementById("end-location").focus();
                        }
                    });
                },
                () => {
                    document.getElementById("traffic-info").innerHTML = 
                        `<p>Unable to access your location. Please enable location services.</p>`;
                }
            );
        } else {
            document.getElementById("traffic-info").innerHTML = 
                `<p>Your browser doesn't support geolocation.</p>`;
        }
    });
}


