class Util {
    static capitalize(word) {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }

    static concatArray(stringArray) {
        let concattedString = "";
        stringArray.forEach(element => {
            concattedString += `${element} `;
        });

        return concattedString;
    }
}
module.exports = Util;