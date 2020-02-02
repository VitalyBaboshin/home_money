import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'wfmFilter'
})
export class FilterPipe implements PipeTransform {
  transform(items: any, value: string, field: string): any {
    // ничего не вбито в пустую строку и айтемс === 0,
    // то не нужно фильтровать
    if (items.length === 0 || !value) {
      return items;
    }
    return items.filter((i) => {
      // глубокая копия элемента i
      const t  = Object.assign({}, i);
      // если является числом. то переводим данную переменную в строку
      if (!isNaN(t[field])) {
        t[field] += '';
      }

      if (field === 'type' ) {
        t[field] = t[field] === 'income' ? 'доход' : 'расход';
      }

      if (field === 'category') {
        t[field]  = t['catName'];
      }
      return t[field].toLowerCase().indexOf(value.toLowerCase()) !== -1;
    });
  }
}
