const createNodes = (NodeNames, NodeTypes, classNames) => {
	if (NodeNames.length !== NodeTypes.length || NodeTypes.length !== classNames.length) return "error";
	let nodes = {};
	NodeNames.map((node, index) => {
		nodes[node] = document.createElement(NodeTypes[index]);
		nodes[node].classList.add(classNames[index]);
	});
	return nodes;
};

const querySelectors = (ElementNames, selectors) => {
	if (ElementNames.length !== selectors.length) return "Error";
	let elements = {};
	ElementNames.map((element, index) => elements[element] = document.querySelector(selectors[index]))
	return elements;
};

const {
	githubForm,
	jobDescription,
	jobLocation,
	searchBtn,
	resultsContainer,
	jobList,
	resultsTitle
} = querySelectors(
	['githubForm', 'jobDescription', 'jobLocation', 'searchBtn', 'resultsContainer', 'jobList', 'resultsTitle'], ['.githubForm', '#jobDescription', '#jobLocation', '#searchBtn', '.resultsContainer', '.jobList', '.resultsTitle']
);

searchBtn.addEventListener('click', () => {
	if(!jobDescription.value.trim()){
		renderEmpty(`Please Enter a job Description`);
		return;
	}
	const query = `${jobDescription.value}, ${jobLocation.value}`;
	fetch('POST', '/get-jobs', query, (err, resJson) => {
		//Angham will check the length of the resJson and render results if there are any.
			renderResults(err, resJson);
	})

})

const renderEmpty = (message) => {
	jobList.innerHTML = ' ';
	const {
		emptyMessage
	} = createNodes(['emptyMessage'], ['p'], ['emptyMessage']);
	emptyMessage.textContent = message;
	githubForm.appendChild(emptyMessage);

}

const renderNoResults = (message) => {
	jobList.innerHTML = ' ';
	resultsTitle.textContent = message;
}

const renderResults = (err, resJson) => {

}


