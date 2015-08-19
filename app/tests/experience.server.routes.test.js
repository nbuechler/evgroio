'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Experience = mongoose.model('Experience'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, experience;

/**
 * Experience routes tests
 */
describe('Experience CRUD tests', function() {
	beforeEach(function(done) {
		// Create user credentials
		credentials = {
			username: 'username',
			password: 'password'
		};

		// Create a new user
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: credentials.username,
			password: credentials.password,
			provider: 'local'
		});

		// Save a user to the test db and create new Experience
		user.save(function() {
			experience = {
				name: 'Experience Name'
			};

			done();
		});
	});

	it('should be able to save Experience instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Experience
				agent.post('/experiences')
					.send(experience)
					.expect(200)
					.end(function(experienceSaveErr, experienceSaveRes) {
						// Handle Experience save error
						if (experienceSaveErr) done(experienceSaveErr);

						// Get a list of Experiences
						agent.get('/experiences')
							.end(function(experiencesGetErr, experiencesGetRes) {
								// Handle Experience save error
								if (experiencesGetErr) done(experiencesGetErr);

								// Get Experiences list
								var experiences = experiencesGetRes.body;

								// Set assertions
								(experiences[0].user._id).should.equal(userId);
								(experiences[0].name).should.match('Experience Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Experience instance if not logged in', function(done) {
		agent.post('/experiences')
			.send(experience)
			.expect(401)
			.end(function(experienceSaveErr, experienceSaveRes) {
				// Call the assertion callback
				done(experienceSaveErr);
			});
	});

	it('should not be able to save Experience instance if no name is provided', function(done) {
		// Invalidate name field
		experience.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Experience
				agent.post('/experiences')
					.send(experience)
					.expect(400)
					.end(function(experienceSaveErr, experienceSaveRes) {
						// Set message assertion
						(experienceSaveRes.body.message).should.match('Please fill Experience name');
						
						// Handle Experience save error
						done(experienceSaveErr);
					});
			});
	});

	it('should be able to update Experience instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Experience
				agent.post('/experiences')
					.send(experience)
					.expect(200)
					.end(function(experienceSaveErr, experienceSaveRes) {
						// Handle Experience save error
						if (experienceSaveErr) done(experienceSaveErr);

						// Update Experience name
						experience.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Experience
						agent.put('/experiences/' + experienceSaveRes.body._id)
							.send(experience)
							.expect(200)
							.end(function(experienceUpdateErr, experienceUpdateRes) {
								// Handle Experience update error
								if (experienceUpdateErr) done(experienceUpdateErr);

								// Set assertions
								(experienceUpdateRes.body._id).should.equal(experienceSaveRes.body._id);
								(experienceUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Experiences if not signed in', function(done) {
		// Create new Experience model instance
		var experienceObj = new Experience(experience);

		// Save the Experience
		experienceObj.save(function() {
			// Request Experiences
			request(app).get('/experiences')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Experience if not signed in', function(done) {
		// Create new Experience model instance
		var experienceObj = new Experience(experience);

		// Save the Experience
		experienceObj.save(function() {
			request(app).get('/experiences/' + experienceObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', experience.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Experience instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Experience
				agent.post('/experiences')
					.send(experience)
					.expect(200)
					.end(function(experienceSaveErr, experienceSaveRes) {
						// Handle Experience save error
						if (experienceSaveErr) done(experienceSaveErr);

						// Delete existing Experience
						agent.delete('/experiences/' + experienceSaveRes.body._id)
							.send(experience)
							.expect(200)
							.end(function(experienceDeleteErr, experienceDeleteRes) {
								// Handle Experience error error
								if (experienceDeleteErr) done(experienceDeleteErr);

								// Set assertions
								(experienceDeleteRes.body._id).should.equal(experienceSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Experience instance if not signed in', function(done) {
		// Set Experience user 
		experience.user = user;

		// Create new Experience model instance
		var experienceObj = new Experience(experience);

		// Save the Experience
		experienceObj.save(function() {
			// Try deleting Experience
			request(app).delete('/experiences/' + experienceObj._id)
			.expect(401)
			.end(function(experienceDeleteErr, experienceDeleteRes) {
				// Set message assertion
				(experienceDeleteRes.body.message).should.match('User is not logged in');

				// Handle Experience error error
				done(experienceDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Experience.remove().exec();
		done();
	});
});