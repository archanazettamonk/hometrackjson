//Test Cases
var assert = require('assert');
var sinon = require('sinon');
var PassThrough = require('stream').PassThrough;
var http = require('http');

var api = require('../controllers/apiController.js');

describe('api', function() {
	beforeEach(function() {
		this.request = sinon.stub(http, 'request');
	});

	afterEach(function() {
		http.request.restore();
	});

//Test cases here

});
