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

function populatePrintPreview(event){
  if (event) event.preventDefault();

  const checkedCountries = document.querySelectorAll(".country-checkbox:checked");
  const selectedCountryData = Array.from(checkedCountries).map(checkbox => {
    return checkbox.dataset.countryName;
  });

  if (selectedCountryData.length === 0) {
    alert("No countries selected.");
    return;
  }

  sessionStorage.setItem('selectedCountries', JSON.stringify(selectedCountryData));
  window.location.href = '/countries/print_preview';

}

document.addEventListener('DOMContentLoaded', () => {
  console.log("Print preview JS is running!");
  const printContainer = document.getElementById('print-preview-container');

    if (!printContainer) return;

      const storedData = sessionStorage.getItem('selectedCountries');
      if (storedData) {
        const countries = JSON.parse(storedData);
          printContainer.innerHTML = `<h3>Country Report:</h3>` +
            `<ul>${countries.map(c => `<li>${c}</li>`).join('')}</ul>`;
      }
});

document.addEventListener("turbo:load", initCountrySelection);
document.addEventListener("DOMContentLoaded", initCountrySelection);

const printButton = document.getElementById('confirm-country-selection');
if (printButton) {
  printButton.addEventListener('click', populatePrintPreview)
}
