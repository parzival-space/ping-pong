/* game config */
var _cfg = {
    logging: {
        client: "cyan"
    },
    game: {
        debug: {
            enabled: false,
            color: "#FF0000"
        },
        field: {
            color: "gray"
        },
        ball: {
            color: "#FF0000"
        },
        player: {
            color: "#FFFFFF",
            mpt: 7,
            bots: false
        }
    }
};
document.addEventListener("readystatechange", function () {
    if (document.readyState === "complete") {
        /* reload on resize patch */
        var _ = document.getElementById("game");
        /* recalculate on startup */
        _.setAttribute("height", window.innerHeight);
        _.setAttribute("width", window.innerWidth);
        /* reload on resize */
        document.addEventListener("resize", function () { return location.reload(); });
        /* debug */
        console.log("%c[Client]", "color:" + _cfg.logging.client + ";", "reload on resize patch applyed");
        /* load and inject game into dom */
        _ = document.createElement("script");
        /* set script relevant attributes */
        _.setAttribute("type", "text/javascript");
        _.setAttribute("src", "game.js");
        /* injecting into dom */
        document.head.appendChild(_);
        /* debug */
        console.log("%c[Client]", "color:" + _cfg.logging.client + ";", "injected game");
    }
});
