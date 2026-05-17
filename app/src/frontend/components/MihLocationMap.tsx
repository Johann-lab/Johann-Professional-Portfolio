"use client";

import { useState } from "react";
import Map, { Layer, Marker, NavigationControl, Source } from "react-map-gl/maplibre";

const mapStyle = "https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json";
const latitude = 16.025327;
const longitude = 120.4286234;
const locationName = "Makerspace InnovHub OPC";
const destination = {
  latitude,
  longitude,
};

const routeLineStyle = {
  id: "mih-route-line",
  type: "line" as const,
  paint: {
    "line-color": "#1E40AF",
    "line-width": 4,
    "line-opacity": 0.95,
  },
};

type RouteGeoJson = GeoJSON.FeatureCollection<GeoJSON.LineString>;

export default function MihLocationMap() {
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [routeGeoJson, setRouteGeoJson] = useState<RouteGeoJson | null>(null);
  const [locationError, setLocationError] = useState("");
  const [locationStatus, setLocationStatus] = useState<"idle" | "loading" | "ready" | "denied">("idle");

  const loadRoute = async (userLat: number, userLon: number) => {
    const response = await fetch(
      `https://router.project-osrm.org/route/v1/driving/${userLon},${userLat};${destination.longitude},${destination.latitude}?overview=full&geometries=geojson`
    );

    if (!response.ok) {
      throw new Error("Unable to load route");
    }

    const data = await response.json();
    const coordinates = data?.routes?.[0]?.geometry?.coordinates;

    if (!coordinates?.length) {
      throw new Error("No route returned");
    }

    setRouteGeoJson({
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          properties: {},
          geometry: {
            type: "LineString",
            coordinates,
          },
        },
      ],
    });
  };

  const requestLocation = () => {
    setLocationStatus("loading");
    setLocationError("");

    if (!navigator.geolocation) {
      setLocationStatus("denied");
      setLocationError("Location access is not supported in this browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const latitudeValue = position.coords.latitude;
        const longitudeValue = position.coords.longitude;

        setUserLocation({
          latitude: latitudeValue,
          longitude: longitudeValue,
        });

        try {
          await loadRoute(latitudeValue, longitudeValue);
          setLocationStatus("ready");
        } catch {
          setLocationStatus("ready");
          setLocationError("Location found, but the route could not be loaded right now.");
        }
      },
      (error) => {
        if (error.code === error.PERMISSION_DENIED) {
          setLocationStatus("denied");
          setLocationError("Location permission was denied. Please allow location access in your browser settings and try again.");
          return;
        }

        setLocationStatus("idle");
        setLocationError(
          error.code === error.TIMEOUT
            ? "Location request timed out. Try again or enable higher accuracy in your device settings."
            : "Could not determine your current location right now. Please try again."
        );
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  return (
    <div className="relative h-[28rem] w-full overflow-hidden rounded-2xl border border-white/10 shadow-inner">
      {locationStatus !== "ready" && (
        <div className="absolute left-4 top-4 z-10 max-w-md rounded-2xl bg-[#0F172A]/95 p-4 text-white shadow-2xl backdrop-blur-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#7C3AED]">Location Access</p>
          <p className="mt-2 text-sm leading-6 text-[#CBD5E1]">
            Allow location access to show your position and the route to Makerspace Innovhub OPC.
          </p>
          <button
            type="button"
            onClick={requestLocation}
            disabled={locationStatus === "loading"}
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#1E40AF] to-[#7C3AED] px-4 py-2 text-sm font-semibold text-white transition-transform hover:scale-[1.02] disabled:opacity-60"
          >
            {locationStatus === "loading" ? "Requesting location..." : "Allow location access"}
          </button>
          {locationError && <p className="mt-3 text-xs leading-5 text-[#FCA5A5]">{locationError}</p>}
        </div>
      )}
      <Map
        initialViewState={{
          latitude,
          longitude,
          zoom: 16,
        }}
        mapStyle={mapStyle}
        style={{ width: "100%", height: "100%" }}
        scrollZoom
        dragRotate={false}
        touchPitch={false}
      >
        <NavigationControl position="top-right" />
        {routeGeoJson && (
          <Source id="mih-route" type="geojson" data={routeGeoJson}>
            <Layer {...routeLineStyle} />
          </Source>
        )}
        {userLocation && (
          <Marker latitude={userLocation.latitude} longitude={userLocation.longitude} anchor="bottom">
            <div className="flex flex-col items-center">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#7C3AED] text-white shadow-lg ring-4 ring-white/20">
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z" />
                </svg>
              </div>
              <div className="mt-2 rounded-2xl bg-[#7C3AED] px-4 py-2 text-center text-xs font-semibold text-white shadow-lg whitespace-nowrap">
                Your location
              </div>
            </div>
          </Marker>
        )}
        <Marker latitude={latitude} longitude={longitude} anchor="bottom">
          <div className="flex flex-col items-center">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#1E40AF] text-white shadow-lg ring-4 ring-white/20">
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z" />
              </svg>
            </div>
            <div className="mt-2 rounded-2xl bg-[#1E40AF] px-4 py-2 text-center text-xs font-semibold text-white shadow-lg whitespace-nowrap">
              {locationName}
            </div>
          </div>
        </Marker>
      </Map>
    </div>
  );
}
