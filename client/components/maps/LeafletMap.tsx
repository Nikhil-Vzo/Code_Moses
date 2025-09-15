import { useEffect, useRef, useState } from "react";
import type { College } from "@/data/colleges";

function load(src: string, id: string, isCss?: boolean) {
  return new Promise<void>((resolve) => {
    if (document.getElementById(id)) return resolve();
    if (isCss) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = src;
      link.id = id;
      document.head.appendChild(link);
      resolve();
    } else {
      const s = document.createElement("script");
      s.src = src;
      s.async = true;
      s.id = id;
      s.onload = () => resolve();
      document.body.appendChild(s);
    }
  });
}

type Props = { colleges: College[]; center: { lat: number; lng: number } };

export default function LeafletMap({ colleges, center }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  useEffect(() => {
    let map: any = null;
    let markers: any[] = [];
    Promise.all([
      load(
        "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css",
        "leaflet-css",
        true,
      ),
      load("https://unpkg.com/leaflet@1.9.4/dist/leaflet.js", "leaflet-js"),
    ]).then(() => {
      const L = (window as any).L;
      if (!ref.current || !L) return;
      map = L.map(ref.current).setView([center.lat, center.lng], 12);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap",
      }).addTo(map);

      const withCoords = colleges.filter((c) => c.latitude && c.longitude);
      markers = withCoords.map((c) =>
        L.marker([c.latitude!, c.longitude!])
          .addTo(map)
          .bindPopup(`<b>${c.name}</b><br/>${c.district}`),
      );

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            const { latitude, longitude } = pos.coords as any;
            L.circleMarker([latitude, longitude], {
              radius: 6,
              color: "#7b61ff",
            })
              .addTo(map)
              .bindPopup("You are here");
            map.setView([latitude, longitude], 13);
          },
          () => setNotice("Location denied — showing Raipur by default."),
          { enableHighAccuracy: true, timeout: 3000 },
        );
      }
    });

    return () => {
      if (map) map.remove();
      markers = [];
    };
  }, [colleges, center]);

  return (
    <div className="space-y-2">
      {notice && <p className="text-xs text-muted-foreground">{notice}</p>}
      <div ref={ref} className="h-[380px] w-full overflow-hidden rounded-xl" />
    </div>
  );
}
