# Shepherd

A programmatic task list generator.
Run `make install` to install the `shepherd` utility.

Check out [example.js](example.js) for an example.
Run it by executing the script directly: `./example.js`.
You can run it before installing the `shepherd` utility by running `./shepherd example.js` instead of executing the script directly.

Output will be something like the following:

```
===========================
Start Installation
===========================
* [X] On a separate computer, prepare installation media.
* [X] Insert the media into the new computer and boot it up.

===========================
Set Up System
===========================
* [X] Change user password.
* [ ] Set default shell.
* [X] Add shared mounts.
```

Press return to check off the item. Press N to skip the item. Press Q to quit.

*Note* - After installing the utility, executing the utility as `./shepherd` will still use the system installed version of [shepherd.js](shepherd.js).
Perform a `make uninstall` while you are developing the project to use the checkout's version.
