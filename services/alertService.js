// src/services/alertService.js
import { evaluatePriceAlert } from "@/lib/alertEngineV2";
import { useAlertStore } from "@/store/alertStore";

/**
 * Central alert coordinator
 * Store handles cooldown + dedupe
 */
export function handleProductAlert(product) {
  const alertStore = useAlertStore.getState();

  const alert = evaluatePriceAlert(product);

  if (alert) {
    alertStore.pushAlert(alert);
  }
}
