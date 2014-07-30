var CONFIG = {
    "PORT": 80,
    "WEB_APP": "/web-app",
    "MODULES": "/modules",
    "DB_HOST": "localhost",
    "DB_USER": "imagequote",
    "DB_PASSWORD": "iqtwnbre22",
    "DB_NAME": "imagequote"
};

//if running on Openshift server
if (process.env.OPENSHIFT_INTERNAL_PORT) {
    CONFIG.PORT = process.env.OPENSHIFT_INTERNAL_PORT;
    CONFIG.DB_HOST = "127.3.122.2:3306";
}

module.exports = CONFIG;