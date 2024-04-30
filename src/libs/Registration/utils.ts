export function toDatetime(date: Date) {
    return date.toISOString().slice(0, 19).replace('T', ' ');
}

export function fileToBase64(file: File | Blob): Promise<string | Buffer> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        
        reader.onload =() => {
            if(typeof reader.result == 'string') {
                resolve(reader.result);
            }else {
                reject(new Error('Failed to read file as Base64'));
            }
        };

        reader.onerror = () => {
            reject(reader.error);
        };

        reader.readAsDataURL(file);
    });
};

export function transformToArrayOfObject(nestedObject: any) {
    const arrayOfObject = Object.keys(nestedObject).map(key => nestedObject[key]);

    return arrayOfObject;
};

export function transformStringToArray(stringArray: string) {
    const parseString = stringArray.replace(/'/g, '"');
    console.log('parsed string:', parseString);
    const array = JSON.parse(parseString);
    return array;
};

interface PlainObject {
  [key: string]: any;
}

export function convertToPlainObject(obj: any): PlainObject {
    if (!obj || typeof obj !== 'object') {
        return obj;
    }

  // If obj has a toJSON method, use it
    if (typeof obj.toJSON === 'function') {
        return obj.toJSON();
    }

  // If obj is an array, map its elements
    if (Array.isArray(obj)) {
        return obj.map(convertToPlainObject);
    }

  // If obj is a plain object, convert its properties
    if (Object.prototype.toString.call(obj) === '[object Object]') {
        const result: PlainObject = {};
        for (let key in obj) {
        result[key] = convertToPlainObject(obj[key]);
        }
        return result;
    }

    // If obj is neither an array nor a plain object, return it as is
    return obj;
};
