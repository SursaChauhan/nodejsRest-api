import asyncHandler from 'express-async-handler';
import Lecture from '../models/lectures.js';
import Course from '../models/course.js';

import jwt from 'jsonwebtoken';

const createLectures = asyncHandler(async (req, res) => {
    const info = req.body;
    const { title, instructor, content,courseId,date,time } = req.body;

    

    console.log("lectureinfo",info);

    const course = await Course.findById(courseId);

    if (!course) {
        return res.status(404).json({ message: 'Course not found' });
      }
  
    const lecture = new Lecture({
      title: title || '',
      date:date || "",
      time: time || "",
      instructor: instructor || 0,
      content: content || '',
      courseId: courseId || '',
    });
  
    const createdLecture = await lecture.save(); // Corrected variable name
    course.lectures.push(createdLecture._id);
    await course.save();

    res.status(201).json(createdLecture);
});

const getLectures = asyncHandler(async (req, res) => {
    const pageSize = parseInt(req.query.limit) || 1;
    console.log(pageSize);
    const page = parseInt(req.query.page) || 1;
  
    const keyword = req.query.query
      ? {
          name: {
            $regex: req.query.query,
            $options: 'i', //case insensitive
          },
        }
      : {};
      console.log(req.query.query);
    const count = await Lecture.countDocuments({ ...keyword });
    const lectures = await Lecture.find({ ...keyword })
      .limit(pageSize)
      .skip(pageSize * (page - 1));
    res.json({ lectures, page, pages: Math.ceil(count / pageSize) });
  });

  const updateLecture = asyncHandler(async (req, res) => {
    const { title, instructor, content,date,time } = req.body;
  
    const lecture = await Lecture.findById(req.params.id);
    console.log(req.params.id);
  
    if (lecture) {
      lecture.title = title;
      lecture.content = content;
      lecture.instructor = instructor;
      lecture.time= time,
      lecture.date = date
      // product.image = image;
      
      const updatedProduct = await lecture.save();
      res.json(updatedProduct);
    } else {
      res.status(404);
      throw new Error('Course not found');
    }
  });

  //delete lecture

  const deleteLecture = asyncHandler(async (req, res) => {
    const id =req.params.id;
    console.log("id from delete Lecture",id);
    const lecture = await Lecture.findById(req.params.id);
    if (lecture) {
      await lecture.remove();
      res.json({ message: 'Lecture removed' });
    } else {
      res.status(404);
      throw new Error('Lecture not found');
    }
  });

export {
   createLectures,
getLectures,
updateLecture,deleteLecture
};

