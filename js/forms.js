const SITE_EMAIL = "hello@tanzaniapulse.example";
const SITE_WA = "255754000000";

function openMailto(subject, body) {
  location.href = `mailto:${SITE_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function showMsg(el, text, ok) {
  if (!el) return;
  el.textContent = text;
  el.className = "form-msg " + (ok ? "ok" : "err");
}

function initContactForm() {
  const form = document.getElementById("contactForm");
  if (!form) return;
  const msg = document.getElementById("contactMsg");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = form.c_name.value.trim();
    const email = form.c_email.value.trim();
    const subject = form.c_subject.value.trim();
    const message = form.c_message.value.trim();

    if (!name || !email || !message) {
      showMsg(msg, t("form_required"), false);
      return;
    }

    openMailto(
      `Tanzania Pulse — ${subject || "Website enquiry"}`,
      `Name: ${name}\nEmail: ${email}\n\n${message}`
    );
    showMsg(msg, t("form_opened"), true);
    form.reset();
  });
}

function initSubmitForm() {
  const form = document.getElementById("submitForm");
  if (!form) return;
  const msg = document.getElementById("submitMsg");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = form.s_name.value.trim();
    const type = form.s_type.value;
    const location = form.s_location.value.trim();
    const phone = form.s_phone.value.trim();
    const email = form.s_email.value.trim();
    const website = form.s_website.value.trim();
    const desc = form.s_desc.value.trim();
    const features = [...form.querySelectorAll("input[name='s_features']:checked")].map((f) => f.value);

    if (!name || !phone || !desc) {
      showMsg(msg, t("s_required"), false);
      return;
    }

    const body = [
      `Business name: ${name}`,
      `Type: ${type}`,
      `Location: ${location}`,
      `Phone/WhatsApp: ${phone}`,
      `Email: ${email}`,
      `Website: ${website}`,
      ``,
      `Description:`,
      desc,
      ``,
      `Features: ${features.join(", ") || "-"}`,
      ``,
      `— Submitted via Tanzania Pulse website`
    ].join("\n");

    openMailto("New listing application — " + name, body);
    showMsg(msg, t("s_success"), true);
    form.reset();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initContactForm();
  initSubmitForm();
});
