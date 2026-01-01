// // /extension/popup.js
// function renderProduct(product) {
//   addBtn.textContent = "Add to Price Watch";
//   addBtn.disabled = false;

//   // Clear old preview (important on re-open)
//   const oldPreview = document.getElementById("product-preview");
//   if (oldPreview) oldPreview.remove();

//   const preview = document.createElement("div");
//   preview.id = "product-preview";
//   preview.style.marginTop = "10px";
//   preview.style.fontSize = "12px";
//   preview.style.color = "#cbd5f5";
//   preview.style.lineHeight = "1.4";

//   preview.innerHTML = `
//     <div style="font-weight:600; margin-bottom:4px;">
//       ${product.title}
//     </div>
//     <div>Platform: ${product.platform}</div>
//     <div>Price: ₹${product.price}</div>
//   `;

//   document.body.appendChild(preview);

//   // Click handler (unchanged routing logic)
//   addBtn.onclick = () => {
//     const url = new URL(`${APP_BASE_URL}/dashboard`);
//     url.searchParams.set("fromExt", "1");
//     url.searchParams.set("title", product.title);
//     url.searchParams.set("price", product.price);
//     url.searchParams.set("platform", product.platform);
//     url.searchParams.set("productUrl", product.url);

//     chrome.tabs.create({ url: url.toString() });
//   };
// }


// function isAmazonProductPage(url) {
//   try {
//     const u = new URL(url);
//     return (
//       u.hostname.includes("amazon") &&
//       (u.pathname.includes("/dp/") ||
//         u.pathname.includes("/gp/product/"))
//     );
//   } catch {
//     return false;
//   }
// }

// extension/popup.js

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.getElementById("addBtn");
  const APP_BASE_URL = "http://localhost:3000";

  if (!addBtn) return;

  addBtn.textContent = "Detecting product…";
  addBtn.disabled = true;

  chrome.tabs.query({ active: true, currentWindow: true }, async ([tab]) => {
    if (!tab?.id || !tab.url) {
      addBtn.textContent = "No active tab";
      return;
    }

    if (!isAmazonProductPage(tab.url)) {
      addBtn.textContent = "Open an Amazon product page";
      return;
    }

    const product = await extractAmazonWithRetry(tab.id);

    if (!product) {
      addBtn.textContent = "Unable to detect product";
      return;
    }

    renderProduct(product);
  });

  /* -----------------------------
     Extraction
  ------------------------------ */
  async function extractAmazonWithRetry(tabId) {
    const MAX_ATTEMPTS = 10;
    const DELAY = 400;

    for (let i = 0; i < MAX_ATTEMPTS; i++) {
      const product = await executeExtraction(tabId);
      if (product?.title && product?.price) return product;
      await sleep(DELAY);
    }
    return null;
  }

  function executeExtraction(tabId) {
    return new Promise((resolve) => {
      chrome.scripting.executeScript(
        {
          target: { tabId },
          func: extractAmazonProduct,
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

  function extractAmazonProduct() {
    function normalizePrice(text) {
      if (!text) return null;
      return Number(text.replace(/[₹,]/g, "").replace(/[^\d.]/g, ""));
    }

    const title =
      document.getElementById("productTitle")?.innerText?.trim();

    let priceText =
      document.querySelector(".a-price .a-offscreen")?.innerText;

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

  /* -----------------------------
     UI
  ------------------------------ */
  function renderProduct(product) {
    addBtn.textContent = "Add to Price Watch";
    addBtn.disabled = false;

    // Remove old preview if exists
    const old = document.getElementById("product-preview");
    if (old) old.remove();

    const preview = document.createElement("div");
    preview.id = "product-preview";
    preview.style.marginTop = "10px";
    preview.style.fontSize = "12px";
    preview.style.color = "#cbd5f5";
    preview.style.lineHeight = "1.4";

    preview.innerHTML = `
      <div style="font-weight:600; margin-bottom:4px;">
        ${product.title}
      </div>
      <div>Platform: ${product.platform}</div>
      <div>Price: ₹${product.price}</div>
    `;

    document.body.appendChild(preview);

    addBtn.onclick = () => {
      const url = new URL(`${APP_BASE_URL}/dashboard`);
      url.searchParams.set("fromExt", "1");
      url.searchParams.set("title", product.title);
      url.searchParams.set("price", product.price);
      url.searchParams.set("platform", product.platform);
      url.searchParams.set("productUrl", product.url);

      chrome.tabs.create({ url: url.toString() });
    };
  }

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
});
