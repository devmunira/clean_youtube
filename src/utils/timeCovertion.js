import moment from 'moment-duration-format'


export const YTDurationToSeconds = (duration) => {
    var match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
  
    match = match.slice(1).map(function(x) {
      if (x != null) {
          return x.replace(/\D/, '');
      }
    });
  
    var hours = (parseInt(match[0]) || 0);
    var minutes = (parseInt(match[1]) || 0);
    var seconds = (parseInt(match[2]) || 0);
  
    var sec =  hours * 3600  + minutes * 60 + seconds;

    return new Date(sec * 1000).toISOString().slice(11, 19);

  }