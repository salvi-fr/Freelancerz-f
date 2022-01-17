
export type IResponse = Record<string, any>;
export interface IResponsePaging {
    totalData: number;
    totalPage: number;
    currentPage: number;
    perPage: number;
    data: Record<string, any>[];
}
export interface IStats{
    totalUsers: number,
    totalCourses?: number,
    totalActiveCourse?: number,
    totalPayment?: number,
    totalInstructor?: number,
    totalAdmin?: number,
    totalStudent?: number,
    totalRevenue?: number,
}
export interface IAnnouncementCreate  {
    title: string;
    description?: string;
    type?: string;
    activated?: boolean;
    content: string;
}
export interface IAnnouncementUpdate  {
    title?: string;
    description?: string;
    type?: string;
    activated?: boolean;
    content?: string;
}
export interface IAnnouncement  {
    _id:string; avatar?:string;
    created_by: IUser|string;
    title: string;
    slug: string;
    description?: string;
    type?: string;
    activated: boolean;
    content: string;
    createdAt:Date;
    updatedAt:Date;
}

export interface IComplainCreate  {
    title: string;
    description?: string;
    content: string;
}
export interface IComplainUpdate  {
    title?: string;
    description?: string;
    content?: string;
}
export interface IComplain {
    _id:string; avatar?:string;
    created_by: IUser|string;
    title: string;
    slug: string;
    description?: string;
    content: string;
    createdAt:Date;
    updatedAt:Date;
}
export interface ITrainingCreate  {
    speakers: [string];
    title: string;
    description?: string;
    content: string;
    activated?: boolean;
    tags?: string[];
    happen_from: Date;
    happen_to: Date;
}
export interface ITrainingUpdate  {
    title?: string;
    speakers: [string];
    description?: string;
    content?: string;
    activated?: boolean;
    tags?: string[];
    happen_from?: Date;
    happen_to?: Date;
}
export interface ITraining {
   
    happen_from: Date;
    happen_to: Date;
    _id:string; avatar?:string;
    created_by: IUser|string;
    speakers: [IUser|string];
    title: string;
    slug: string;
    description?: string;
    content: string;
    activated?: boolean;
    tags?: string[];
    createdAt:Date;
    updatedAt:Date;
}
export interface IArticleCreate  {
    title: string;
    description?: string;
    content: string;
    activated?: boolean;
    tags?: string[];
}
export interface IArticleUpdate  {
    title?: string;
    description?: string;
    content?: string;
    activated?: boolean;
    tags?: string[];
}
export interface IArticle {
    _id:string; 
    avatar?:string;
    created_by: IUser|string;
    title: string;
    slug: string;
    description?: string;
    content: string;
    activated?: boolean;
    tags?: string[];
    createdAt:Date;
    updatedAt:Date;
}

export interface ICertificateSigns{
    name:string,
    position:string,
    signature:string
}
export interface ICertificateCreate  {
    title: string;
    description?: string;
    url: string;
    category: string;
    activated?: boolean;
    signs: ICertificateSigns[];
    course?: string;
    event?:string;
}
export interface ICertificateUpdate {
    title?: string;
    description?: string;
    url?: string;
    category?: string;
    activated?: boolean;
    signs?: ICertificateSigns[];
    course?: string;
    event?:string;
}
export interface ICertificate {
    _id:string; avatar?:string;
    title: string;
    slug: string;
    description?: string;
    url: string;
    category: string;
    activated?: boolean;
    signs: ICertificateSigns[];
    student: IUser|string;
    course?: ICourse|string;
    event?:IEvent|string;
    createdAt:Date;
    updatedAt:Date;
}

export interface ICourseCreate  {
    title: string;
    description?: string;
    price: string;
    activated?: boolean;
    category?:string
    curriculum: string;
    modules: string[];
}
export interface ICourseUpdate  {
    title?: string;
    description?: string;
    price?: string;
    category?:string
    activated?: boolean;
    curriculum?: string;
    modules?: string[];
}
export interface ICourse  {
    _id:string; avatar?:string;
    title: string;
    slug: string;
    description?: string;
    category?:ICategory|string;
    price: string;
    activated: boolean;
    curriculum: string;
    created_by: IUser|string;
    modules?: IModule[]|string[];
    createdAt:Date;
    updatedAt:Date;
}
export interface ISubscriptionCreate  {
    payment:string;
    course: string;
    user?: string;
    valid_from: Date;
    valid_until: Date;
}
export interface ISubscriptionUpdate  {
    payment?: string;
    course?: string
    user?: string;
    valid_from?: Date;
    valid_until?: Date;
}
export interface ISubscription {
    _id:string; avatar?:string;
    payment?: IPayment|string;
    course: ICourse|string;
    user: IUser|string;
    valid_from: Date;
    valid_until: Date;
    createdAt:Date;
    updatedAt:Date;
}
export interface IModuleLecture {
    lecture: string|ILecture;
    rank: number;
}
export interface IModuleCreate  {
    title: string;
    description?: string;
    lectures?: IModuleLecture[];
    activated?: boolean;
}
export interface IModuleUpdate  {_id:string; avatar?:string;
    title?: string;
    description?: string;
    lectures?: IModuleLecture[];
    activated?: boolean;
}
export interface IModule  {
    _id:string;
     avatar?:string;
    created_by: IUser|string;
    title: string;
    slug: string;
    description?: string;
    lectures?: IModuleLecture[];
    activated: boolean;
    createdAt:Date;
    updatedAt:Date;
}

export interface ICategoryCreate  {
    title: string;
    description?: string;
    activated: boolean;
}
export interface ICategoryUpdate {
    title?: string;
    description?: string;
    activated?: boolean;
}
export interface ICategory {
    _id:string; avatar?:string;
    created_by: IUser|string;
    title: string;
    slug: string;
    description?: string;
    activated: boolean;
    createdAt:Date;
    updatedAt:Date;
}


export interface ILectureCreate  {
    quizes?: string[];
    title: string;
    content: string;
    activated?: boolean;
}
export interface ILectureUpdate {
    quizes?: string[];
    title?: string;
    content?: string;
    activated?: boolean;
}
export interface ILecture  {
    _id:string; avatar?:string;
    quiz?: IQuiz|string;
    title: string;
    slug: string;
    content: string;
    activated?: boolean;
    created_by: IUser|string;
    createdAt:Date;
    updatedAt:Date;
}

export interface ILectureViewCreate  {
    lecture: string;
}
export interface ILectureViewUpdate {
    lecture: string;
}
export interface ILectureView  {
    _id:string; avatar?:string;
    lecture: ILecture;
    created_by: IUser|string;
    createdAt:Date;
    updatedAt:Date;
}


export interface IEventCreate  {
    title: string;
    description?: string;
    content: string;
    activated?: boolean;
    happen_to: Date;
    happen_from: Date;
}
export interface IEventUpdate  {
    title?: string;
    description?: string;
    content?: string;
    activated?: boolean;
    happen_to?: Date;
    happen_from?: Date;
    subscribers?: string[];
}
export interface IEvent {
    _id:string; 
    avatar:string;
    created_by: IUser|string;
    title: string;
    slug: string;
    description?: string;
    content: string;
    activated: boolean;
    happen_to: Date;
    happen_from: Date;
    subscribers?: IUser|string[];
    createdAt:Date;
    updatedAt:Date;
}

export interface INewsCreate  {
    title: string;
    description?: string;
    content: string;
    activated?: boolean;
}
export interface INewsUpdate  {
    title?: string;
    description?: string;
    content?: string;
    activated?: boolean;
}
export interface INews  {
    _id:string; 
    created_by: IUser|string;
    title: string;
    slug: string;
    avatar:string;
    description?: string;
    content: string;
    activated: boolean;
    createdAt:Date;
    updatedAt:Date;
}

export interface IPaymentCreate  {
    event?: string;
    course?: string;
    transaction_reference?: string,
    transaction_id?: string,
    user:string;
    amount: number;
    status?: string;
    type: string;
    reference: string;
}
export interface IPaymentUpdate {
    event?: string;
    course?: string;
    user?: string;
    transaction_reference?: string,
    transaction_id?: string,
    amount?: number;
    status?: string;
    type?: string;
    reference?: string;
    created_by:IUser|string
}
export interface IPayment  {
    _id:string; 
    avatar?:string;
    event?: IEvent|string;
    course?: ICourse|string;
    user: IUser|string;
    amount: number;
    status: string;
    type: string;
    transaction_reference: string;
    transaction_id:string;
    createdAt:Date;
    updatedAt:Date;
}

export interface IPermissionCreate {
    name: string;
}
export interface IPermissionUpdate {
    name: string;
}
export interface IPermission {
    _id:string;
    slug: string;
    name: string;
    created_by?:IUser|string;
    createdAt:Date;
    updatedAt:Date;
}

export interface IPromoCreate  {
    title: string;
    description?: string;
    valid_from: Date;
    activated?: boolean;
    valid_until: Date;
    courses?: IPromoCourse[];
}
// export interface IPromoCreate  {
//     title: string;slug: string;
//     description?: string;
//     valid_from: Date;
//     activated?: boolean;
//     valid_until: Date;
//     courses?: IPromoCourse[];
// }
export interface IPromoUpdate {
    title?: string;
    description?: string;
    valid_from?: Date;
    activated?: boolean;
    valid_until?: Date;
    courses?: IPromoCourse[];
}
export interface IPromoCourse {
    _id:string; 
    avatar?:string;
    course: string|ICourse;
    percentage: number;
    }
    export interface IPromoCoursePopulated  extends IPromoCourse {_id:string; avatar?:string;
        course: ICourse|string;
        }
export interface IPromo  {
    _id:string; 
    avatar?:string;
    created_by: IUser | string;
    title: string;
    slug: string;
    description?: string;
    valid_from: Date;
    activated?: boolean;
    valid_until: Date;
    courses?: ICourse[] |string[];
    trainings: ITraining[]|string[];
    events: IEvent[]|string[];
    createdAt:Date;
    updatedAt:Date;
}

export interface IPublicationCreate  {
    title: string;
    content: string;
    description?: string;
    activated?: boolean;
    tags?: string[];
}
export interface IPublicationUpdate {
    title?: string;
    content?: string;
    description?: string;
    activated?: boolean;
    tags?: string[];
}
export interface IPublication  {
    _id:string; avatar?:string;
    title: string;
    slug: string;
    content: string;
    description?: string;
    activated: boolean;
    tags?: string[];
    created_by: IUser | string;
    createdAt:Date;
    updatedAt:Date;
}

export interface IQuizAnswer {
    answer: string;
    description?: number;
    is_answer: boolean;
}

export interface IQuizCreate  {
    title: string;
    answers:IQuizAnswer[]
    type?: string;
    description?: string;
    activated?: boolean;
}
export interface IQuizUpdate  {
    title?: string;
    answers?:IQuizAnswer[]
    type?: string;
    description?: string;
    activated?: boolean;
}
export interface IQuiz  {
    _id:string; avatar?:string;
    title: string;
    slug: string;
    answers:IQuizAnswer[]
    type: string;
    description?: string;
    activated: boolean;
    created_by: IUser | string;
    createdAt:Date;
    updatedAt:Date;
}


export interface IReviewCreate  {
    review: string;
    title?: string;
    course?: string;
    rate?:number;
    activated?: boolean;
}
export interface IReviewUpdate  {
    review?: string;
    rate?:number;
    title?: string;
    course?: string;
    activated?: boolean;
}
export interface IReview  {
    _id:string; 
    avatar?:string;
    created_by: IUser | string
    review: string;
    title?: string;
    course: ICourse| string;
    activated: boolean;
    createdAt:Date;
    updatedAt:Date;
}

export interface IRoleCreate {
    name: string;
    permissions?: string[];
}
export interface IRoleUpdate {
    name?: string;
    permissions?: string[];
}
export interface IRole {
    _id:string; avatar?:string;
    name: string;
    slug: string;
    permissions: IPermission[]| string[];
    createdAt:Date;
    updatedAt:Date;
}

export interface IUserCreate  {
    activated?: boolean;
    userRole?: string;
    password: string;
    firstName: string;
    lastName?: string;
    mobileNumber: string;
    email: string;
}

export interface IUserLogin  {
    password: string;
    email: string;
}

export interface IUserUpdate  {
    firstName?: string;
    lastName?: string;
    mobileNumber?: string;
    activated?: boolean;
    userRole?: string;
}
export interface IUser {
    _id:string; avatar?:string;
    role: IRole| string;
    firstName: string;
    lastName?: string;
    mobileNumber: string;
    activated: boolean;
    email: string;
    createdAt:Date;
    updatedAt:Date;
}