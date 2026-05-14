import React, { useState } from "react";
import { FiMapPin, FiX, FiLoader } from "react-icons/fi";
import { getAddressFromCoords } from "../Hooks/useGeocode";

const LocationPicker = ({
  setValue,
  location,
  setLocation,
  loading: externalLoading,
  setLoading: setExternalLoading,
  address,
}) => {
 
  const [internalLoading, setInternalLoading] = useState(false);
  const updateLoading = (val) => {
    if (typeof setExternalLoading === "function") {
      setExternalLoading(val);
    } else {
      setInternalLoading(val);
    }
  };
  const isLoading = externalLoading !== undefined ? externalLoading : internalLoading;

  const getLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    updateLoading(true);

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const lat = pos.coords.latitude;
          const lng = pos.coords.longitude;
          const coords = { lat, lng };

          if (typeof setLocation === "function") {
            setLocation(coords);
          }
          
          if (typeof setValue === "function") {
            setValue("lat", lat);
            setValue("lng", lng);
            
            const fullAddress = await getAddressFromCoords(lat, lng);
            setValue("address", fullAddress || "");
          }
        } catch (error) {
          console.error("Error in reverse geocoding:", error);
        } finally {
          updateLoading(false);
        }
      },
      (err) => {
        console.error("Geolocation error:", err);
        alert("Could not get your location. Please check your browser permissions.");
        updateLoading(false);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const clearLocation = () => {
    if (typeof setLocation === "function") setLocation(null);
    if (typeof setValue === "function") {
      setValue("lat", null);
      setValue("lng", null);
      setValue("address", "");
    }
  };

  return (
    <div className="flex flex-col gap-3">
      
      {!location ? (
        <button
          type="button"
          onClick={getLocation}
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-2 py-3 border border-dashed border-gray-200 rounded-xl text-sm text-gray-500 hover:border-red-300 hover:text-red-400 hover:bg-red-50 transition-all"
        >
          {isLoading ? <FiLoader className="animate-spin text-red-500" /> : <FiMapPin className="text-red-500" />}
          {isLoading ? "Detecting location..." : "Detect My Location"}
        </button>
      ) : (
        <div className="flex items-center justify-between bg-green-50 border border-green-100 rounded-xl px-4 py-3 animate-in fade-in duration-300">
          <div>
            <p className="text-xs text-green-700 font-bold flex items-center gap-1">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              Location captured
            </p>
            <p className="text-[10px] text-green-600 font-mono mt-1">
              Lat: {location.lat.toFixed(4)}, Lng: {location.lng.toFixed(4)}
            </p>
          </div>

          <button
            type="button"
            onClick={clearLocation}
            className="text-gray-400 hover:text-red-500 transition-colors p-1"
            title="Clear location"
          >
            <FiX size={18} />
          </button>
        </div>
      )}


      <div className="relative">
        <input
          value={address || ""}
          onChange={(e) => typeof setValue === "function" && setValue("address", e.target.value)}
          placeholder="Address will appear here..."
          className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-red-100 focus:border-red-300 outline-none transition-all"
          readOnly
        />
        {isLoading && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
             <FiLoader className="animate-spin text-gray-300 text-xs" />
          </div>
        )}
      </div>
    </div>
  );
};

export default LocationPicker;