const supertest = require('supertest');
const test = require('tape');
const router = require('../src/router');

test('Testing The tape', (t) => {
	const num = 5;
	t.equal(num, 5, 'Pass');
	t.end();
})

test('Hnadle Home Page', (t)=>{
	supertest(router)
	.get('/')
	.expect(200)
	.expect('content-type', /html/)
	.end((err)=>{
		t.error(err);
		t.end();
	})
})

test('Hnadle Home Page Content', (t) => {
	supertest(router)
		.get('/')
		.expect(200)
		.expect('content-type', /html/)
		.end((err, res) => {
			t.error(err);
			t.equal(res.text.includes('<title>GitHub Jobs</title>'), true, 'pass');
			t.end();
		})
})

test('Testing handleStatics: style.css', (t)=>{
	supertest(router)
		.get('/public/css/style.css')
		.expect(200)
		.expect('content-type', 'text/css')
		.end((err) => {
			t.error(err);
			t.end();
		})
})

test('Testing style.css Content', (t) => {
	supertest(router)
		.get('/public/css/style.css')
		.expect(200)
		.expect('content-type', 'text/css')
		.end((err, res) => {
			t.error(err);
			t.equal(res.text.includes('.headerContainer') && res.text.includes(' padding: 1em 2em;'), true, 'pass')
			t.end();
		})
})

test('Testing handleStatics: dom.js', (t) => {
	supertest(router)
		.get('/public/js/dom.js')
		.expect(200)
		.expect('content-type', 'text/javascript')
		.end((err) => {
			t.error(err);
			t.end();
		})
})

test('Handle Not Found Page', (t) => {
	supertest(router)
	.get('/israa')
	.expect(404)
	.expect('content-type', /html/)
	.end((err) => {
		t.error(err);
		t.end();
	})
})

test('Handle Search', (t) => {
	supertest(router)
	.get('/get-jobs')
	.expect(200)
	.expect('content-type', /json/)
	.end((err) => {
		t.error(err);
		t.end();
	})
})

test('Handle Internal Server Error', (t) => {
	supertest(router)
		.get('/public/style.css')
		.expect(500)
		.expect('content-type', /html/)
		.end((err) => {
			t.error(err);
			t.end();
		})
})




