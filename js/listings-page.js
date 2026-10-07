let activeCat = "all";
let searchTerm = "";

function applyFiltersFromState() {
  const filtered = LISTINGS.filter((item) => {
    const catOk = activeCat === "all" || item.category === activeCat;
    const haystack = (item.name + " " + item.location + " " + item.summary + " " + item.summary_sw).toLowerCase();
    const searchOk = !searchTerm || haystack.includes(searchTerm);
    return catOk && searchOk;
  });

  renderCards(document.getElementById("listingsGrid"), filtered);

  const count = document.getElementById("resultCount");
  if (count) count.textContent = `${filtered.length} ${t("catp_count")}`;
}

function setCategory(cat) {
  activeCat = cat;
  document.querySelectorAll("#filterChips .chip").forEach((c) => {
    c.classList.toggle("active", c.dataset.cat === cat);
  });
  const sel = document.getElementById("searchCat");
  if (sel) sel.value = cat;
  applyFiltersFromState();
}

document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("listingsGrid");
  if (!grid) return;

  const fixed = document.body.dataset.cat;
  const params = new URLSearchParams(location.search);
  activeCat = fixed || params.get("cat") || "all";
  searchTerm = (params.get("q") || "").toLowerCase();

  const input = document.getElementById("searchInput");
  if (input && params.get("q")) input.value = params.get("q");
  const sel = document.getElementById("searchCat");
  if (sel) sel.value = activeCat;
  document.querySelectorAll("#filterChips .chip").forEach((c) => {
    c.classList.toggle("active", c.dataset.cat === activeCat);
  });

  document.querySelectorAll("#filterChips .chip").forEach((chip) => {
    chip.addEventListener("click", () => setCategory(chip.dataset.cat));
  });

  const form = document.getElementById("searchForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      searchTerm = (document.getElementById("searchInput").value || "").trim().toLowerCase();
      activeCat = sel ? sel.value : "all";
      document.querySelectorAll("#filterChips .chip").forEach((c) => {
        c.classList.toggle("active", c.dataset.cat === activeCat);
      });
      try {
        history.replaceState(null, "", `?q=${encodeURIComponent(searchTerm)}&cat=${encodeURIComponent(activeCat)}`);
      } catch (err) {
        /* file:// may block history updates */
      }
      applyFiltersFromState();
    });
  }

  applyFiltersFromState();
});

document.addEventListener("rerender", applyFiltersFromState);
