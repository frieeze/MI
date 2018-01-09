all:
	sudo -i
	apt install nodejs mongodb
	npm install express mongoose socket.io
	service mongod start