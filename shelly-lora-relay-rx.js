/**
 * @title Shelly LoRa Relay RX (Receiver)
 * @description Listens for LoRa relay commands and controls the local switch accordingly.
 *              Pairs with lora-relay-tx.js running on a remote Shelly device.
 * @status experimental
 */

console.log("==========");
console.log("RX v2 START");
console.log("==========");

let LORA_ID = 100;
let SWITCH_ID = 0;

Shelly.addEventHandler(function (event) {
  if (!event || event.name !== "lora" || event.id !== LORA_ID) return;
  if (!event.info || !event.info.data) return;

  let txt;
  try {
    txt = atob(event.info.data);
  } catch (e) {
    console.log("[RX] atob FAIL");
    return;
  }

  let msg;
  try {
    msg = JSON.parse(txt);
  } catch (e) {
    console.log("[RX] JSON FAIL", txt);
    return;
  }

  if (!msg || msg.t !== "relay" || typeof msg.on === "undefined") {
    console.log("[RX] ignore", txt);
    return;
  }

  console.log(
    "[RX] CMD on=", !!msg.on,
    "phase=", msg.phase,
    "onCount=", msg.onCount,
    "reason=", msg.reason,
    "RSSI=", event.info.rssi
  );

  Shelly.call(
    "Switch.Set",
    { id: SWITCH_ID, on: !!msg.on },
    function (res, err, errmsg) {
      if (err) {
        console.log("[RX] Switch FAIL", err, errmsg);
        return;
      }
      console.log("[RX] Switch OK was_on=", res && res.was_on, "now=", !!msg.on);
    }
  );
});
