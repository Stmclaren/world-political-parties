import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static values = {
      token: String
  }

  connect() {
    mapboxgl.accessToken = this.tokenValue;

    this.map = new mapboxgl.Map({
      container: this.element,
      style: "mapbox://styles/mapbox/light-v11",
      center: [0, 20],
      zoom: 1.5,
      interactive: true
    });

    this.map.on("load", () => {
      this.map.addControl(new mapboxgl.NavigationControl());
      this.map.addControl(new mapboxgl.FullscreenControl());
      this.map.addControl(new mapboxgl.ScaleControl());
      this.map.addControl(new mapboxgl.AttributionControl({
        compact: true,
        position: "bottom-right"
      }));

      this.addCountryLayers();
      this.enableCountryClick();
    });
  }

  addCountryLayers() {
    this.map.addSource("countries", {
      type: "vector",
      url: "mapbox://mapbox.country-boundaries-v1"
    });

      // Highlight selected country
    if (this.map.getLayer("country-fill")) return;
    this.map.addLayer({
      id: "country-fill",
      type: "fill",
      source: "countries",
      "source-layer": "country_boundaries",
      paint: {
        "fill-color": "#0080ff",
        "fill-opacity": 0.3,
        "fill-antialias": false
      }
    },
      "land" // insert before land tint layer
    );
  }
      // Auto-center using Turf
  enableCountryClick() {
    this.map.on("click", (e) => {
      const features = this.map.queryRenderedFeatures(e.point, {
        layers: ["country-fill"]
      });

      if (features.length === 0) return

      const iso = features[0].properties.iso_3166_1_alpha_3

      this.loadSidebar(iso)
    });
  }

  loadSidebar(iso) {
    fetch(`/countries/${iso}/sidebar`)
      .then(response => response.text())
      .then(html => {
        document.getElementById("sidebar").innerHTML = html
      });
  }
}
