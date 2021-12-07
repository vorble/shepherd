.PHONY: all
all:
	# Run make install to install the shepherd utility.

.PHONY: install
install:
	if [ -x "/usr/bin/install" ]; then \
	  echo "Using /usr/bin/install..." && \
	  /usr/bin/install -v -m 755 -o root -g root shepherd /usr/local/bin/shepherd && \
	  /usr/bin/install -v -m 644 -o root -g root shepherd.js /usr/local/share/shepherd.js; \
	else \
	  echo "Using cp..." && \
	  cp -v shepherd /usr/local/bin/shepherd && \
	  cp -v shepherd.js /usr/local/share/shepherd.js; \
	fi

.PHONY: uninstall
uninstall:
	-rm -rf /usr/local/bin/shepherd
	-rm -rf /usr/local/share/shepherd.js
