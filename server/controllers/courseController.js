import asyncHandler from 'express-async-handler';
import Course from '../models/course.js';

import jwt from 'jsonwebtoken';

const createCourse = asyncHandler(async (req, res) => {
    const info = req.body;
    const { title, description, fee } = req.body;
    console.log(info);

    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, 'sursa');
    const adminId = decoded.userId;
  
    const course = new Course({
      title: title || '',
      fee: fee || 0,
      description: description || '',
      adminId: adminId || '',
      lectures: [],
    });
  
    const createdCourse = await course.save(); // Corrected variable name
    res.status(201).json(createdCourse);
});

const getCourses = asyncHandler(async (req, res) => {
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
  const count = await Course.countDocuments({ ...keyword });
  const products = await Course.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  res.json({ products, page, pages: Math.ceil(count / pageSize) });
});

const updateCourse = asyncHandler(async (req, res) => {
  const { title,fee,description} = req.body;

  const product = await Course.findById(req.params.id);

  if (product) {
    product.title = title;
    product.fee = fee;
    product.description = description;
    // product.image = image;
    
    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error('Course not found');
  }
});

//delete course 
const deleteCourse = asyncHandler(async (req, res) => {
  const id =req.params.id;
  console.log("id from delete course",id);
  const course = await Course.findById(req.params.id);
  console.log(course)
  if (course) {
    await course.remove();
    res.json({ message: 'Course removed' });
  } else {
    res.status(404);
    throw new Error('Course not found');
  }
});

export {
   createCourse,
getCourses,updateCourse,deleteCourse
};

