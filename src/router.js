const {
	handleHome,
	handleStatics,
	handleSearch,
	handleNotFoundPage
} = require('./handler')

const router = (req, res) => {
	const endPoint = req.url;

	if (endPoint === '/') {
		handleHome(req, res);

	} else if (endPoint.includes('/public')) {
		handleStatics(req, res);

	} else if (endPoint === '/get-jobs') {
		handleSearch(req, res)

	} else {
		handleNotFoundPage(req, res)
	}

}

module.exports = router;


