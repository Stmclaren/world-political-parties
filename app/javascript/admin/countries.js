document.addEventListener("turbo:load", () => {
  const dropdown = document.getElementById("country-select");

  if (dropdown) {
    new TomSelect(dropdown, {
      allowEmptyOption: true,
      maxOptions: 200
    });
  }
});
