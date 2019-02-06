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
	resultsTitle,
	container
} = querySelectors(
	['container', 'githubForm', 'jobDescription', 'jobLocation',
		'searchBtn', 'resultsContainer', 'jobList', 'resultsTitle'
	], ['#container', '.githubForm', '#jobDescription', '#jobLocation',
		'#searchBtn', '.resultsContainer', '.jobList', '.resultsTitle'
	]
);

searchBtn.addEventListener('click', () => {
	if (!jobDescription.value.trim()) {
		renderEmpty(`Please Enter a job Description`);
		return;
	}
	const query = `${jobDescription.value}, ${jobLocation.value}`;
	jobDescription.value = ' ';
	jobLocation.value = ' ';
	fetch('POST', '/get-jobs', query, (err, resJson) => {
		if (err) {
			renderError(err);
		}
		if (resJson.length === 0) {
			renderNoResults(`No Results Found`);
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

const renderEmpty = (message) => {
	resultsTitle.textContent = " ";
	jobList.innerHTML = ' ';
	const {
		emptyMessage
	} = createNodes(['emptyMessage'], ['p'], ['emptyMessage']);
	emptyMessage.textContent = message;
	jobList.appendChild(emptyMessage);
}

const renderNoResults = (message) => {
	resultsTitle.textContent= " ";
	jobList.innerHTML = ' ';
	jobList.textContent = message;
}

const renderResults = (resJson) => {
		resultsTitle.textContent = " ";
		jobList.innerHTML = ' ';
	resJson.forEach((job, index) => {
		renderJobContent(job, index)
	});
}

const renderError = (err) => {
	container.innerHTML = ' ';
	const {
		error
	} = createNodes(['error'], ['h1'], ['error']);
	error.textContent = err;
	container.appendChild(error)
}

const renderJobContent = (job, index) => {

	const DOMElement = createNodes(['jobTitle', 'companyName', 'timeType', 'state', 'date'], 
		['a', 'p', 'p', 'p', 'p'], 
		['jobTitle', 'companyName', 'timeType', 'state', 'date']);
	const {
		jobData
	} = createNodes(['jobData'], ['li'], ['jobData']);

	console.log(job);
	DOMElement.jobTitle.textContent = job.title;
	DOMElement.jobTitle.href = job.url;
	DOMElement.companyName.textContent = job.company;
	DOMElement.timeType.textContent = job.type;
	DOMElement.state.textContent = job.location;
	DOMElement.date.textContent = job.created_at;
	jobData.appendChild(DOMElement.jobTitle)
	jobData.appendChild(DOMElement.companyName)
	jobData.appendChild(DOMElement.timeType)
	jobData.appendChild(DOMElement.state)
	jobData.appendChild(DOMElement.date)
	jobList.appendChild(jobData)
}



