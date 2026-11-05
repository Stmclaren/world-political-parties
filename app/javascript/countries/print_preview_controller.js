import mapboxgl from "mapbox-gl"
import { iso3ToIso2 } from "controllers/iso3_to_iso2_mapping"

// function for checkboxes in Print Preview Selection
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

// function for populating preview page with data from selected countries
function populatePrintPreview(event){
  if (event) event.preventDefault();

  const checkedCountries = document.querySelectorAll(".country-checkbox:checked");
   const ids = Array.from(checkedCountries).map(
    checkbox => checkbox.value
  );

    console.log(ids);

  if (ids.length === 0) {
    alert("No countries selected.");
    return;
  }

  window.location.href = `/countries/print_preview?ids=${ids.join(',')}`;

}

// conversion from 3 letter code iso to 2 letter code iso, as assets differ to model
document.querySelectorAll(".country-flag").forEach((flag) => {
  const iso3 = flag.dataset.iso;

  const iso2 = iso3ToIso2[iso3.toUpperCase()];

  if (iso2) {
    flag.src = `/assets/flags/${iso2}.svg`;
  }
});

document.addEventListener('DOMContentLoaded', () => {
  console.log("Print preview JS is running!");
  const printContainer = document.getElementById('print-preview-container');


    if (!printContainer) return;
      console.log("Print Preview Loaded")

});

document.addEventListener("turbo:load", initCountrySelection);
document.addEventListener("DOMContentLoaded", initCountrySelection);

const printButton = document.getElementById('confirm-country-selection');
if (printButton) {
  printButton.addEventListener('click', populatePrintPreview)
}

// getFlagPath(adminAlpha3code) {

//     const codeUpper = adminAlpha3code.toUpperCase();
//     const alpha2 = iso3ToIso2[codeUpper];

//     return alpha2;
// }

// updateFlag(iso3) {

//     const flag = document.getElementById("flag-select")

//     if (!flag) return;

//     const alpha2 = this.getFlagPath(iso3);

//     flag.src = `/assets/flags/${alpha2}.svg`
// }
