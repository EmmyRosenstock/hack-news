import { useMemo } from 'react';

const intervals = {
  'year': 31536000,
  'month': 2592000,
  'week': 604800,
  'day': 86400,
  'hour': 3600,
  'minute': 60,
  'second': 1
};

export const useDateAgo = (time: string | undefined) => {

  return useMemo(() => {

    // @ts-ignore
    const seconds = Math.floor((+new Date() - +new Date(time)) / 1000);
    if (seconds < 29) { 
      return 'Right now';
    }
    let counter;
    for (const i in intervals) {
      // @ts-ignore
      counter = Math.floor(seconds / intervals[i]);
      if (counter > 0) {
        if (counter === 1) {
          return counter + ' ' + i + ' ago'; 
        } else {
          return counter + ' ' + i + 's' + ' ago'; 
        }
      }
    }

    return time;
  } , [ time ]);

};