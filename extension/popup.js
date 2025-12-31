// /extension/popup.js
function renderProduct(product) {
  addBtn.textContent = "Add to Price Watch";
  addBtn.disabled = false;

  // Clear old preview (important on re-open)
  const oldPreview = document.getElementById("product-preview");
  if (oldPreview) oldPreview.remove();

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

  // Click handler (unchanged routing logic)
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
