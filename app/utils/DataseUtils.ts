export class DatabaseUtils {
    /**
     * 
     * @param values ITask object
     * @returns ordered values to insert into a database
     */
    prepareInsertValues(values: any, sessionId: string): string {
        let valuesString: string = '(';
        for(let value in values) {
            valuesString += `${value},`
        }

        valuesString += `${sessionId}`
        valuesString += ');'
        return valuesString;
    }

    /**
     * @param fields fields of a Database table
     * @param values values to update a record
     * @returns query update string
     */
    prepareUpdateValues(fields: Array<any>, values: any) {
        let valuesString: string = 'SET';
        for(let i = 0; i < fields.length; i++) {
            valuesString += `${fields[i]} = ${values[i]}, `;
        }
        valuesString.slice(0,-1);
        return valuesString;
    }

    /**
     * Deconstruction of a database model (entity / interface) to make an array
     * To update SQL queries
     * @param values Database model
     * @returns array of values from database model
     */
    extractValuesFromModel(values: any) {
        let valuesArray: Array<string> = [];

        for(const value in values) {
            valuesArray.push(value);
        }

        return valuesArray;
    }

    /**
     * Validate a resource in a database by a given ID
     * @param id model ID
     * @returns if the ID is valid or not
     */
    validateId(id: number): boolean {

        // TODO: implement database resource search by ID
        if(id <= 0) {
            return false;
        }
        return true;
    }
}