const supertest = require('supertest');
const test = require('tape')
const router = require('../src/router')

test('Testing The tape', (t) => {
	const num = 5;
	t.equal(num, 5, 'Pass')
	t.end();
})

test('Handle Not Found Page', (t) => {
	supertest(router)
	.get('/israa')
	.expect(404)
	.expect('content-type', /html/)
	.end((err, res) => {
		if (err) {
			t.error(err);
			return;
		}
		t.equal(res.statusCode, 404, 'Should be 404 | Not Found');
		t.end()
	} )
})

test('Handle Search', (t) => {
	supertest(router)
	.get('/get-jobs')
	.expect(200)
	.expect('content-type', /json/)
	.end((err, res) => {
		if (err) {
			t.error(err);
			return;
		}
		t.equal(res.statusCode, 200, 'Should be 200');
		t.end()
	} )
})


