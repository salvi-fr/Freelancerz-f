
export type IResponse = Record<string, any>;
export interface IResponsePaging {
    totalData: number;
    totalPage: number;
    currentPage: number;
    perPage: number;
    data: Record<string, any>[];
}
export interface IStats {
    totalUsers: number,
    totalJobs?: number,
    totalActiveJob?: number,
    totalJob?: number,
    totalInstructor?: number,
    totalAdmin?: number,
    totalStudent?: number,
    totalRevenue?: number,
}
export interface IStack {
    id: string;
    tech: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface IJobCreate {
    title: string,
    price: number,
    yearsOfExperience: string,
    jobType: string,
    status: string,
    startDate: Date,
    endDate: Date,
    description: string,
    tag: string,  
}
export interface IJobUpdate {
    title?: string,
    price?: number,
    yearsOfExperience?: string,
    jobType?: string,
    startDate?: Date,
    endDate?: Date,
    description?: string,
    tag?: string,
    
}
export interface IJob {
    id: string;
    title: string,
    price: number,
    yearsOfExperience: string,
    jobType: string,
    status: string,
    type:string,
    stacks: IStack[],
    startDate: Date,
    endDate: Date,
    description: string,
    clientId: number,
    stackId: string,
    createdAt: Date;
    updatedAt: Date;
}
export interface IApplicationCreate {
    id: string;

}
export interface IApplicationUpdate {
    id: string;
}
export interface IApplication {
    id: string;
    jobId: string;
    applicantId: string ;
    status: string;
    users: IUser[];
    job: IJob | string;
    recommendation: string;
    createdAt: Date;
    updatedAt: Date;
}
export interface IComplainCreate {
    complainer: string | IUser;
    complainee: string | IUser;
    description: string;
    complaint_typeId: number,
}
export interface IComplainUpdate {
    complainer?: string | IUser;
    complainee?: string | IUser;
    description?: string;
    complaint_typeId?: number,
}
export interface IComplain {
    id: string;
    complainer: string | IUser;
    complainee: string | IUser;
    description: string;
    complaint_typeId: number,
    createdAt: Date;
    updatedAt: Date;
}
export interface IUserCreate {
    phoneNumber: string,
    linkedIn?: string,
    githubUsername?: string,
    status: string,
    userTypeId: number,
    stackId?: string,
    getEmailNotification?: boolean,
    firstName: string;
    lastName: string;
    email: string;
}

export interface IUserLogin {
    password: string;
    email: string;
}

export interface IUserUpdate {
    phoneNumber?: string,
    linkedIn?: string,
    githubUsername?: string,
    status?: string,
    userTypeId?: number,
    stackId?: string,
    getEmailNotification?: boolean,
    firstName?: string;
    lastName?: string;
}
export interface IUser {

    phoneNumber: string,
    linkedIn: string,
    githubUsername: string,
    status: string,
    userTypeId: number,
    stackId: string,
    getEmailNotification: boolean,
    id: string;
    firstName: string;
    lastName?: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
}