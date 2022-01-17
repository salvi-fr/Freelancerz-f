import { combineReducers } from 'redux'
import {announcementReducer} from './announcement'
import {userReducer} from './user'
import {articleReducer} from './article'
import {authReducer} from './auth'
import {categoryReducer} from './category'
import {certificateReducer } from './certificate'
import {courseReducer} from './course'
import { eventReducer } from './event'
import { lectureReducer} from './lecture'
import { newsReducer} from './news'
import { moduleReducer} from './module'
import { paymentReducer} from './payment'
import { permissionReducer } from './permission'
import { roleReducer} from './role'
import { promoReducer} from './promo'
import { publicationReducer} from './publication'
import { quizReducer} from './quiz'
import { reviewReducer} from './review'
import { subscriptionReducer} from './subscription'
import { complainReducer } from './complain'
import { trainingReducer } from './training'
import { statReducer } from './stats'
const RootReducer = combineReducers({
    user: userReducer,
    course: courseReducer,
    category: categoryReducer,
    module: moduleReducer,
    payment: paymentReducer,
    permission: permissionReducer,
    role: roleReducer,
    promo: promoReducer,
    publication: publicationReducer,
    quiz: quizReducer,
    review: reviewReducer,
    subscription: subscriptionReducer,
    announcement: announcementReducer,
    article: articleReducer,
    certificate: certificateReducer,
    event: eventReducer,
    lecture: lectureReducer,
    news: newsReducer,
    auth: authReducer,
    complain: complainReducer,
    training: trainingReducer,
    stat: statReducer,
    
})
// export const initialState = {
//     user: InitialUserState,
//     course: InitialCourseState,
//     category: InitialCategoryState,
//     module: InitialModuleState,
//     payment: InitialPaymentState,
//     permission: InitialPermissionState,
//     role: InitialRoleState,
//     promo: InitialPromoState,
//     publication: InitialPublicationState,
//     quiz: InitialQuizState,
//     review: InitialReviewState,
//     subscription: InitialSubscriptionState,
//     announcement: InitialAnnouncementState,
//     article: InitialArticleState,
//     certificate: InitialCertificateState,
//     event: InitialEventState,   
//     lecture: InitialLectureState,
//     news: InitialNewsState,
//     auth: InitialAuthState,
// }

export type RootState = ReturnType<typeof RootReducer>


export default RootReducer