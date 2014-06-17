FullCalendarExtension = {
  /**
   * @param {events}            All events to be refreshed on calendar (superset)
   * @param {existingEventIds}  Events which are already exist on calendar (subset)
   * @return {newList}          List of events which are not on calendar and 
   *                            need to be shown (superset - subset)
   */
  getEventsToUpdate: function(events, existingEventIds){
    var newList = [];
    $.each(events, function(index, val){
      if($.inArray(val.id, existingEventIds) == -1 ){
        newList.push(val);
      }
    });
    return newList;
  }
}

// function FullCalendarExtension(){

// } 

/**
 * @param {events}            All events to be refreshed on calendar (superset)
 * @param {existingEventIds}  Events which are already exist on calendar (subset)
 * @return {newList}          List of events which are not on calendar and 
 *                            need to be shown (superset - subset)
 */
// FullCalendarExtension.prototype.getEventsToUpdate = function(events, existingEventIds){
//   var newList = [];
//   $.each(events, function(index, val){
//     if($.inArray(val.id, existingEventIds) == -1 ){
//       newList.push(val);
//     }
//   });
//   return newList;
// }
