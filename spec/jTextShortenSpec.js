describe('jTextShorten', function () {
    var elem;

    beforeEach(function() {
        var fixture = setFixtures(
          "<div class = 'example'>" +
          "Jasmine is a behavior-driven development framework for" +
          "testing JavaScript code. It does not depend on any other" +
          "JavaScript frameworks. It does not require a DOM." +
          " And it has a clean, obvious syntax so that you can easily write tests. " +
          " This guide is running against Jasmine version 2.0.0. Specs are defined by" +
          " calling the global Jasmine function it, which, like describe takes a string and a function."+
          " The string is the title of the spec and the function is the spec, or test." +
          "</div>"
        );
        element = fixture.find('.example');
    });

    describe('default settings', function() {
      var data;

      beforeEach(function() {
        $(element).shortened();
        data = $(element).data('shortened');
      });

      it('cached values should not be null/undefined', function() {
        expect(data).not.toBeNull();
        expect(data).not.toBeUndefined();
      });

      it('key elements in data attribute', function() {
        var keys = Object.keys(data);

        expect(keys.length).toEqual(4);
        expect(keys).toContain('elementIdentifier');
        expect(keys).toContain('lessText');
        expect(keys).toContain('limitChars');
        expect(keys).toContain('moreText');
        expect(keys).not.toContain('helloworld');
      });

      it('#elementIdentifier', function() {
        expect(data.elementIdentifier).toEqual('ui-shortened-identifier');
      });

      it('#limitChars', function() {
        expect(data.limitChars).toEqual(300);
      });

      it('#lessText', function() {
        expect(data.lessText).toEqual('See less');
      });

      it('#moreText', function() {
        expect(data.moreText).toEqual('See more');
      });
    });

    describe('should override default settings if options passed in', function() {
      var data;

      beforeEach(function() {
        $(element).shortened({
          elementIdentifier: 'ui-sample-identifier',
          lessText:          'View less',
          limitChars:        100,
          moreText:          'View more'
        });
        data = $(element).data('shortened');
      });

      it('cached values should not be null/undefined', function() {
        expect(data).not.toBe(null);
        expect(data).not.toBe(undefined);
      });

      it('key elements in data attribute', function() {
        var keys = Object.keys(data);

        expect(keys.length).toEqual(4);
        expect(keys).toContain('elementIdentifier');
        expect(keys).toContain('lessText');
        expect(keys).toContain('limitChars');
        expect(keys).toContain('moreText');
        expect(keys).not.toContain('helloworld');
      });

      it('#elementIdentifier', function() {
        expect(data.elementIdentifier).toEqual('ui-sample-identifier');
      });

      it('#limitChars', function() {
        expect(data.limitChars).toEqual(100);
      });

      it('#lessText', function() {
        expect(data.lessText).toEqual('View less');
      });

      it('#moreText', function() {
        expect(data.moreText).toEqual('View more');
      });
    });

    it('should add custom classes to the element', function() {
        $(element).shortened();
        expect(element).toHaveClass('ui-shortened ui-shortened-identifier');
    });
});
