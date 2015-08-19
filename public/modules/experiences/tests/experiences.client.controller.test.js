'use strict';

(function() {
	// Experiences Controller Spec
	describe('Experiences Controller Tests', function() {
		// Initialize global variables
		var ExperiencesController,
		scope,
		$httpBackend,
		$stateParams,
		$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Experiences controller.
			ExperiencesController = $controller('ExperiencesController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Experience object fetched from XHR', inject(function(Experiences) {
			// Create sample Experience using the Experiences service
			var sampleExperience = new Experiences({
				name: 'New Experience',
				privacy: 0,
				seconds: 0
			});

			// Create a sample Experiences array that includes the new Experience
			var sampleExperiences = [sampleExperience];

			// Set GET response
			$httpBackend.expectGET('experiences').respond(sampleExperiences);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.experiences).toEqualData(sampleExperiences);
		}));

		it('$scope.findOne() should create an array with one Experience object fetched from XHR using a experienceId URL parameter', inject(function(Experiences) {
			// Define a sample Experience object
			var sampleExperience = new Experiences({
				name: 'New Experience',
				privacy: 0,
				seconds: 0
			});

			// Set the URL parameter
			$stateParams.experienceId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/experiences\/([0-9a-fA-F]{24})$/).respond(sampleExperience);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.experience).toEqualData(sampleExperience);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Experiences) {
			// Create a sample Experience object
			var sampleExperiencePostData = new Experiences({
				name: 'New Experience',
				privacy: 0,
				seconds: 0
			});

			// Create a sample Experience response
			var sampleExperienceResponse = new Experiences({
				_id: '525cf20451979dea2c000001',
				name: 'New Experience',
				privacy: 0,
				seconds: 0
			});

			// Fixture mock form input values
			scope.name = 'New Experience';

			// Set POST response
			$httpBackend.expectPOST('experiences', sampleExperiencePostData).respond(sampleExperienceResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Experience was created
			expect($location.path()).toBe('/experiences/' + sampleExperienceResponse._id);
		}));

		it('$scope.update() should update a valid Experience', inject(function(Experiences) {
			// Define a sample Experience put data
			var sampleExperiencePutData = new Experiences({
				_id: '525cf20451979dea2c000001',
				name: 'New Experience',
				privacy: 0,
				seconds: 0
			});

			// Mock Experience in scope
			scope.experience = sampleExperiencePutData;

			// Set PUT response
			$httpBackend.expectPUT(/experiences\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/experiences/' + sampleExperiencePutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid experienceId and remove the Experience from the scope', inject(function(Experiences) {
			// Create new Experience object
			var sampleExperience = new Experiences({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Experiences array and include the Experience
			scope.experiences = [sampleExperience];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/experiences\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleExperience);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.experiences.length).toBe(0);
		}));
	});
}());
