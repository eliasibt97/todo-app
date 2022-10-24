import DBConfig from "../config/DBConfig";
import { ITask } from "../models/ITask";

export class Task {

    private db = DBConfig.getInstance();

    getAll() {
        const selectQuery: string = 
        `SELECT t.id, t.title,s.title AS status
        FROM tasks t
        INNER JOIN status s ON s.id = t.status_id;`;
        return this.db.query(`${selectQuery};`);
    }

    getOne(id: number) {
        const selectQuery: string = 
        `SELECT 
            t.id, t.title,
            t.description, t.deadline_date,
            t.comments, t.responsable_name,
            t.tags, s.title AS status
        FROM tasks t 
        INNER JOIN status s ON s.id = t.status_id
        WHERE t.id = ${id};`;
        return this.db.query(`${selectQuery}`);
    }

    create(task: ITask) {
        const values: string = this.setValues(task);
        return this.db.query(`INSERT INTO tasks VALUES ${values}`);
    }

    update(task: ITask) {
    }
    
    delete(id: number) {

    }

    setValues(values: ITask): string {
        let valuesString: string = '(';
        for(let value in values) {
            valuesString += `${value},`
        }

        valuesString.slice(0,-1);
        valuesString += ');'
        return valuesString;
    }


}