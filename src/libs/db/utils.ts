// Crude implementation of a custom object stringifier which uses single quotes instead of double quotes. It also escapes single quotes in string values.
// Credit to the code for this from this article by Juan Dalmasso titled `Creating your own simplified implementation of JSON.stringify()`
// https://levelup.gitconnected.com/creating-your-own-simplified-implementation-of-json-stringify-ed8e50b9144a
export class utils {

  static stringify(value) {
    const lastKey = Object.keys(value).pop();
    let objString = '';
    if (typeof value === 'object') {
      objString += '{';
      for (const key in value) {
        objString += `'${key}':${this.stringify(value[key])}`;
        if (key !== lastKey) {
          objString += ',';
        }
      }
      objString += '}';
    } else if (typeof value === 'string') {
      objString += `'${value.replace(/'/g, "''")}'`;
    } else if (typeof value === 'number') {
      objString += `${value}`;
    }
    return objString;
  }

  static dateFormat(date) {
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hour = date.getHours();
    let minute = date.getMinutes();
    let second = date.getSeconds();

    month = month >= 10 ? month : '0' + month;
    day = day >= 10 ? day : '0' + day;
    hour = hour >= 10 ? hour : '0' + hour;
    minute = minute >= 10 ? minute : '0' + minute;
    second = second >= 10 ? second : '0' + second;

    return date.getFullYear() + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
  }
}
