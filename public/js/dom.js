const jobDescription = document.querySelector('#jobDescription');
const jobLocation = document.querySelector('#jobLocation');
const searchBtn = document.querySelector('#searchBtn');

searchBtn.addEventListener('click', () => {
	if(!jobDescription.value.trim()){
		renderEmpty(``);
		return;
	}
	const query = `${jobDescription.value}, ${jobLocation.value}`;
	fetch('POST', '/get-jobs', query, (err, resJson) => {
			renderResults(err, resJson);
	})

})

const renderEmpty = () => {

}

const renderResults = (err, resJson) => {

}


