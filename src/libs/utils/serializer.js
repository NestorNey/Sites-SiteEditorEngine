export const serializeImage = (file) => {
    return new Promise((resolve, reject) => {
        let reader = new FileReader();
        
        reader.onload = function(event) {
            resolve(event.target.result);
        };

        reader.onerror = function(error) {
            reject(error);
        };

        reader.readAsDataURL(file);
    });
}