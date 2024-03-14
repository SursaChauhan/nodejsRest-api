// resolvers.js

import { User, Admin } from '../models/user.js';
import Course from '../models/course.js';
import Lecture from '../models/lectures.js';

export const resolvers = {
  Query: {
    users: async () => {
      try {
        const users = await User.find();
        return users;
      } catch (error) {
        throw new Error('Failed to fetch users');
      }
    },
    admins: async () => {
      try {
        const admins = await Admin.find();
        return admins;
      } catch (error) {
        throw new Error('Failed to fetch admins');
      }
    },
    courses: async () => {
      try {
        const courses = await Course.find();
        return courses;
      } catch (error) {
        throw new Error('Failed to fetch courses');
      }
    },
    lectures: async () => {
      try {
        const lectures = await Lecture.find();
        return lectures;
      } catch (error) {
        throw new Error('Failed to fetch lectures');
      }
    },
  },
  Mutation: {
    createUser: async (parent, { userInput }) => {
      const { name, email, password } = userInput;
      const newUser = new User({
        name,
        email,
        password,
      });
      try {
        const result = await newUser.save();
        return result;
      } catch (error) {
        throw new Error('Failed to create user');
      }
    },
    createAdmin: async (parent, { adminInput }) => {
      const { name, email, password } = adminInput;
      const newAdmin = new Admin({
        name,
        email,
        password,
      });
      try {
        const result = await newAdmin.save();
        return result;
      } catch (error) {
        throw new Error('Failed to create admin');
      }
    },
    createCourse: async (parent, { courseInput }) => {
      const { title, description, fee, count, adminId } = courseInput;
      const newCourse = new Course({
        title,
        description,
        fee,
        count,
        adminId,
      });
      try {
        const result = await newCourse.save();
        return result;
      } catch (error) {
        throw new Error('Failed to create course');
      }
    },
    createLecture: async (parent, { lectureInput }) => {
      const { title, instructor, content, date, time, courseId } = lectureInput;
      const newLecture = new Lecture({
        title,
        instructor,
        content,
        date,
        time,
        courseId,
      });
      try {
        const result = await newLecture.save();
        return result;
      } catch (error) {
        throw new Error('Failed to create lecture');
      }
    },
  },
};
