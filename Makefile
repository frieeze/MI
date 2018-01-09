all:
	
	sudo apt install nodejs mongodb
	npm install express mongoose socket.io
	sudo service mongod start
