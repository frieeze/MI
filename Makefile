all:
	sudo apt install nodejs* mongodb npm
	npm install express mongoose socket.io
	sudo service mongod start
