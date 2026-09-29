import mapboxgl from "mapbox-gl"

function initCountrySelection(){
  const container = document.getElementById("print-select-form");
  const submitLink = document.getElementById("confirm-country-selection");

  if (!container || !submitLink) return;

  container.addEventListener("change", (e) => {
    const target = e.target;

    if (target.classList.contains("continent-checkbox")) {
      const collapseTargetId = target.getAttribute("data-target-collapse");
      if (collapseTargetId) {
        const countryCheckboxes = container.querySelectorAll(`${collapseTargetId} .country-checkbox`);
        countryCheckboxes.forEach(cb => {
          cb.checked = target.checked;
        });
      }
    }

    if (target.classList.contains("country-checkbox")) {
      const parentCollapse = target.closest(".collapse");
      if (parentCollapse) {
        const continentCheckbox = container.querySelectorAll(`[data-target-collapse="#${parentCollapse.id}"]`);
        if (continentCheckbox) {
          const siblingCountries = parentCollapse.querySelectorAll(".country-checkbox");
          const allSiblingCountriesChecked = Array.from(siblingCountries).every(cb => cb.checked);
          continentCheckbox.checked = allSiblingCountriesChecked;
        }
      }
    }

    const allCheckboxes = container.querySelectorAll("input[type='checkbox']");
    const isAnyChecked = Array.from(allCheckboxes).some(cb => cb.checked);

    if (isAnyChecked) {
      submitLink.classList.remove("disabled-link");
      submitLink.removeAttribute("aria-disabled");
      submitLink.removeAttribute("tabindex", "-1");
    } else {
      submitLink.classList.add("disabled-link");
      submitLink.setAttribute("aria-disabled", "true");
      submitLink.setAttribute("tabindex", "-1");
    }
    // console.log(Array.from(allCheckboxes))
  })
}

document.addEventListener("turbo:load", initCountrySelection);
document.addEventListener("DOMContentLoaded", initCountrySelection);


  // const printMap = new mapboxgl.Map({
  //     container: 'print-map-preview',
  //     style: "mapbox://styles/stmcl/cmtk3krfc00c701s5arrmgamp",
  //     zoom: 1.5,
  //     interactive: false,
  //     attributionControl: false
  // });

  // printMap.on("load", () => {
  //   //enabling access to all layers from my mapbox style
  //   const layers = printMap.getStyle().layers;
  //   //define which layers to keep from the above accessible layers
  //   const layersToKeep = ['land', 'landcover', 'landuse', 'admin-0-boundary', 'admin-0-boundary-bg']

  //   //aiming to disable other layers to maximise clean template for print preview
  //   layers.forEach(layer => {
  //     if (!layersToKeep.includes(layer.id)) {
  //       printMap.setLayoutProperty(layer.id, 'visibility', 'none');
  //     }
  //   })
  // })

  //event listener for the print selected countries button on the countries index page
  //this stores the ids of all the countries selected in the form of the print button
  //this triggers the print preview page which populates the page with a map of all selected countries
  //populates the info of each selected country
  //Will need to adapt the button so that it only triggers when a selection has been made
  // mapbox is static, will need to figure out how to hide the non selected countries on the map
