.PHONY: all
all:
	# Run make install to install the shepherd utility.

.PHONY: install
install:
	install -m 755 -o root -g root shepherd /usr/local/bin/shepherd
	install -m 644 -o root -g root shepherd.js /usr/local/share/shepherd.js

.PHONY: uninstall
uninstall:
	-rm -rf /usr/local/bin/shepherd
	-rm -rf /usr/local/share/shepherd.js
