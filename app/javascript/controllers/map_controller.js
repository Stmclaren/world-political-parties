import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static values = {
    token: String,
    iso: String
  }

  connect() {
    mapboxgl.accessToken = this.tokenValue

    const map = new mapboxgl.Map({
      container: this.element,
      style: "mapbox://styles/mapbox/light-v11",
      center: [0, 20],
      zoom: 2.5,
      interactive: true // ensures manual navigation works
    })

    map.on("load", () => {
      // Add interaction controls
      map.resize();
      map.addControl(new mapboxgl.NavigationControl());
      map.addControl(new mapboxgl.FullscreenControl());
      map.addControl(new mapboxgl.ScaleControl());

      // Add country boundaries
      map.addSource("countries", {
        type: "vector",
        urls: "mapbox://mapbox.country-boundaries-v1"
      })
      // Highlight selected country
      map.addLayer({
        id: "country-highlight",
        type: "fill",
        source: "countries",
        "source-layer": "country_boundaries",
        paint: {
          "fill-color": "#0080ff",
          "fill-opacity": 0.3
        },
        filter: ["==", "iso_3166_1_alpha_3", this.isoValue]
      })
      // Auto-center using Turf
    map.on("idle", () => {
      const features = map.querySourceFeatures("countries", {
      sourceLayer: "country_boundaries",
      filter: ["==", "iso_3166_1_alpha_3", this.isoValue]
      });

      if (features.length > 0) {
      const bbox = turf.bbox(features[0])
      map.fitBounds(bbox, { padding: 40 })
        }
    });

            // Prepare for future click events
      map.on("click", (e) => {
        console.log("Clicked at:", e.lngLat);
      })
    })
  }
}
