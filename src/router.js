const {
	handleHome,
	handleStatics,
	handleSearch,
    handleNotFoundPage,
    handleServerError
} = require('./handler')

const router = (req, res) => {
	const endPoint = req.url;
	const regex = /\/public\/.*\/?(.css|.js|.html|.png|.jpg|.icon|.json)/;

	if (endPoint === '/') {
		handleHome(req, res);

	} else if (regex.test(endPoint)) {
		handleStatics(req, res);

	} else if (endPoint === '/get-jobs') {
		handleSearch(req, res)

	} else {
		handleNotFoundPage(req, res)
	}

}

module.exports = router;


