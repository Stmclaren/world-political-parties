import { Controller } from "@hotwired/stimulus"
import { Collapse } from "bootstrap"
import mapboxgl from "mapbox-gl"
import { iso3ToIso2 } from "./iso3_to_iso2_mapping"

export default class extends Controller {
  static targets = ["container"]
  static values = { token: String }

  connect() {
    mapboxgl.accessToken = this.tokenValue;

    this.map = new mapboxgl.Map({
      container: this.containerTarget,
      style: "mapbox://styles/stmcl/cmtk3krfc00c701s5arrmgamp",
      center: [0, 20],
      zoom: 1.5,
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
      this.addHighlightLayer();
    });
  }

  async fetchCountryData() {
    const response = await fetch("/countries/map_data");
    return await response.json();
  }

  async buildCountryColorExpression() {
      const countries = await this.fetchCountryData();
      const colorPalette = {
          "Far Left": "#800020",
          "Centre Left": "#FF0000",
          "Centre": "#a915e4",
          "Centre Right": "#0909FF",
          "Far Right": "#664e2c"
      };

      const expression = [
        "match",
        ["get", "iso_3166_1_alpha_3"]
      ];

      countries.forEach(country => {
        expression.push(
          country.iso,
          colorPalette[country.ruling_party] || "#ffffff"
        );
      });
      expression.push('#ffffff');
      return expression;
    };

  async addCountryLayers() {
    this.map.addSource("countries", {
      type: "vector",
      url: "mapbox://mapbox.country-boundaries-v1"
    });

    const generateCountryColorExpression =
      await this.buildCountryColorExpression();

    if (this.map.getLayer("country-fill")) return;
    this.map.addLayer({
      id: "country-fill",
      type: "fill",
      source: "countries",
      "source-layer": "country_boundaries",
      paint: {
        "fill-color": generateCountryColorExpression,
        "fill-opacity": 0.18
      }
    },
      "country-label" // insert before country-label layer
    );
  }

  enableCountryClick() {
    this.map.on("click", (e) => {
      const features = this.map.queryRenderedFeatures(e.point, {
        layers: ["country-fill"]
      });

      if (features.length === 0) return

      const iso = features[0].properties.iso_3166_1_alpha_3

      this.loadSidebar(iso);
      this.updateFlag(iso);
      this.highlightCountry(iso);
    });
  }

    getFlagPath(adminAlpha3code) {

    const codeUpper = adminAlpha3code.toUpperCase();
    const alpha2 = iso3ToIso2[codeUpper];

    return alpha2;
  }

  updateFlag(iso3) {

    const flag = document.getElementById("flag-select")

    if (!flag) return;

    const alpha2 = this.getFlagPath(iso3);

    flag.src = `/assets/flags/${alpha2}.svg`
  }

  loadSidebar(iso) {
    fetch(`/countries/${iso}/sidebar`)
      .then(response => response.text())
      .then(html => {
        const sidebar = document.getElementById("sidebar")
        sidebar.innerHTML = html
        this.updateFlag(iso)
        // Reinitialize Bootstrap collapse for the newly injected HTML
        this.initializeAccordion(sidebar)
      });
  }

  initializeAccordion(sidebarElement) {
    sidebarElement.querySelectorAll(".accordion-collapse").forEach(el => {
      new Collapse(el, { toggle: false })
    })
  }

   addHighlightLayer() {
     if (this.map.getLayer("country-highlight")) return;

     this.map.addLayer({
      id: "country-highlight",
      type: "line",
      source: "countries",
      "source-layer": "country_boundaries",
      paint: {
        "line-color": "#ff0000",
        "line-width": 1.5,
        "line-opacity": 1
      },
      filter: ["==", "iso_3166_1_alpha_3", ""]
     });
   }
   highlightCountry(isoCode) {
     this.map.setFilter("country-highlight",[
      "==",
      "iso_3166_1_alpha_3",
      isoCode
     ]);
   }
}
