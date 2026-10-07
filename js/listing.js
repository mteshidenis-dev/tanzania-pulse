function amenityItems(item) {
  const labels = currentLang === "sw" ? AMENITY_LABELS_SW : AMENITY_LABELS;
  return item.amenities
    .map((a) => `<li>${labels[a] || a}</li>`)
    .join("");
}

function detailHTML(item) {
  const per = priceWord(item.category);
  const waText = encodeURIComponent(
    `Habari ${item.name}! I found you on Tanzania Pulse (AFCON 2027) and I'd like to enquire about availability.`
  );
  const waLink = `https://wa.me/${item.phone.replace(/[^0-9]/g, "")}?text=${waText}`;
  const glyph = CAT_ICONS[item.category] || "•";

  return `
    <div class="detail-hero">
      <div class="container">
        <a class="back-link" href="listings.html">← ${t("back_home")}</a>
        <div class="breadcrumb">Arusha · ${catLabel(item.category)}</div>
        <h1>${item.name}</h1>
        <div class="detail-meta">
          <span>📍 ${item.location}</span>
          <span>★ ${item.rating}</span>
          <span>${t("from")} $${item.price} ${per}</span>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="detail-banner cover-art cover--${item.category}" data-mark="${glyph}" aria-hidden="true"></div>

      <div class="detail-layout">
        <div class="detail-main">
          <h2>${t("about")}</h2>
          <p>${currentLang === "sw" ? item.description_sw : item.description}</p>

          <h2 style="margin-top:2rem">${t("amenities")}</h2>
          <ul class="amenity-list">${amenityItems(item)}</ul>
        </div>

        <aside class="book-box">
          <div class="price">${t("from")} $${item.price} <small>/ ${per}</small></div>
          <a class="btn btn-green" href="${waLink}" target="_blank" rel="noopener">${t("enquire_wa")}</a>
          <a class="btn btn-dark" href="tel:${item.phone.replace(/\s/g, "")}">${t("call_btn")}: ${item.phone}</a>
          <a class="btn btn-outline" href="mailto:${item.email}">${t("email_btn")}</a>
          <p class="book-note">${t("book_note")}</p>
          <div class="owner-line">${t("managed_by")}</div>
        </aside>
      </div>
    </div>`;
}

function renderDetail() {
  const root = document.getElementById("detailRoot");
  if (!root) return;

  const id = new URLSearchParams(location.search).get("id");
  const item = LISTINGS.find((l) => l.id === id);

  if (!item) {
    root.innerHTML = `
      <div class="container not-found">
        <h1 style="font-weight:900;text-transform:uppercase">${t("not_found")}</h1>
        <p style="color:var(--muted);margin-top:0.6rem">${t("not_found_sub")}</p>
        <a class="btn btn-yellow" style="margin-top:1.4rem" href="listings.html">${t("back_home")}</a>
      </div>`;
    return;
  }

  document.title = `${item.name} — Tanzania Pulse`;
  root.innerHTML = detailHTML(item);
}

document.addEventListener("DOMContentLoaded", renderDetail);
document.addEventListener("langchange", renderDetail);
