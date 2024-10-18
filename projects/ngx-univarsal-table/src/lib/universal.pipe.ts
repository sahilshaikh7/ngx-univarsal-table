import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'universal',
  standalone: true
})
export class UniversalPipe implements PipeTransform {

  transform(value: any) {
    if (value && value != 0) {
      if (typeof value === 'string' || value instanceof String || Array.isArray(value)) {
        return value;
      }
      if (typeof value == 'number') {
        const rounded = Math.round(value * 100) / 100;
        if (rounded > 0) {
          let x = rounded.toFixed(2);

          x = x.toString();
          let afterPoint = '';
          if (x.indexOf('.') > 0) {
            afterPoint = x.substring(x.indexOf('.'), x.length);
          }

          const y = Math.round(parseFloat(x)) + '';
          let lastThree = y.substring(y.length - 3);
          const otherNumbers = y.substring(0, y.length - 3);
          if (otherNumbers !== '') {
            lastThree = ',' + lastThree;
          }
          return (
            otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',') +
            lastThree
            // + afterPoint
          );
        } else {
          let x = rounded.toFixed(2);
          x = x.toString();
          let afterPoint = '';
          if (x.indexOf('.') > 0) {
            afterPoint = x.substring(x.indexOf('.'), x.length);
          }

          const y = Math.round(parseFloat(x)) + '';
          let lastThree = y.substring(y.length - 3);
          const otherNumbers = y.substring(0, y.length - 3);
          if (otherNumbers !== '') {
            lastThree = ',' + lastThree;
          }
          return (
            otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',') +
            lastThree
            // + afterPoint
          );
          // return rounded.toFixed(2);
        }

        // return parseFloat(rounded.toFixed(1))
      }
      if (value.seconds) {
        let newDate = new Date(value.seconds * 1000);
        return newDate.getDate() + "" + this.getMonthString("" + (newDate.getMonth() + 1)) + " " + this.withZero(newDate.getHours()) + ":" + this.withZero(newDate.getMinutes());
      }
       if (value._seconds) {
        let newDate = new Date(value._seconds * 1000);
        return newDate.getDate() + "" + this.getMonthString("" + (newDate.getMonth() + 1)) + " " + this.withZero(newDate.getHours()) + ":" + this.withZero(newDate.getMinutes());
      } 
        // return value.getDate() + "/" + (value.getMonth() + 1) + "/" + value.getFullYear() + " & " + (value.getHours() % 12 || 12).toString().padStart(2, '0') + ":" + value.getMinutes().toString().padStart(2, '0') + " " + (value.getHours() >= 12 ? 'PM' : 'AM');
      
    }
    else {
      return "-";
    }


  }

  withZero(time) {
    return time > 9 ? time : "0" + time;
  }
  getMonthString(month: string) {
    switch (parseInt(month)) {
      case 1:
        return ' Jan ';
      case 2:
        return ' Feb ';
      case 3:
        return ' Mar ';
      case 4:
        return ' Apr ';
      case 5:
        return ' May ';
      case 6:
        return ' Jun ';
      case 7:
        return ' Jul ';
      case 8:
        return ' Aug ';
      case 9:
        return ' Sep ';
      case 10:
        return ' Oct ';
      case 11:
        return ' Nov ';
      case 12:
        return ' Dec ';
    }
  }

}
