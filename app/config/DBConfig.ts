import mysql, { Connection, Query  } from "mysql";

/**
 * Implements an 'only' database connection
 */
export default class DBConfig {
    private connection!: Connection;
    private static INSTANCE: DBConfig;

    /**
     * @returns An instance of DBConfig
     */
    public static getInstance(): DBConfig {
        if(!this.INSTANCE) {
            this.INSTANCE = new DBConfig();
        }
        return this.INSTANCE;
    }

    private constructor(
    ) {
        /**
         * SET CONNECTION CONFIG
         */
        if(this.connection === null || this.connection === undefined) {
            this.connection = mysql.createConnection({
                host: "localhost",
                port:  3306,
                database: "todo_app",
                user: "todo_app_user",
                password: "eBsr72)9"
            })
        }

        // connect to database
        this.connect();
    }

    /**
     * Implements the connection to the database with a given configuration
     * @returns connection result ( void() )
     */
    connect(): void {
        this.connection.connect();
    }

    /**
     * Execute a given SQL Query
     * @param sqlStrig SQL Query
     * @returns SQL Query execution result
     */
    query(sqlStrig: string): Promise<Query> {
        return new Promise((resolve, reject) =>  {
            try {
                return this.connection.query(sqlStrig, (error, results) => {
                    if(error){
                        return reject(`[DATABASE]: Error during query execution: ${error}`);
                    }
                    return resolve(results);
                });
            } catch(error) {
                return reject(error);
            }
        })
    }
}