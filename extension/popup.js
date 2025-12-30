// /extension/popup.js

const addBtn = document.getElementById("addBtn");

let resolved = false;

chrome.tabs.query({ active: true, currentWindow: true }, async ([tab]) => {
  if (!tab?.id || !tab.url) {
    addBtn.textContent = "No active tab";
    return;
  }

  const url = tab.url;

  let platform = null;
  if (isAmazonProductPage(url)) platform = "amazon";

  if (!platform) {
    addBtn.textContent = "Open a Product page.";
    addBtn.disabled = true;
    return;
  }

  addBtn.textContent = "Reading product details…";
  addBtn.disabled = true;

  await extractWithRetry(tab.id, platform);
});

/* -----------------------------
   Controlled async retry loop
------------------------------ */
async function extractWithRetry(tabId, platform) {
  const MAX_ATTEMPTS = 10;
  const DELAY = 400;

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    if (resolved) return;

    const result = await executeExtraction(tabId, platform);

    if (result?.title && result?.price) {
      resolved = true;
      renderProduct(result);
      return;
    }

    await sleep(DELAY);
  }

  if (!resolved) {
    addBtn.textContent = "Unable to read product price";
    addBtn.disabled = true;
  }
}

function executeExtraction(tabId, platform) {
  return new Promise((resolve) => {
    chrome.scripting.executeScript(
      {
        target: { tabId },
        func: extractProductFromPage,
        args: [platform],
      },
      (results) => {
        resolve(results?.[0]?.result ?? null);
      }
    );
  });
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

/* -----------------------------
   Runs INSIDE page
------------------------------ */
function extractProductFromPage(platform) {
  function normalizePrice(text) {
    if (!text) return null;
    return Number(
      text.replace(/[₹,]/g, "").replace(/[^\d.]/g, "")
    );
  }

  // AMAZON
  if (platform === "amazon") {
    const title =
      document.getElementById("productTitle")?.innerText?.trim();

    let priceText = null;

    const offscreen = document.querySelector(".a-price .a-offscreen");
    if (offscreen) priceText = offscreen.innerText;

    if (!priceText) {
      const whole = document.querySelector(".a-price-whole");
      const fraction = document.querySelector(".a-price-fraction");
      if (whole) {
        priceText =
          whole.innerText +
          (fraction ? "." + fraction.innerText : "");
      }
    }

    return {
      platform: "Amazon",
      title,
      price: normalizePrice(priceText),
      url: location.href,
    };
  }
  return null;
}

/* -----------------------------
   UI
------------------------------ */
function renderProduct(product) {
  addBtn.textContent = "Add to Price Watch";
  addBtn.disabled = false;

  const preview = document.createElement("div");
  preview.style.marginTop = "10px";
  preview.style.fontSize = "12px";
  preview.style.color = "#cbd5f5";

  preview.innerHTML = `
    <div style="margin-bottom:6px;">
      <strong>${product.title}</strong>
    </div>
    <div>Platform: ${product.platform}</div>
    <div>Price: ₹${product.price}</div>
  `;

  document.body.appendChild(preview);
}

/* -----------------------------
   URL detection
------------------------------ */
function isAmazonProductPage(url) {
  try {
    const u = new URL(url);
    return (
      u.hostname.includes("amazon") &&
      (u.pathname.includes("/dp/") ||
        u.pathname.includes("/gp/product/"))
    );
  } catch {
    return false;
  }
}