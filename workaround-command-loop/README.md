# Workaround: Creating a command system
The app system suddenly stopped firing the "chat message" event
on messages that are marked spam with `$message.setSpam(true)`.
This caused some command implementations to stop working.

Since commands can contain sensitive data,
or are otherwise wise to keep out of the public chat,
it is smart to hide them with setSpam(true).
This can be done with `$kv` using the following templates.

**In short:** This method queues commands into `$kv` to process them in a callback loop every second. This will cause lag in command processing, but at least the messages aren't shown to the public.

&nbsp;

## Shared code
These are some generic functions used in this workaround
```javascript
// This function adds a command to the command queue
function queueCommand(username, message, isPrivileged = false) {
  const queue = $kv.get('commandTickQueue', []);
  queue.push([ username, message, isPrivileged ]);
  $kv.set('commandTickQueue', queue);
}

// This function checks if a certain user has "privileges"
// (change to your liking)
function isPrivileged(user) {
  return (typeof user == 'object')
          ? (('__privileged' in user && !!user.__privileged) || user.username == $kv.get('roomUsername', '') || user.isMod)
          : user == $kv.get('roomUsername', '');
}
```

&nbsp;

## Chat message transform
```javascript
(() => {

    // messages starting with / are recognized as commands
    // (the commandParse is used only as a workaround
    //  for apps which receive the decorated message from other apps)
    const content = $message.body;
    const commandParse = ($message.body.match(/\/(.*)/gmi) || []).join('');
    const commandCaseless = commandParse.toLowerCase();
    const args = commandParse.trim().split(' ');

    // Command check
    if (args[0].toLowerCase().indexOf('/') == 0) {
        queueCommand($user.username, content, isPrivileged($user));
        $message.setBody(`${$message.body} (your command will be processed shortly)`);
        $message.setSpam(true);
        return;
    }

})();
```

&nbsp;

## App start
```javascript
// process the command queue every second
$callback.create('tick', 1, true);
```

&nbsp;

## Callback
```javascript
(() => {

    if ($callback.label == 'tick') {

        const commandQueue = $kv.get('commandTickQueue', []);
        if (commandQueue.length == 0) return;

        while (commandQueue.length > 0) {

            const command = commandQueue[0];
            const $user = { username: command[0], __privileged: !!command[2] };
            const $message = { body: command[1] };

            const commandParse = ($message.body.match(/\/(.*)/gmi) || []).join('');
            const args = commandParse.trim().split(' ');
            const commandLabel = args[0];

            switch (commandLabel.toLowerCase()) {

                case '/help': {
                    // ...do something for the command /help
                    break;
                }

            }

        }

    }

})();

```