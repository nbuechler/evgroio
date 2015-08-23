'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Activity = mongoose.model('Activity'),
	Experience = mongoose.model('Experience');

/**
 * Globals
 */
var user, experience, activity;

/**
 * Unit tests
 */
describe('Experience Model Unit Tests:', function() {
	beforeEach(function(done) {
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: 'username',
			password: 'password'
		});

		activity = new Activity({
			name: 'Activity Name',
							description: 'Activity Description',
							descriptionArray: [],
							descriptionArrayLength: 0,
							importance: 0,
							privacy: 0,
			user: user
		});

		user.save(function() {

			experience = new Experience({
				name: 'Experience Name',
								description: 'Experience Description',
				user: user,
				firstActivity: '55d933133191d9e31586df96'
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return experience.save(function(err) {
				console.log(err);
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without name', function(done) {
			experience.name = '';

			return experience.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) {
		Experience.remove().exec();
		User.remove().exec();

		done();
	});
});
