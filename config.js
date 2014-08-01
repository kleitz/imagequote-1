var CONFIG = {
    "PORT": "8080",
    "IP": "127.0.0.1",
    "WEB_APP": "/web-app",
    "MODULES": "/modules",
    "DB_HOST": "localhost",
    "DB_USER": "imagequote",
    "DB_PASSWORD": "iqtwnbre22",
    "DB_NAME": "imagequote"
};

//if running on Openshift server
if (process.env.OPENSHIFT_NODEJS_PORT) {
    CONFIG.PORT = process.env.OPENSHIFT_NODEJS_PORT;
    CONFIG.IP = process.env.OPENSHIFT_NODEJS_IP;
    CONFIG.DB_HOST = process.env.OPENSHIFT_MYSQL_DB_HOST;
}

module.exports = CONFIG;