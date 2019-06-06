import {
  INSTRUCTOR_COURSES_DEHYDRATE,
  INSTRUCTOR_COURSES_RECEIVE,
  INSTRUCTOR_COURSE_DEHYDRATE,
  INSTRUCTOR_COURSE_REQUEST,
  INSTRUCTOR_COURSE_RESPONSE,
} from '../actions';
import { coursesReducer } from './courses';

export default coursesReducer(
  INSTRUCTOR_COURSES_DEHYDRATE,
  INSTRUCTOR_COURSES_RECEIVE,
  INSTRUCTOR_COURSE_DEHYDRATE,
  INSTRUCTOR_COURSE_REQUEST,
  (state, action) => {
    // TODO: custom reducers for instructorCourses
    return state;
  },
);