import React from 'react';
import amplitude from 'amplitude-js';
import { render } from "react-dom";
import { App } from "./components/App.js";
import "./styles/index.css";
import { showAlert } from "./components/AutoHideAlert.js";
import { showMintModal } from "./components/MintModal.js";
import { init } from "./mint";
import { dirtyFixConnectWalletUI } from "./utils";

const sendAnonymousAnalytics = () => {
    if (window.location.host.includes("localhost"))
        return
    try {
        amplitude.getInstance().init("e2aff4bf282355999267edb40276222a")
        amplitude.getInstance().setOptOut(window.DEFAULTS?.analyticsOptOut ?? true)
        amplitude.getInstance().logEvent("Opened a minting website", {
            "url": window.location.host.replace('www.', 'https')
        })
        amplitude.getInstance().setDomain(window.location.host.replace('www.', ''))
    } catch (e) {
        console.log("Error in sendAnonymousAnalytics()")
    }
}

const createDOMElement = () => {
    const body = document.getElementsByTagName('body')[0];
    const div = Object.assign(document.createElement('div'), {
        id: "root",
    });
    body.appendChild(div);
    return div;
}

const renderAppContainers = () => {
    render(<App />, createDOMElement());
}

const isRendered = () => {
    return !!document.getElementById("root")
}

const renderAndInit = () => {
    renderAppContainer()
    if (!isRendered()) {
        console.error("React not rendered, returning")
        return
    }
    init()
    dirtyFixConnectWalletUI()
    sendAnonymousAnalytics()
}

document.addEventListener("DOMContentLoaded", () => {
    renderAndInit()
});

window.onload = () => {
    if (!isRendered()) {
        console.warn("React re-rendering in window.onload")
        renderAndInit()
    }
}

export { showAlert, showMintModal, renderAppContainer };



