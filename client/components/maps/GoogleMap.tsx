import { useEffect, useMemo, useRef, useState } from "react";
import { env } from "@/lib/env";
import type { College } from "@/data/colleges";

function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src='${src}']`)) return resolve();
    const s = document.createElement("script");
    s.src = src;
    s.async = true;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error("Failed to load script"));
    document.head.appendChild(s);
  });
}

type Props = { colleges: College[]; defaultCenter: google.maps.LatLngLiteral };

export default function GoogleMap({ colleges, defaultCenter }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const center = useMemo(() => defaultCenter, [defaultCenter]);

  useEffect(() => {
    if (!env.googleMapsApiKey) {
      setNotice("Map temporarily unavailable.");
      return;
    }
    const url = `https://maps.googleapis.com/maps/api/js?key=${env.googleMapsApiKey}`;
    let map: google.maps.Map | null = null;
    let markers: google.maps.marker.AdvancedMarkerElement[] = [] as any;
    let cluster: any = null;

    loadScript(url)
      .then(async () => {
        // @ts-ignore - marker library
        await loadScript(
          "https://unpkg.com/@googlemaps/markerclusterer/dist/index.min.js",
        );
        if (!ref.current) return;
        map = new google.maps.Map(ref.current, {
          center,
          zoom: 12,
          mapId: "GUIDELY_MAP",
        });

        if (navigator.geolocation) {
          const id = window.setTimeout(
            () =>
              setNotice(
                "Location denied — showing Raipur by default. Allow location to see nearer colleges.",
              ),
            4000,
          );
          navigator.geolocation.getCurrentPosition(
            (pos) => {
              window.clearTimeout(id);
              setNotice(null);
              map!.setCenter({
                lat: pos.coords.latitude,
                lng: pos.coords.longitude,
              });
            },
            () => {},
            { enableHighAccuracy: true, timeout: 3000 },
          );
        }

        // @ts-ignore
        const { MarkerClusterer } = window as any;
        markers = colleges.map(
          (c) =>
            new google.maps.marker.AdvancedMarkerElement({
              map,
              position: { lat: c.latitude, lng: c.longitude },
              title: c.name,
            }),
        );
        cluster = new MarkerClusterer({ markers, map });
      })
      .catch(() => setNotice("Failed to load Google Maps."));

    return () => {
      // Cleanup markers
      markers.forEach((m) => (m.map = null as any));
      // cluster cleanup not necessary
    };
  }, [center, colleges]);

  return (
    <div className="space-y-2">
      {notice && <p className="text-xs text-muted-foreground">{notice}</p>}
      <div ref={ref} className="h-[380px] w-full overflow-hidden rounded-xl" />
    </div>
  );
}
