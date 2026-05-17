"use client";

import { useState, useRef } from "react";
import Map, { Layer, Marker, NavigationControl, Source, MapRef } from "react-map-gl/maplibre";

const DEST_LAT = 16.025327;
const DEST_LON = 120.4286234;
const locationName = "Makerspace InnovHub OPC";

const detailedRasterStyle = {
  version: 8,
  sources: {
    osm: {
      type: "raster",
      tiles: [
        "https://a.tile.openstreetmap.org/{z}/{x}/{y}.png",
        "https://b.tile.openstreetmap.org/{z}/{x}/{y}.png",
        "https://c.tile.openstreetmap.org/{z}/{x}/{y}.png",
      ],
      tileSize: 256,
      attribution: "&copy; OpenStreetMap contributors",
    },
  },
  layers: [
    {
      id: "osm-raster",
      type: "raster",
      source: "osm",
      minzoom: 0,
      maxzoom: 19,
    },
  ],
} as const;

const simpleRasterStyle = {
  version: 8,
  sources: {
    cartoLight: {
      type: "raster",
      tiles: [
        "https://a.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png",
        "https://b.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png",
        "https://c.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png",
        "https://d.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png",
      ],
      tileSize: 256,
      attribution: "&copy; OpenStreetMap contributors &copy; CARTO",
    },
  },
  layers: [
    {
      id: "carto-raster",
      type: "raster",
      source: "cartoLight",
      minzoom: 0,
      maxzoom: 20,
    },
  ],
} as const;

const MAP_STYLES = {
  street: detailedRasterStyle,
  satellite: simpleRasterStyle,
};

const routeLineStyle = {
  id: "mih-route-line",
  type: "line" as const,
  paint: {
    "line-color": "#3B82F6",
    "line-width": 5,
    "line-opacity": 0.9,
  },
};

const routeLineStyleBorder = {
  id: "mih-route-line-border",
  type: "line" as const,
  paint: {
    "line-color": "#1E40AF",
    "line-width": 8,
    "line-opacity": 0.4,
  },
};

type RouteGeoJson = GeoJSON.FeatureCollection<GeoJSON.LineString>;

export default function MihLocationMap() {
  const mapRef = useRef<MapRef>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [routeGeoJson, setRouteGeoJson] = useState<RouteGeoJson | null>(null);
  const [locationError, setLocationError] = useState("");
  const [locationStatus, setLocationStatus] = useState<"idle" | "loading" | "ready">("idle");
  const [mapStyle, setMapStyle] = useState<"street" | "satellite">("street");
  const [hasRetried, setHasRetried] = useState(false);

  const loadRoute = async (userLat: number, userLon: number) => {
    try {
      const response = await fetch(
        `https://router.project-osrm.org/route/v1/driving/${userLon},${userLat};${DEST_LON},${DEST_LAT}?overview=full&geometries=geojson`
      );

      if (!response.ok) {
        throw new Error("Unable to load route");
      }

      const data = await response.json();
      const route = data?.routes?.[0];
      const coordinates = route?.geometry?.coordinates;

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

      // fitBounds expects [southWest, northEast]; normalize to avoid invalid bounds ordering.
      const southWest: [number, number] = [
        Math.min(userLon, DEST_LON),
        Math.min(userLat, DEST_LAT),
      ];
      const northEast: [number, number] = [
        Math.max(userLon, DEST_LON),
        Math.max(userLat, DEST_LAT),
      ];

      mapRef.current?.fitBounds([southWest, northEast], {
        padding: 100,
        duration: 2000,
      });
    } catch {
      setRouteGeoJson({
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            properties: {},
            geometry: {
              type: "LineString",
              coordinates: [
                [userLon, userLat],
                [DEST_LON, DEST_LAT],
              ],
            },
          },
        ],
      });
      setLocationError("Route could not be loaded. Your location is shown on the map.");
    }
  };

  const requestLocation = () => {
    if (!navigator.geolocation) {
      setLocationError("Location access is not supported in this browser.");
      return;
    }

    setLocationStatus("loading");
    setLocationError("");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLat = position.coords.latitude;
        const userLon = position.coords.longitude;

        const newUserLocation = { lat: userLat, lng: userLon };
        setUserLocation(newUserLocation);

        loadRoute(userLat, userLon);
        setLocationStatus("ready");
      },
      (error) => {
        if (error.code === error.PERMISSION_DENIED) {
          setLocationError("Location permission denied. Please click the location icon in your browser's address bar to allow access, then refresh.");
        } else if (error.code === error.TIMEOUT) {
          if (!hasRetried) {
            setHasRetried(true);
            requestLocation();
          } else {
            setLocationError("Location request timed out. Please try again.");
          }
        } else {
          setLocationError("Could not determine your location. Please try again.");
        }
        setLocationStatus("idle");
      },
      {
        enableHighAccuracy: true,
        timeout: 30000,
        maximumAge: 0,
      }
    );
  };

  const isPromptVisible = locationStatus !== "ready";

  const toggleMapStyle = () => {
    setMapStyle((prev) => (prev === "street" ? "satellite" : "street"));
  };

  return (
    <div className="relative h-[28rem] w-full overflow-hidden rounded-2xl border border-white/10 shadow-inner">
      {isPromptVisible && (
        <div className="absolute left-4 top-4 z-10 max-w-md rounded-2xl bg-[#0F172A]/95 p-4 text-white shadow-2xl backdrop-blur-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#7C3AED]">Location Access</p>
          <p className="mt-2 text-sm leading-6 text-[#CBD5E1]">
            Click below to allow location access. Your browser will ask for permission to show your position on the map.
          </p>
          <button
            type="button"
            onClick={requestLocation}
            disabled={locationStatus === "loading"}
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#1E40AF] to-[#7C3AED] px-4 py-2 text-sm font-semibold text-white transition-transform hover:scale-[1.02] disabled:opacity-60"
          >
            {locationStatus === "loading" ? (
              <>Getting accurate location...</>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Enable Location
              </>
            )}
          </button>
          {locationError && <p className="mt-3 text-xs leading-5 text-[#FCA5A5]">{locationError}</p>}
        </div>
      )}

      {locationStatus === "ready" && (
        <div className="absolute left-4 top-4 z-10 flex items-center gap-2 rounded-lg bg-[#0F172A]/90 px-3 py-2 text-xs font-medium text-white shadow-lg backdrop-blur-sm">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
          </span>
          Location enabled
        </div>
      )}

      <div className="absolute right-3 top-3 z-10">
        <button
          type="button"
          onClick={toggleMapStyle}
          className="flex items-center gap-2 rounded-lg bg-[#0F172A]/90 px-3 py-2 text-xs font-medium text-white shadow-lg backdrop-blur-sm transition-colors hover:bg-[#1E293B]"
        >
          {mapStyle === "street" ? (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
              Simple Map
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
              Detailed Map
            </>
          )}
        </button>
      </div>

      <Map
        ref={mapRef}
        initialViewState={{
          latitude: DEST_LAT,
          longitude: DEST_LON,
          zoom: 14,
        }}
        mapStyle={MAP_STYLES[mapStyle]}
        style={{ width: "100%", height: "100%" }}
        scrollZoom
        dragRotate={false}
        touchPitch={false}
      >
        <NavigationControl position="top-left" showCompass={false} />

        {routeGeoJson && (
          <>
            <Source id="mih-route-border" type="geojson" data={routeGeoJson}>
              <Layer {...routeLineStyleBorder} />
            </Source>
            <Source id="mih-route" type="geojson" data={routeGeoJson}>
              <Layer {...routeLineStyle} />
            </Source>
          </>
        )}

        {userLocation && (
          <Marker latitude={userLocation.lat} longitude={userLocation.lng} anchor="bottom">
            <div className="flex flex-col items-center">
              <div className="relative">
                <div className="absolute -inset-3 rounded-full bg-[#7C3AED]/40 animate-ping"></div>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#7C3AED] text-white shadow-xl ring-4 ring-white/30">
                  <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z" />
                  </svg>
                </div>
              </div>
              <div className="mt-2 rounded-2xl bg-[#7C3AED] px-4 py-2 text-center text-xs font-semibold text-white shadow-lg whitespace-nowrap">
                Your Location
              </div>
            </div>
          </Marker>
        )}

        <Marker latitude={DEST_LAT} longitude={DEST_LON} anchor="bottom">
          <div className="flex flex-col items-center">
            <div className="relative">
              <div className="absolute -inset-3 rounded-full bg-[#1E40AF]/40 animate-ping"></div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#1E40AF] text-white shadow-xl ring-4 ring-white/30">
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z" />
                </svg>
              </div>
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