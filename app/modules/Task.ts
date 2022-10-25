import DBConfig from "../config/DBConfig";
import { ITask } from "../models/ITask";
import { DatabaseUtils } from "../utils/DataseUtils";

export class Task {

    private db = DBConfig.getInstance();
    private utils = new DatabaseUtils();

    /**
     * @returns list of all tasks
     */
    getAll() {
        const selectQuery: string = 
        `SELECT t.id, t.title,s.title AS status
        FROM tasks t
        INNER JOIN status s ON s.id = t.status_id;`;
        return this.db.query(`${selectQuery};`);
    }

    /**
     * @param id task id
     * @returns one task for a given ID
     */
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

    /**
     * Create a task
     * @param task ITask instance
     * @returns created task
     */
    create(task: ITask) {
        const values = this.utils.prepareInsertValues(task);
        return this.db.query(`INSERT INTO tasks VALUES ${values}`);
    }

    /**
     * Update a task
     * @param id Task ID
     * @param task Task instance to be updated
     * @return Updated task
     */
    update(id: number, task: ITask) {
        if(!this.utils.validateId(id)) throw 'ID must be greater than zero';

        const fields = [
            'title', 
            'description',
            'deadline_date',
            'comments',
            'responsable_name',
            'tags'
        ];
        const values = this.utils.extractValuesFromModel(task);
        const setValues = this.utils.prepareUpdateValues(fields, values);
        return this.db.query(`UPDATE tasks ${setValues} WHERE id = ${id};`);
    }
    
    /**
     * @param id task id to be deleted
     */
    delete(id: number) {
        if(!this.utils.validateId(id)) throw 'ID must be greater than zero';
        return this.db.query(`DELETE FROM tasks WHERE id = ${id}`);
    }
}