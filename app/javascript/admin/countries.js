document.addEventListener("turbo:load", () => {
  const dropdown = document.getElementById("country-select");

  if (!dropdown) return;
    const ts = new TomSelect(dropdown);


    ts.on("change", async (countryId) => {
      document.getElementById("countryIdInput").value = countryId;
      const input1 = document.getElementById("governmentInput");
      const input2 = document.getElementById("electoralInput");
      const input3 = document.getElementById("partiesInput");
      const input4 = document.getElementById("euInput");
      const input5 = document.getElementById("indicatorsInput");
      const input6 = document.getElementById("issuesInput");

      const response = await fetch(`/admin/countries/${countryId}.json`);
      const country = await response.json();

      input1.value = country.government_structure || "";
      input2.value = country.electoral_system || "";
      input3.value = country.political_parties || "";
      input4.value = country.eu_alignment || "";
      input5.value = country.governance_indicators || "";
      input6.value = country.key_issues || "";
    });

    document.addEventListener("input", (e) => {
      if (e.target.tagName.toLowerCase() !== "textarea") return;
      e.target.style.height = "auto";
      e.target.style.height = `${e.target.scrollHeight}px`;
    });
});

document.addEventListener("turbo:load", () => {
  const saveBtn = document.getElementById("saveCountryBtn");
  const csrfToken = document.querySelector('meta[name="csrf-token"]').content;

  saveBtn.addEventListener("click", async () => {
    const countryId = document.getElementById("countryIdInput").value;
    const input1 = document.getElementById("governmentInput");
    const input2 = document.getElementById("electoralInput");
    const input3 = document.getElementById("partiesInput");
    const input4 = document.getElementById("euInput");
    const input5 = document.getElementById("indicatorsInput");
    const input6 = document.getElementById("issuesInput");

    const response = await fetch(`/admin/countries/${countryId}.json`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "X-CSRF-Token": csrfToken
      },
      body: JSON.stringify({
        country: {
          government_structure: document.getElementById("governmentInput").value,
          electoral_system: document.getElementById("electoralInput").value,
          political_parties: document.getElementById("partiesInput").value,
          eu_alignment: document.getElementById("euInput").value,
          governance_indicators: document.getElementById("indicatorsInput").value,
          key_issues: document.getElementById("issuesInput").value
        }
      })
    });
    document.getElementById("lastUpdated").innerText =
      `Last updated: ${new Date(data.updated_at).toLocaleString()}`;

    const result = await response.json();
    console.log("Saved:", result);
  });
});
