// schema.js

import { gql } from 'apollo-server-express';

export const typeDefs = gql`
type User {
    _id: ID!
    name: String!
    email: String!
    course: [Course]
  }

  type Admin {
    _id: ID!
    name: String!
    email: String!
  }

  input UserInput {
    name: String!
    email: String!
    password: String!
  }

  input AdminInput {
    name: String!
    email: String!
    password: String!
  }

  type Query {
    users: [User!]!
    admins: [Admin!]!
  }

  type Mutation {
    createUser(userInput: UserInput!): User!
    createAdmin(adminInput: AdminInput!): Admin!
  }
  type Course {
    _id: ID!
    title: String!
    description: String
    fee: Float!
    count: Int!
    adminId: ID!
    lectures: [Lecture!]!
    createdAt: String!
    updatedAt: String!
  }

  type Lecture {
    _id: ID!
    title: String!
    instructor: String!
    content: String
    date: String!
    time: String!
    courseId: ID!
    createdAt: String!
    updatedAt: String!
  }

  input CourseInput {
    title: String!
    description: String
    fee: Float!
    count: Int!
    adminId: ID!
  }

  input LectureInput {
    title: String!
    instructor: String!
    content: String
    date: String!
    time: String!
    courseId: ID!
  }

  type Query {
    courses: [Course!]!
    lectures(courseId: ID!): [Lecture!]!
  }

  type Mutation {
    createCourse(courseInput: CourseInput!): Course!
    createLecture(lectureInput: LectureInput!): Lecture!
  }
`;
