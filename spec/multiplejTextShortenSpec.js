describe('multiplejTextShorten', function () {
  var element;

  beforeEach(function() {
    loadFixtures("multiple_elements.html");
    element = $('.example');
  });

  describe('Support multiple element', function() {
    var orig_element;

    beforeEach(function() {
      $(element).shortened();
      orig_element = $(element).data('shortened');
    });

    it('should add default class for all elements', function() {
      expect(element).toHaveClass('ui-shortened');
      expect($('.example')).toHaveLength(3);
      expect($('.example').siblings('.ui-see_more')).toHaveLength(3);
    });

    it('should add settings in data-attribute for all elements', function() {
      expect(orig_element.lessText).toEqual('See less');
      expect(orig_element.moreText).toEqual('See more');
      expect(orig_element.limitChars).toEqual(300);
      expect($('.example')).toHaveLength(3);
      expect($('.example').siblings('.ui-see_more')).toHaveLength(3);
    });

    it('should have html tags for all elements', function() {
      expect($('.example')).toHaveLength(3);
      expect($('.example').siblings('.ui-see_more')).toHaveLength(3);
      //expect(element.siblings('.ui-see_more')).toHaveLength(1);
      //expect(element.siblings('.ui-see_more')).toHaveText('See more');
    });
  }); 
});