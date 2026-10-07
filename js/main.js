const CAT_COLORS = {
  hotel: "#087A6A",
  apartment: "#1B5E7A",
  transport: "#D9A441",
  restaurant: "#C0392B",
  experience: "#111111"
};

const PRICE_WORDS = {
  hotel: "per_night",
  apartment: "per_night",
  transport: "per_trip",
  restaurant: "per_meal",
  experience: "per_person"
};

function catLabel(cat) {
  return t("cat_label_" + cat);
}

function priceWord(cat) {
  return t(PRICE_WORDS[cat] || "per_night");
}

function listingSummary(item) {
  return currentLang === "sw" ? item.summary_sw : item.summary;
}

function listingRow(item) {
  const initial = item.name.trim().charAt(0).toUpperCase();
  return `
    <a class="lrow" href="listing.html?id=${encodeURIComponent(item.id)}">
      <span class="lrow__media cover-art cover--${item.category}" data-mark="${initial}" aria-hidden="true"></span>
      <span class="lrow__body">
        <span class="kicker">${catLabel(item.category)} · ${item.location}</span>
        <span class="lrow__title">${item.name}</span>
        <span class="lrow__text">${listingSummary(item)}</span>
        <span class="lrow__meta">
          <span class="price">${t("from")} $${item.price} <small>/ ${priceWord(item.category)}</small></span>
          <span class="rating">★ ${item.rating}</span>
          <span class="more">${t("enquire_wa")} →</span>
        </span>
      </span>
    </a>`;
}

function listingTile(item) {
  const initial = item.name.trim().charAt(0).toUpperCase();
  return `
    <a class="tile" href="listing.html?id=${encodeURIComponent(item.id)}">
      <span class="tile__media cover-art cover--${item.category}" data-mark="${initial}" aria-hidden="true"></span>
      <span class="tile__body">
        <span class="badge">${catLabel(item.category)}</span>
        <span class="tile__title">${item.name}</span>
        <span class="tile__text">${listingSummary(item)}</span>
        <span class="tile__foot">
          <span class="price">${t("from")} $${item.price} <small>/ ${priceWord(item.category)}</small></span>
          <span class="rating">★ ${item.rating}</span>
        </span>
      </span>
    </a>`;
}

function listingCard(item) {
  return listingRow(item);
}

function renderCards(el, items, variant) {
  if (!el) return;
  const render = variant === "tile" ? listingTile : listingRow;
  if (variant === "tile") el.classList.add("grid-tiles");
  el.innerHTML = items.length
    ? items.map(render).join("")
    : `<div class="empty-state">${t("list_empty")}</div>`;
}

document.addEventListener("langchange", () => {
  document.dispatchEvent(new CustomEvent("rerender"));
});

document.addEventListener("DOMContentLoaded", () => {
  const topFind = document.getElementById("topFind");
  if (topFind) {
    topFind.addEventListener("click", () => {
      const homeInput = document.getElementById("homeSearchInput");
      if (homeInput) {
        homeInput.focus();
        homeInput.scrollIntoView({ block: "center" });
      } else {
        location.href = "listings.html";
      }
    });
  }
});
