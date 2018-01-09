all:
	sudo apt install nodejs* mongodb npm
	sudo apt install libcap2-bin
	sudo setcap cap_net_bind_service=+ep `readlink -f \`which node\``
	npm install express mongoose socket.io
	sudo service mongodb start
