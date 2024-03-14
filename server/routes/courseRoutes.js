import express from 'express';
import {createCourse,deleteCourse,getCourses,updateCourse} from '../controllers/courseController.js';
import {createLectures,deleteLecture,getLectures, updateLecture} from '../controllers/lectureController.js'

const router = express.Router();

router.get('/', getCourses);
router.post('/', createCourse);
router.patch('/:id', updateCourse);
router.delete('/:id',deleteCourse)

router.post('/lectures', createLectures);
router.get('/lectures', getLectures);
router.patch('/lectures/:id',updateLecture );
router.delete('/lectures/:id',deleteLecture);

// router.post('/', protect, admin, createProduct);


export default router;