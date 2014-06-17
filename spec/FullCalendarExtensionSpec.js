describe('FullCalendarExtension', function(){
  describe('call to .getEventsToUpdate', function(){
    it('should filter and return events to update', function(){
      var events  = [
                  {id: 1, name: 'test event 1'},
                  {id: 2, name: 'test event 2'},
                  {id: 3, name: 'test event 3'},
                ];
      var existingEventIds = [1, 2];
      expect(FullCalendarExtension
              .getEventsToUpdate(events, existingEventIds))
            .toEqual([{id: 3, name: 'test event 3'}]);

    });
  });
});

// describe('FullCalendarExtension', function(){
//   var fullCalendarExtension = new FullCalendarExtension();
  
//   beforeEach(function(){
//     this.events  = [
//             {id: 1, name: 'test event 1'},
//             {id: 2, name: 'test event 2'},
//             {id: 3, name: 'test event 3'},
//           ];
//   });

//   describe('call to .getEventsToUpdate', function(){
//     it('should filter and return events to update', function(){
//       var existingEventIds = [1, 2];
//       expect(fullCalendarExtension
//               .getEventsToUpdate(this.events, existingEventIds))
//             .toEqual([{id: 3, name: 'test event 3'}]);

//     });
//   });
// });