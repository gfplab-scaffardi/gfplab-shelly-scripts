/**
 * @title Shelly LoRa Relay TX (Transmitter)
 * @description Monitors the local switch toggle and sends relay commands via LoRa
 *              to a remote Shelly device. Implements a 3-phase ON cycle:
 *              phase 1 & 2 keep the RX relay OFF, phase 3 turns it ON.
 *              OFF always sends RX=OFF.
 * @status experimental
 */

console.log("==========");
console.log("TX v2 START");
console.log("==========");

let LORA_ID = 100;
let SWITCH_ID = 0;

let onCount = 0;
let phase = 0;
let lastTxOn = null;
let busy = false;

function sendRx(on, reason) {
  let obj = {
    t: "relay",
    on: !!on,
    phase: phase + 1,
    onCount: onCount,
    reason: reason
  };
  let txt = JSON.stringify(obj);
  console.log("[TX] SEND", txt);

  Shelly.call(
    "LoRa.SendBytes",
    { id: LORA_ID, data: btoa(txt) },
    function (res, err, errmsg) {
      if (err) console.log("[TX] LoRa FAIL", err, errmsg);
      else console.log("[TX] LoRa OK on=", !!on);
      busy = false;
    }
  );
}

function handleTx(txOn, source) {
  txOn = !!txOn;
  if (lastTxOn === txOn) return;
  if (busy) {
    console.log("[TX] skip busy, wanted", txOn, "from", source);
    return;
  }

  lastTxOn = txOn;
  busy = true;

  if (txOn) {
    onCount++;
    phase = (onCount - 1) % 3;
    let rxOn = phase === 2;
    console.log(
      "[TX] ON#", onCount,
      "phase", phase + 1, "/3",
      "=> TX=1 RX=", rxOn ? 1 : 0,
      "src=", source
    );
    sendRx(rxOn, "tx_on");
  } else {
    console.log("[TX] OFF phase", phase + 1, "/3 => RX=0 src=", source);
    sendRx(false, "tx_off");
  }
}

Shelly.addEventHandler(function (event) {
  if (!event || event.component !== "switch:" + SWITCH_ID) return;
  if (!event.info || event.info.event !== "toggle") return;
  if (typeof event.info.state === "undefined") return;

  console.log("[TX] toggle state=", event.info.state);
  handleTx(event.info.state, "event");
});

Shelly.call("Switch.GetStatus", { id: SWITCH_ID }, function (st) {
  if (st && typeof st.output !== "undefined") {
    lastTxOn = !!st.output;
    console.log("[TX] boot output=", lastTxOn);
  }
});
