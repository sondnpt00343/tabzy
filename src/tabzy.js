function Tabzy(selector) {
    this.container = document.querySelector(selector);
    if (!this.container) {
        console.error(`Tabzy: No container found for selector '${selector}'`);
        return;
    }

    this.tabs = Array.from(this.container.querySelectorAll("li a"));
    if (!this.tabs.length) {
        console.error(`Tabzy: No tabs found inside the container`);
        return;
    }

    this.panels = this.tabs
        .map((tab) => {
            const panel = document.querySelector(tab.getAttribute("href"));
            if (!panel) {
                console.error(
                    `Tabzy: No panel found for selector '${tab.getAttribute(
                        "href"
                    )}'`
                );
            }
            return panel;
        })
        .filter(Boolean);

    if (this.tabs.length !== this.panels.length) return;

    this._init();
}

Tabzy.prototype._init = function () {
    const tabActive = this.tabs[0];
    tabActive.closest("li").classList.add("tabzy--active");

    this.panels.forEach((panel) => (panel.hidden = true));

    this.tabs.forEach((tab) => {
        tab.onclick = (event) => this._handleTabClick(event, tab);
    });

    const panelActive = this.panels[0];
    panelActive.hidden = false;
};

Tabzy.prototype._handleTabClick = function (event, tab) {
    event.preventDefault();

    this.tabs.forEach((tab) => {
        tab.closest("li").classList.remove("tabzy--active");
    });

    tab.closest("li").classList.add("tabzy--active");

    this.panels.forEach((panel) => (panel.hidden = true));

    const panelActive = document.querySelector(tab.getAttribute("href"));
    panelActive.hidden = false;
};
