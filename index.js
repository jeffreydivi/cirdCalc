// CIDR calculator.
// © 2021 Jeffrey DiVincent.
// Licensed under the MIT license.

function err(msg) {
    document.getElementById("errCode").innerText = msg;
    document.getElementById("data").style.display = "none";
    document.getElementById("err").style.display = "block";
}

// Binary operations for binary strings
function strNOT(str) {
    let neue = "";
    for (let i = 0; i < str.length; i++) {
        if (str[i] === "0")
            neue += "1";
        else
            neue += "0";
    }
    return neue;
}
function strXOR(a, b) {
    let neue = "";
    for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i])
            neue += "1"
        else
            neue += "0";
    }
    return neue;
}
function strAND(a, b) {
    let neue = "";
    for (let i = 0; i < a.length; i++) {
        if (a[i] === b[i] && a[i] === "1")
            neue += "1"
        else
            neue += "0";
    }
    return neue;
}

// Converts a string to a string of binary digits to manipulate.
function ipv4Convert(str) {
    let i;
    // A challenge: "1.1" is a valid IP address (1.0.0.1). Try to parse?
    // nah, it's probably too much work lol
    let addr = str.split(".");
    if (addr.length < 4) {
        for (i = addr.length; i < 4; i++) {
            addr[i] = 0;
        }
    }

    for (i = 0; i < 4; i++) {
        addr[i] = Number(addr[i]).toString(2).padStart("8", "0");
    }

    return addr;
}

// Converts a binary string to a readable IPv4 address.
function parseIPv4(str) {
    let i;

    let base2 = ["", "", "", ""];
    let base10 = [0, 0, 0, 0];

    base2[0] = str.substring(0,8);
    base2[1] = str.substring(8,16);
    base2[2] = str.substring(16,24);
    base2[3] = str.substring(24,32);

    for (i = 0; i < 4; i++) {
        base10[i] = Number.parseInt(base2[i], 2);
    }

    return base10.join(".");
}

function update(evt) {
    let val = evt.target.value;
    let i;

    // Guard until ready.
    if (val.indexOf("/") === -1) {
        err("No network prefix provided.");
        return;
    }

    let givenIP = val.substring(0, val.indexOf("/"));
    let mask = Number(val.substring(val.indexOf("/") + 1));

    // Validity guard
    if (mask < 0 || mask > 32 || mask === NaN || mask === undefined) {
        err("Network prefix is invalid; it must be between 0 and 32.");
        return;
    }

    let ip_arr = ipv4Convert(givenIP);
    let ip_bin = ip_arr.join("");
    let ip_bin_str = ip_arr.join(".");

    // Build XOR-ing string (wildcard_mask, subnet_mask)
    let wildcard_mask = "".padStart(mask,"0") + "".padStart(32-mask,"1");
    let subnet_mask = "".padStart(mask,"1").padEnd(32,"0");

    // Build starting IP
    let ip = strAND(ip_bin, subnet_mask);

    // Push to DOM
    document.getElementById("startIP").innerText = parseIPv4(ip);
    document.getElementById("mask").innerText = mask;

    // wildcard_mask -> DOM
    document.getElementById("maskIP").innerText = parseIPv4(wildcard_mask);
    document.getElementById("subnetMaskIP").innerText = parseIPv4(subnet_mask);

    let ip_end = strXOR(ip, wildcard_mask);

    // Print end IP to DOM
    document.getElementById("endIP").innerText = parseIPv4(ip_end);


    document.getElementById("err").style.display = "none";
    document.getElementById("data").style.display = "block";
}

document.getElementById("inp").onkeyup = update;
