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

function listingCard(item) {
  const initial = item.name.trim().charAt(0).toUpperCase();
  const priceWordLabel = priceWord(item.category);
  return `
    <a class="card" href="listing.html?id=${encodeURIComponent(item.id)}" style="--card-color:${item.imageColor || CAT_COLORS[item.category]}">
      <div class="card-media">
        <span class="cat-tag">${catLabel(item.category)}</span>
        <span class="rating">★ ${item.rating}</span>
        ${initial}
      </div>
      <div class="card-body">
        <h3>${item.name}</h3>
        <div class="card-loc">📍 ${item.location}</div>
        <p class="card-sum">${currentLang === "sw" ? item.summary_sw : item.summary}</p>
        <div class="card-foot">
          <div class="price">${t("from")} $${item.price} <small>/ ${priceWordLabel}</small></div>
          <span class="btn btn-green" style="padding:0.5rem 1rem;font-size:0.82rem">${t("enquire_wa")}</span>
        </div>
      </div>
    </a>`;
}

function renderCards(el, items) {
  if (!el) return;
  el.innerHTML = items.length
    ? items.map(listingCard).join("")
    : `<div class="empty-state">${t("list_empty")}</div>`;
}

document.addEventListener("langchange", () => {
  document.dispatchEvent(new CustomEvent("rerender"));
});
