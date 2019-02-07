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
	ElementNames.map((element, index) => elements[element] = document.querySelector(selectors[index]));
	return elements;
};

const {
	githubForm,
	jobDescription,
	jobLocation,
	searchBtn,
	resultsContainer,
	jobList,
	resultsTitle,
	container
} = querySelectors(
	['container', 'githubForm', 'jobDescription', 'jobLocation',
		'searchBtn', 'resultsContainer', 'jobList', 'resultsTitle'
	], ['#container', '.githubForm', '#jobDescription', '#jobLocation',
		'#searchBtn', '.resultsContainer', '.jobList', '.resultsTitle'
	]
);

const renderMessage = (message) => {
	jobList.textContent = message;
}

const renderError = (err) => {
	container.classList.add('hide');
	const {
		error
	} = createNodes(['error'], ['h1'], ['error']);
	error.textContent = err;
	container.parentNode.insertBefore(error, container);
}

const renderResults = (resJson) => {
	resJson.forEach((job, index) => {
		renderJobContent(job, index)
	});
}

const renderJobContent = (job, index) => {
	const DOMElement = createNodes(['jobTitle', 'companyName', 'timeType', 'state', 'date'],
		['a', 'p', 'p', 'p', 'p'],
		['jobTitle', 'companyName', 'timeType', 'state', 'date']);
	const {
		jobData, listContainer, columnOne, columnTwo
	} = createNodes(['jobData', 'listContainer','columnOne', 'columnTwo'
	], ['li', 'div', 'div', 'div'], ['jobData', 'listContainer','columnOne', 'columnTwo'
	]);

	DOMElement.jobTitle.textContent = job.title;
	DOMElement.jobTitle.href = job.url;
	DOMElement.companyName.textContent = job.company;
	DOMElement.timeType.textContent = job.type;
	DOMElement.state.textContent = job.location;
	DOMElement.date.textContent = job.created_at;
	jobData.appendChild(DOMElement.jobTitle)
	columnOne.appendChild(DOMElement.companyName)
	columnOne.appendChild(DOMElement.timeType)
	columnTwo.appendChild(DOMElement.state)
	columnTwo.appendChild(DOMElement.date)
	listContainer.appendChild(columnOne);
	listContainer.appendChild(columnTwo);
	jobData.appendChild(listContainer);
	jobList.appendChild(jobData)
}

searchBtn.addEventListener('click', () => {
	if (!jobDescription.value.trim()) {
		resultsTitle.textContent = " ";
		jobList.innerHTML = ' ';
		renderMessage(`Please Enter a job Description`);
		return;
	}
	const query = `${jobDescription.value}, ${jobLocation.value}`;
	jobDescription.value = ' ';
	jobLocation.value = ' ';
	fetch('POST', '/get-jobs', query, (err, resJson) => {
		resultsTitle.textContent = " ";
		jobList.innerHTML = ' ';
		if (err) {
			renderError(err);
			return;
		}
		if (resJson.length === 0) {
			renderMessage(`No Results Found`);
			return;
		}
		if (resJson.length > 10) {
			resultsTitle.textContent = `Showing 10 jobs`
			renderResults(resJson.slice(0, 11));
			return;
		}
		resultsTitle.textContent = `Showing ${resJson.length} jobs`;
		renderResults(resJson);
	})
})


