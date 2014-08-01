describe('jTextShorten', function () {

  describe('Single Element Initialization', function () {
    var elem;

    beforeEach(function() {
      loadFixtures("single_element.html");
      element = $('.example');
    });

    describe('Initialization', function() {
      describe('Default settings', function() {
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
            expect(keys).toContain('lessText');
            expect(keys).toContain('limitChars');
            expect(keys).toContain('moreText');
            expect(keys).not.toContain('helloworld');
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

      describe('Override default settings if options passed in', function() {
        var data;

        beforeEach(function() {
          $(element).shortened({
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
            expect(keys).toContain('lessText');
            expect(keys).toContain('limitChars');
            expect(keys).toContain('moreText');
            expect(keys).not.toContain('helloworld');
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
        expect(element).toHaveClass('ui-shortened');
      });
    });

    describe('Destroy', function() {
      var orig_element;

      beforeEach(function() {
        $(element).shortened();
        orig_element = $(element).shortened('destroy');
      });

      it('should remove default class added', function() {
        expect(orig_element).not.toHaveClass('ui-shortened');
      });

      it('should have zero html tags added', function() {
        expect(orig_element.siblings('.ui-see_more')).toHaveLength(0);
      });

      it('should remove retained settings in data-attribute', function() {
        expect(orig_element.data('shortened')).toBeUndefined();
      });
    });

    describe('Methods', function() {
      var data;

      beforeEach(function() {
        $(element).shortened();
      });

      it('should not return null/undefined for init method', function() {
        data = $(element).shortened('init');
        expect(data).not.toBe(undefined);
      });

      it('should not return null/undefined for destroy method', function() {
        data = $(element).shortened('destroy');
        expect(data).not.toBe(undefined);
      });

      it('should return undefined for non-existing method', function() {
        expect( function(){$(element).shortened('create')}).
          toThrow(new Error("Method create does not exist on jQuery.shortened"));
      });
    });

    it('support single element', function() {
      $('.example').shortened();

      expect($('.example')).toHaveLength(1);
      expect($('.example').data('shortened')).toHaveLength(1);
    });

    describe('Limit Characters', function () {
      it('should limit character of text as per inputs', function() {
        var data = $(element).shortened({limitChars: 100});
        expect(data.text().length).toEqual(100);
      });
    });
  });

  describe('Initialization on excluded tags should not be allowed', function () {

    it('should return error for img tag', function() {
      var tagElement = $(document.createElement( "img" )).addClass("example");
      expect( function(){$(tagElement).shortened()} ).
        toThrow(new Error("jQuery.shortened cannot be applied on IMG tag."));
    });

    it('should return error for select tag', function() {
      var tagElement = $(document.createElement( "select" )).addClass("example");
      expect( function(){$(tagElement).shortened()} ).
        toThrow(new Error("jQuery.shortened cannot be applied on SELECT tag."));
    });

    it('should return error for input tag', function() {
      var tagElement = $(document.createElement( "input" )).addClass("example");
      expect( function(){$(tagElement).shortened()} ).
        toThrow(new Error("jQuery.shortened cannot be applied on INPUT tag."));
    });

    it('should return error for iframe tag', function() {
      var tagElement = $(document.createElement( "iframe" )).addClass("example");
      expect( function(){$(tagElement).shortened()} ).
        toThrow(new Error("jQuery.shortened cannot be applied on IFRAME tag."));
    });
  });
});
