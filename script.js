const rgbarr = ["00", "00", "00"];
const irgbarr = ["00", "00", "00"];

const rgb = () => {
    rgbarr[0] = document.getElementById("r").value;
    rgbarr[1] = document.getElementById("g").value;
    rgbarr[2] = document.getElementById("b").value;
}

const ps = (btn) => {
    if (btn.value == "play") {
        btn.value = "stop";
        let root = document.querySelector(":root");
        root.style.setProperty("--anim", "color_change");
        let ips = document.getElementsByTagName("input")
        for (let i = 0; i < ips.length; i++) {
            if (ips[i].getAttribute("type") == "text") {
                ips[i].disabled = true;
            }
        }
    } else if (btn.value == "stop") {
        btn.value = "play";
        let root = document.querySelector(":root");
        root.style.setProperty("--anim", "none");
        for (let i = 0; i < ips.length; i++) {
            if (ips[i].getAttribute("type") == "text") {
                ips[i].disabled = false;
            }
        }
    }
}

const start = () => {
    setInterval(updatecss, 250);
}

const updatecss = () => {
    let root = document.querySelector(":root");
    if (getComputedStyle(root).getPropertyValue("--anim") == "color_change") {
        root.style.setProperty("--c1", `#${rgbarr.join("")}`);
        let tmp0 = (parseInt(rgbarr[0], 16) + parseInt(irgbarr[0], 16)) % 255;
        let tmp1 = (parseInt(rgbarr[1], 16) + parseInt(irgbarr[1], 16)) % 255;
        let tmp2 = (parseInt(rgbarr[2], 16) + parseInt(irgbarr[2], 16)) % 255;
        root.style.setProperty("--c2", `#${tmp0.toString(16).padStart(2, "0")}${tmp1.toString(16).padStart(2, "0")}${tmp2.toString(16).padStart(2, "0")}`);
        rgbarr[0] = tmp0.toString(16).padStart(2, "0");
        rgbarr[1] = tmp1.toString(16).padStart(2, "0");
        rgbarr[2] = tmp2.toString(16).padStart(2, "0");
        document.getElementById("r").value = rgbarr[0];
        document.getElementById("g").value = rgbarr[1];
        document.getElementById("b").value = rgbarr[2];
    }
}

const irgb = () => {
    irgbarr[0] = document.getElementById("ir").value;
    irgbarr[1] = document.getElementById("ig").value;
    irgbarr[2] = document.getElementById("ib").value;
}