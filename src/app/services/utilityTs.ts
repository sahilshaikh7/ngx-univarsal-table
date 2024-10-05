
export class UtilityTs {

  public static stepList = [
    'Material Details',
    'Job Card',
    'Pre Service Inspection',
    'Tasks',
    'Estimation',
    'Service Inspection',
    'Work In Progress',
    'Final Inspection',
    'Invoice',
    // 'finalized'
  ]

  public static serviceIconList = [
    'bicycle',
    'book',
    'ticket',
    'checkbox',
    'calculator',
    'ticket',
    'receipt',
    'speedometer',
    // 'search',
    'newspaper',
  ]

  public static paymentModeOptions = [
    'Cash',
    'Online',
    'DD',
    'Cheque'
  ]

  public static consumerPaymentModeOptions = [
    'Cash',
    'Online',
    'DD/Cheque',
    'EMI'
  ]
  static generateId() {
    let chars: string = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 5; i > 0; --i) {
      result += chars[Math.floor(Math.random() * chars.length)];
    }
    return new Date().getTime() + '_' + result;
  }
  static clone(oldObject) {
    let newObject = JSON.parse(JSON.stringify(oldObject));
    newObject.id = newObject.active = newObject.last_update = newObject.last_sync = newObject.first_update = null;
    return newObject;
  }
  static randomNumber(min, max) {
    const r = Math.random() * (max - min) + min
    return Math.floor(r)
  }
  static randomChar(caps: boolean) {
    const r = Math.random() * (25 - 0) + 0;
    const index = Math.floor(r);
    let alpha = "abcdefghijklmnopqrstuvwxyz";
    if (caps) {
      alpha = alpha.toUpperCase();
    }
    return alpha[index];
  }
  static replaceObjectInList(localList: any[], object: any) {
    const abc = localList.find(x => x.id == object.id);
    if (abc != null) {
      localList.splice(localList.indexOf(abc), 1, object);
    } else {
      localList.unshift(object);
    }
  }
  static removeObjById(localList: any[], id: string) {
    const abc = localList.find(x => x.id == id);
    if (abc != null) {
      localList.splice(localList.indexOf(abc), 1);
    }
  }
  static getRandomInt(min, max): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  static creatingHash(map, list, key) {
    if (map == null) {
      map = new Map();
    }
    list.forEach(item => {
      map.set(item[key], item);
    });
    return map;
  }

  static getItemInList(dataList: any[], variable: string, value: string) {
    let found;
    if (dataList != null && variable != null) {
      dataList.forEach(x => {
        if (x[variable] == value) {
          found = x;
        }
      })
    }
    return found;
  }
  static getParent(mmList: any[], mm: any) {
    let parent: any;
    mmList.forEach((x) => {
      console.log(x.name + " : " + mm.parentId);
      if (x.name == mm.parentId) {
        console.log("match : " + x.name);
        parent = x;
      }
    });
    if (parent != null) {
      console.log("returning : " + parent.name);
    }
    return parent;
  }

  static creatingHashForListWithObject(map, list, key, key2) {
    if (map == null) {
      map = new Map();
    }
    if (list != null) {
      list.forEach(item => {
        const collection = map.get(item[key][key2]);
        if (collection == null) {
          map.set(item[key][key2], [item]);
        } else {
          collection.push(item);
        }
      });
    }
    return map;
  }

  static creatingHashForList(map, list, key) {
    if (map == null) {
      map = new Map();
    }
    if (list != null) {
      list.forEach(item => {
        const collection = map.get(item[key]);
        if (collection == null) {
          map.set(item[key], [item]);
        } else {
          collection.push(item);
        }
      });
    }
    return map;
  }

  static sortString(arr: string[], reverse?: boolean) {
    if (arr == null) {
      arr = [];
    }
    if (reverse === true) {
      arr.sort((a, b) => {
        if (b) {
          try {
            return b.localeCompare(a);
          } catch (error) {
            console.error(b, error);
          }
        }

      });
    } else {
      arr.sort((a, b) => {
        if (a) {
          try {
            // console.log(a);
            return a.localeCompare(b)
          } catch (error) {
            console.error(a, error);
          }
        }
      });
    }
  }

  static sortNumberArray(arr: number[], reverse?: boolean) {
    if (arr == null) {
      arr = [];
    }
    if (reverse === true) {
      arr.sort((a, b) => b - a);
    } else {
      arr.sort((a, b) => a - b);
    }
  }

  static sortStringInObject(arr: any[], value: string, reverse?: boolean) {
    if (arr == null) {
      arr = [];
    }

    arr.sort((a, b) => {
      if (value.includes(".")) {
        let values = value.split(".");
        return UtilityTs.stringCompare(a[values[0]], b[values[1]], reverse);
      } else {
        return UtilityTs.stringCompare(a[value], b[value], reverse);
      }
    });
  }

  static stringCompare(first, second, reverse) {
    if (first == null) {
      first = "";
    }
    if (second == null) {
      second = "";
    }
    if (reverse === true) {
      try {
        return second.localeCompare(first);
      } catch (error) {
        return (second + "").localeCompare((first + ""));
      }
    } else {
      try {
        return first.localeCompare(second);
      } catch (error) {
        return (first + "").localeCompare((second + ""));
      }
    }
  }

  static sortNumberInObject(arr: any[], value: string, reverse?: boolean) {
    if (arr == null) {
      arr = [];
    }
    try {
      arr.sort((a, b) => {
        if (a[value] == null) {
          a[value] = 0;
        }
        if (b[value] == null) {
          b[value] = 0;
        }
        if (reverse === true) {
          return b[value] - a[value]
        } else {
          return a[value] - b[value]
        }
      });
    } catch (error) {
      console.log(" error in sorting : " + error);
    }
  }

  public static getFileExtension(filename: string) {
    return filename.split('.').pop();
  }

  public static getPercentageColor(percentage1: number, lowerRange: number, higherRange: number, colorCount: number) {
    let color;

    let range = (100 / (colorCount - 1));
    let exist = parseInt(((percentage1 / range) + 1) + "");

    // let pivot = ((higherRange - lowerRange) * percentage1) / 100;
    let pivot = ((higherRange - lowerRange) / 100) * (colorCount - 1);

    let increasingValue = (lowerRange + ((percentage1 - (range * (exist - 1))) * pivot));
    let decreasingValue = (higherRange - ((percentage1 - (range * (exist - 1))) * pivot));
    switch ("" + exist) {
      case "1": {
        color = higherRange + ", " + increasingValue + ", " + lowerRange;
        break;
      }
      case "2": {
        color = decreasingValue + ", " + higherRange + ", " + lowerRange;
        break;
      }
      case "3": {
        color = lowerRange + ", " + higherRange + ", " + increasingValue;
        break;
      }
      case "4": {
        color = lowerRange + ", " + decreasingValue + ", " + higherRange;
        break;
      }
      case "5": {
        color = increasingValue + ", " + lowerRange + ", " + higherRange;
        break;
      }
      case "6": {
        color = higherRange + ", " + lowerRange + ", " + decreasingValue;
        break;
      }
    }
    return color;
  }


  public static valueOperation(object, filter, selectedValue) {
    let keys = filter.key.split(".");
    let value = "";
    if (keys.length > 0) {
      value = object[keys[0]];
    }
    if (keys.length > 1) {
      value = value[keys[1]];
    }
    if (keys.length > 2) {
      value = value[keys[2]];
    }
    if (value != null && value != "") {
      let returnvalue = UtilityTs.operate(value, filter.operator, selectedValue, filter.type);
      console.log(filter.type, value, filter.operator, selectedValue, returnvalue);
      return returnvalue;
    }
  }
  public static operate(value1, operator, value2, type) {
    if (type == "number") {
      value1 = parseInt(value1)
      value2 = parseInt(value2);
    }
    switch (operator) {
      case "==": return value1 == value2;
      case ">": return value1 > value2;
      case "<": return value1 < value2;
      case ">=": return value1 >= value2;
      case "<=": return value1 <= value2;
      case "like": return value1.indexOf(value2) > 0;
    }
  }

  private static getValue(unit, variable) {
    console.log(variable);
    if (unit == "Days") {
      let today = new Date();
      return Math.round((today.getTime() - variable.getTime()) / (86400000));
    } else {
      return variable;
    }
  }

  public static capitalizeFirstLetter(str: string): string {
    if (str.length === 0) return str;
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  public static capitalize(text, removeUnderscore?) {
    if (removeUnderscore) {
      text = text.replace("_", " ");
    }
    text = text.trim();
    let text2 = text.split(" ");
    let final = "";
    for (let text3 of text2) {
      text3 = text3[0].toUpperCase() + text3.slice(1).toLowerCase()
      final += text3 + " ";
    }
    return final.trim();
  }

  public static getAge(value) {
    if (value != null) {
      if (value.seconds) {
        value = new Date(value.seconds * 1000);
      } else if (value._seconds) {
        value = new Date(value._seconds * 1000);
      } else {
        if (typeof value === 'string' || value instanceof String) {
          value = new Date(value + "");
        } else {
          if (Number.isInteger(value)) {
            value = new Date(value);
          }
        }
      }

      let today = new Date();
      return Math.round((today.getTime() - value.getTime()) / (86400000 * 365));
    } else {
      return 0;
    }
  }

  static mergeArrays(array1: any[], array2: any[], key: string): any[] {
    const map = new Map<number, any>();

    // Add items from the first array to the map
    for (const item of array1) {
      map.set(item[key], { ...item });
    }

    // Merge items from the second array into the map
    for (const item of array2) {
      if (map.has(item[key])) {
        // Merge existing item
        map.set(item[key], { ...map.get(item[key]), ...item });
      } else {
        // Add new item
        map.set(item[key], { ...item });
      }
    }

    // Convert the map back to an array
    return Array.from(map.values());
  }
}
