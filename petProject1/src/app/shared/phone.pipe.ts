import {Pipe, PipeTransform} from '@angular/core';

// Custom pipe for feature
@Pipe({
    name: 'phoneSearch'
})
export class PhonePipe implements PipeTransform {
    transform(phones: string[], value: string): any {
        return phones.filter((phone) => phone.includes(value));
    }
}