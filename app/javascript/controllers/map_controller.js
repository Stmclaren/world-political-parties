import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static values = {
    token: String,
    iso: String,
    center: Array,
    zoom: Number
  }

  connect() {
    mapboxgl.accessToken = this.tokenValue

    const map = new mapboxgl.Map({
      container: this.element,
      style: "mapbox://styles/mapbox/light-v11",
      center: this.centerValue,
      zoom: this.zoomValue
    })

    map.on("load", () => {
      map.addLayer({
        id: "country-highlight",
        type: "fill",
        source: {
          type: "vector",
          url: "mapbox://mapbox.country-boundaries-v1"
        },
        "source-layer": "country_boundaries",
        paint: {
          "fill-color": "#0080ff",
          "fill-opacity": 0.3
        },
        filter: ["==", "iso_3166_1_alpha_3", this.isoValue]
      })
    })
  }
}
