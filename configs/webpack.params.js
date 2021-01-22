const os = require("os").platform();

module.exports = {
	"require_path" : os == "linux" ? "/usr/local/lib/node_modules/" : "",
	"sprite_limit" : 8192,
	"include_host" : "http://www.knivesout.jp",
	"encode" : "utf-8",
	"cdn_path_dist" : "https://test.nie.163.com/test_cdn/knivesout.jp/m/h5/20210120144204/",

	"cdn_path_release" : "https://www.knivesout.jp/m/h5/20210120144204/"
} 