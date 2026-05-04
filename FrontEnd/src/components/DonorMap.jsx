import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

export function DonorMap({ lat, lng, requests = [] }) {
  const mapRef = useRef(null);
  const mapContainerRef = useRef(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (mapRef.current) {
      mapRef.current.remove();
    }

    const centerLat = lat ? Number(lat) : 30.0444;
    const centerLng = lng ? Number(lng) : 31.2357;

    const map = L.map(mapContainerRef.current).setView(
      [centerLat, centerLng],
      12,
    );

    mapRef.current = map;

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap",
    }).addTo(map);

    // User location marker
    if (lat && lng) {
      L.marker([Number(lat), Number(lng)])
        .addTo(map)
        .bindPopup("<b>You are here</b>")
        .openPopup();
    }

    // Hospital markers
    requests.forEach((r) => {
      const rLat = r.lat;
      const rLng = r.lng;

      if (!rLat || !rLng) return;

      const hospitalIcon = new L.Icon({
        iconUrl:
          "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
        shadowUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
      });

      const marker = L.marker([Number(rLat), Number(rLng)], {
        icon: hospitalIcon,
      }).addTo(map);

      // Tooltip (shows always above marker on hover)
      marker.bindTooltip(r.hospitalName || "Hospital", {
        permanent: true,
        direction: "top",
        offset: [0, -10],
        className: "hospital-label",
      });

      marker.bindPopup(`
        <div style="text-align:left">
          <b style="color:#e11d48">${r.hospitalName || "Hospital"}</b><br/>
          Blood Needed: ${r.bloodTypeNeeded || ""}<br/>
          Units: ${r.quantity || 0}
        </div>
      `);
    });

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [lat, lng, requests]);

  return (
    <div
      ref={mapContainerRef}
      className="w-full rounded-xl shadow-inner border border-gray-100"
      style={{ height: "300px", zIndex: 1 }}
    />
  );
}
