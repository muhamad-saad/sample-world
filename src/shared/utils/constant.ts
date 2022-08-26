export const center = { lat: 39.50, lng: -98.35 }

export const UNITED_STATES_BOUNDS = {
    north: 50.38,
    south: 25.84,
    west: 200.67 ,
    east: -50.95,
}

export const polylineOptions = {
    geodesic: true,
    strokeColor: "#1E3888",
    strokeOpacity: 1.0,
    strokeWeight: 4,
}

export const googleMapOptions = {
    restriction: {
        latLngBounds: UNITED_STATES_BOUNDS,
        strictBounds: false,
    },
    minZoom: 1,
    maxZoom: 5,
}

export const getNeuticalMiles = (miles: string) => {
    return  miles && `${parseFloat(miles) * 0.87} neutical mile`
}