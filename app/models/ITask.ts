export interface ITask {
    id?: number;
    title: string;
    description: string;
    deadline_date: Date;
    comments: string;
    responsable_name: string;
    tags: string;
    status: string;
}