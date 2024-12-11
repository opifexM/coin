import * as L from 'leaflet';
import {Atm} from "../../api/atm-schema.ts";
import 'leaflet/dist/leaflet.css';
import {MAP} from "../../const.ts";

export function getAtmMapComponent(atms: Atm[]): HTMLDivElement {
  const component = document.createElement('div');
  component.classList.add('atm-map-component');

  const mapContainer = document.createElement('div');
  mapContainer.id = 'map';
  mapContainer.style.height = '600px';
  component.appendChild(mapContainer);

  const map = L.map(mapContainer).setView([MAP.LAT_DEFAULT, MAP.LON_DEFAULT], MAP.ZOOM_DEFAULT);
  setTimeout(() => map.invalidateSize(), 0);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors',
  }).addTo(map);

  atms.forEach((atm) => {
    if (atm.lat && atm.lon) {
      L.marker([atm.lat, atm.lon])
        .addTo(map)
        .bindPopup(`<b>${MAP.NAME_DEFAULT}</b>`)
    }
  });

  return component;
}
