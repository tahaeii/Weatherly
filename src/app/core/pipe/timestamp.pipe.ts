import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timestamp'
})
export class TimestampPipe implements PipeTransform {

  // Transform Method To Convert Unix Timestamp Into A Formatted Time String
  transform(value: number, format: string = 'HH:mm'): string {
    // Convert Timestamp (Seconds) To Milliseconds And Format It To Persian Time Format
    return new Date(value * 1000).toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' });
  }

}


