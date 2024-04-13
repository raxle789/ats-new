export function toDatetime(date: Date) {
    return date.toISOString().slice(0, 19).replace('T', ' ');
}

export function fileToBase64(file: File): Promise<string> {
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