// // src/services/alertService.js
// import { evaluatePriceAlert } from "@/lib/alertEngineV2";
// import { useAlertStore } from "@/store/alertStore";

// /**
//  * Central alert coordinator
//  * Store handles cooldown + dedupe
//  */
// export function handleProductAlert(product) {
//   const alertStore = useAlertStore.getState();

//   const alert = evaluatePriceAlert(product);

//   if (alert) {
//     alertStore.pushAlert(alert);
//   }
// }

// src/services/alertService.js
import { evaluatePriceAlert } from "@/lib/alertEngineV2";
import { adapter } from "@/adapters";
import { useAlertStore } from "@/store/alertStore";

export async function handleProductAlert(product) {
  const alertStore = useAlertStore.getState();

  const alert = evaluatePriceAlert(product);
  if (!alert) return;

  // 1️⃣ Push to store (cooldown + dedupe)
  alertStore.pushAlert(alert);

  // 2️⃣ Persist to backend (if enabled)
  if (alert.productId) {
    await adapter.saveAlert({
      ...alert,
      user_id: product.user_id,
    });
  }
}
