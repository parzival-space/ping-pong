/* game config */
const _cfg = {
    logging: {
        client: `cyan`,
    },
}

document.addEventListener("readystatechange", () => {

    if (document.readyState === "complete") {

        /* reload on resize patch */
        var _ = document.getElementById("game");

        /* recalculate on startup */
        _.setAttribute("height", window.innerHeight);
        _.setAttribute("width", window.innerWidth);

        /* reload on resize */
        document.addEventListener("resize", () => location.reload());

        /* debug */
        console.log(`%c[Client]`, `color:${_cfg.logging.client};`, `reload on resize patch applyed`);

        /* load and inject game into dom */
        _ = document.createElement("script");

        /* set script relevant attributes */
        _.setAttribute("type", "text/javascript");
        _.setAttribute("src", "game.js");

        /* injecting into dom */
        document.head.appendChild(_);

        /* debug */
        console.log(`%c[Client]`, `color:${_cfg.logging.client};`, `injected game`);
    }
})