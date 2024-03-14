import mongoose from 'mongoose';

const Schema = mongoose.Schema;

 
const lectureSchema = new Schema({
    title: {
      type: String,
      required: true,
    },
    instructor: {
        type: String,
        required: true,
      },
    content: String,
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
   
  },
  );


const Lecture = mongoose.model('Lecture', lectureSchema);

export default Lecture;
