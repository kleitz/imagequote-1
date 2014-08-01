var CONFIG = {
    "PORT": process.env.OPENSHIFT_NODEJS_PORT || "8080",
    "IP": process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1",
    "WEB_APP": "/web-app",
    "MODULES": "/modules",
    "DB_HOST": process.env.OPENSHIFT_MYSQL_DB_HOST || "localhost",
    "DB_USER": "imagequote",
    "DB_PASSWORD": "iqtwnbre22",
    "DB_NAME": "imagequote"
};

module.exports = CONFIG;