import mongoose from 'mongoose';

const Schema = mongoose.Schema;

 
 const courseSchema = new Schema(

  
    {
        title: {
          type: String,
          required: true,
        },
        description: String,
        fee: {
            type: Number,
            required: true,
          },
          count: {
            type: Number,
            required: true,
            default:0,
          },
        adminId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Admin',
          required: true,
        },
        lectures:[]
        
        
      },
  { timestamps: true }
);


const Course = mongoose.model('Course', courseSchema);

export default Course;
