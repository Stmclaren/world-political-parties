import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
    static values = {
      token: String,
      iso: String
    }

  connect() {
    requestAnimationFrame(() => this.initializeMap());
  }

  initializeMap() {
    if (this.map) {
      console.warn("Map already initialized — skipping");
      return;
    }

    mapboxgl.accessToken = this.tokenValue;

    this.map = new mapboxgl.Map({
      container: this.element,
      style: "mapbox://styles/mapbox/light-v11",
      center: [0, 20],
      zoom: 1.5,
      interactive: true
    });

    this.map.on("load", () => {
      // Add interaction controls
      this.map.resize();
      this.map.addControl(new mapboxgl.NavigationControl());
      this.map.addControl(new mapboxgl.FullscreenControl());
      this.map.addControl(new mapboxgl.ScaleControl());

      // Add country boundaries
      this.map.addSource("countries", {
        type: "vector",
        url: "mapbox://mapbox.country-boundaries-v1"
      })
      // Highlight selected country
      this.map.addLayer({
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
      this.map.on("idle", () => {
        const features = map.querySourceFeatures("countries", {
        sourceLayer: "country_boundaries",
        filter: ["==", "iso_3166_1_alpha_3", this.isoValue]
        });

        if (features.length > 0) {
        const bbox = turf.bbox(features[0])
        this.map.fitBounds(bbox, { padding: 40 })
          }
      });

            // Prepare for future click events
      this.map.on("click", (e) => {
        console.log("Clicked at:", e.lngLat);
      });
    });
  }
}
