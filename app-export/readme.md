# App export
Use this code snippet to get a single JSON file containing all of your app's code and settings.
The simplest way to use this is to paste it into the developer console while having the IDE open on an app.

```javascript
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
```