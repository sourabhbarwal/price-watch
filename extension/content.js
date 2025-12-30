// /extension/content.js

function isAmazonProductPage() {
  // Amazon product pages ALWAYS contain /dp/ or /gp/product/
  return (
    location.hostname.includes("amazon") &&
    (/\/dp\//.test(location.pathname) ||
      /\/gp\/product\//.test(location.pathname)) &&
    document.getElementById("productTitle")
  );
}

function isFlipkartProductPage() {
  // Flipkart product pages ALWAYS contain /p/
  return (
    location.hostname.includes("flipkart") &&
    /\/p\//.test(location.pathname) &&
    document.querySelector("span.B_NuCI")
  );
}

function normalizePrice(text) {
  if (!text) return null;
  return Number(
    text
      .replace(/[₹,]/g, "")
      .replace(/[^\d.]/g, "")
  );
}

function extractAmazonProduct() {
  const title =
    document.getElementById("productTitle")?.innerText?.trim();

  const priceText =
    document.querySelector(".a-price .a-offscreen")?.innerText ||
    document.querySelector("#priceblock_ourprice")?.innerText ||
    document.querySelector("#priceblock_dealprice")?.innerText;

  return {
    platform: "Amazon",
    title,
    price: normalizePrice(priceText),
    url: location.href,
  };
}

function extractFlipkartProduct() {
  const title =
    document.querySelector("span.B_NuCI")?.innerText?.trim();

  const priceText =
    document.querySelector("div._30jeq3")?.innerText;

  return {
    platform: "Flipkart",
    title,
    price: normalizePrice(priceText),
    url: location.href,
  };
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type !== "GET_PRODUCT_DATA") return;

  // 🔒 STRICT PAGE DETECTION
  if (isAmazonProductPage()) {
    const product = extractAmazonProduct();

    sendResponse({
      isProductPage: Boolean(product.title && product.price),
      product,
    });
    return;
  }

  if (isFlipkartProductPage()) {
    const product = extractFlipkartProduct();

    sendResponse({
      isProductPage: Boolean(product.title && product.price),
      product,
    });
    return;
  }

  // ❌ Not a product page
  sendResponse({
    isProductPage: false,
    product: null,
  });

  return true;
});
