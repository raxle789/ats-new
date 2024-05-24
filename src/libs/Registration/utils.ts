import { File } from "buffer";
import { DOCUMENTS_REGISTER } from "../validations/Register";

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

        reader.readAsDataURL(file as Blob);
    });
};

interface TypeDocuments {
  profilePhoto: File;
  curriculumVitae: File;
};

export type TypeTransformedDocument = {
  original_name: string;
  byte_size: number;
  file_base: string;
};

export type zodErrors = { [key: string]: string[] }

export async function ManipulateDocuments(documents: TypeDocuments): Promise<TypeTransformedDocument[] | zodErrors> {
  const validateDocuments = DOCUMENTS_REGISTER.safeParse(documents);
  if(!validateDocuments.success) {
    return validateDocuments.error.flatten().fieldErrors;
  };
  let transformedDocuments: TypeTransformedDocument[] = [];
  for(const key in documents) {
    const fileBase64 = await fileToBase64(documents[key as keyof TypeDocuments]);
    transformedDocuments.push({
      original_name: documents[key as keyof TypeDocuments].name,
      byte_size:  documents[key as keyof TypeDocuments].size,
      file_base: fileBase64 as string
    });
  };
  return transformedDocuments;
};

export function transformToArrayOfObject(nestedObject: any) {
    if (nestedObject == null || Object.keys(nestedObject).length === 0) {
      // Handle the case when nestedObject is undefined or null
      return [];
    }
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
