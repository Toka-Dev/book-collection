/**
 * FormValidation for checking a form
 */

/**
 * Useful to checked the validity of an input
 * 
 * @param {string} inputString, string to be checked
 * @param {number} minLength, min length of the inputString
 * @param {number} maxLength, max length of the inputString
 * @returns result of the validation
 */
export default function checkInputString(inputString, minLength = 1, maxLength = 256) {

    const validationResult = {
            errorExist: false,
            errorMessage: ''
    }
    
    if(inputString === "" || inputString === null){
        validationResult.errorExist = true;
        validationResult.errorMessage = 'Dies ist ein Pflichtfeld!';
    } else if (inputString.length < minLength) {
        validationResult.errorExist = true;
        validationResult.errorMessage = `Die Mindestlänge beträgt ${minLength} Zeichen!`
    } else if (inputString.length > maxLength) {
        validationResult.errorExist = true;
        validationResult.errorMessage = `Die Maximallänge beträgt ${maxLength} Zeichen!`
    }

    return validationResult;
}

/**
 * Useful to clean up incorrect entries
 * 
 * @param {array} authorsArray, array to be cleared
 * @returns cleaned array of authors
 */
export function clearEmptyAuthor(authorsArray) {
    const copyAuthorsArray = [...authorsArray];
    for (let i = 0; i < copyAuthorsArray.length; i++) {
        const author = copyAuthorsArray[i];
        if(author.trim().length < 1) {
            copyAuthorsArray.splice(i, 1);
            //Durch splice rücken nachfolgende indizes einen auf.
            //Deshalb muss i einen zurückgesetzt werden,
            //da beim nächsten Schleifendurchlauf i hochgezählt wird und
            //sonst einen vorgerückten index überspringt
            //Bsp. Geprüft wird der Wert von Index 2.
            //Dieser trifft zu und wird mit splice entfernt 
            //Nach splice ist der alte Wert vom Index 3 nun an Index 2
            //Deshalb muss im nächsten Schleifendurchlauf nochmal index 2 geprüft werden
            i--;
        }  
    }

    if (copyAuthorsArray.length === 0) {
        copyAuthorsArray.push('');
    }

    return copyAuthorsArray;
}

/**
 * Useful to clean up incorrect entries
 * 
 * @param {array} thumbnailArray, array to be cleared
 * @returns cleaned array of thumbnails
 */
export function clearEmptyThumbnail(thumbnailArray) {
    const copyThumbnailArray = [...thumbnailArray];
    for (let i = 0; i < copyThumbnailArray.length; i++) {
        const thumbnail = copyThumbnailArray[i];
        if(thumbnail.title.trim().length < 1 && thumbnail.url.trim().length < 1) {
            copyThumbnailArray.splice(i, 1);
            //Durch splice rücken nachfolgende indizes einen auf.
            //Deshalb muss i einen zurückgesetzt werden,
            //da beim nächsten Schleifendurchlauf i hochgezählt wird und
            //sonst einen vorgerückten index überspringt
            //Bsp. Geprüft wird der Wert von Index 2.
            //Dieser trifft zu und wird mit splice entfernt 
            //Nach splice ist der alte Wert vom Index 3 nun an Index 2
            //Deshalb muss im nächsten Schleifendurchlauf nochmal index 2 geprüft werden
            i--;
        }   
    }
    
    if (copyThumbnailArray.length === 0) {
        copyThumbnailArray.push({title:'', url:''});
    }

    return copyThumbnailArray;
}