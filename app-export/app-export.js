/*
 * Copypaste this code to your developer console in the app IDE
 * to obtain all of your app's code and settings data as JSON
 */
(() => {
    const UUID_MATCH = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/gi;
    const appUuid = (window.location.href.match(UUID_MATCH) ?? [])[0];
    if (!appUuid) return alert(`Invalid URL. Open your app first.`);
    fetch(`https://devportal.cb.dev/api/v1/ide/${appUuid}/content/`)
        .then(x => x.blob())
        .then(appDataBlob => {
            const blobUrl = URL.createObjectURL(appDataBlob);
            window.open(blobUrl);
        })
        .catch(err => {
            alert(`An error occurred while fetching app data:\n\n${err}`)
        })
})();