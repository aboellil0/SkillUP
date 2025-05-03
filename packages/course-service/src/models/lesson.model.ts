// src/models/lesson.model.ts
import mongoose, { Document, Schema } from 'mongoose';

interface Resource {
  title: string;
  type: 'pdf' | 'link' | 'code';
  url: string;
}

interface QuizQuestion {
  text: string;
  options: string[];
  correctOptionIndex: number;
}

interface Quiz {
  questions: QuizQuestion[];
}

export interface ILesson extends Document {
  courseId: mongoose.Types.ObjectId;
  title: string;
  description: string;
  content: string;
  videoUrl?: string;
  order: number;
  duration: number; // In minutes
  resources: Resource[];
  quiz?: Quiz;
  createdAt: Date;
  updatedAt: Date;
}

const resourceSchema = new Schema<Resource>({
  title: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    required: true,
    enum: ['pdf', 'link', 'code']
  },
  url: {
    type: String,
    required: true
  }
}, { _id: false });

const quizQuestionSchema = new Schema<QuizQuestion>({
  text: {
    type: String,
    required: true,
    trim: true
  },
  options: {
    type: [String],
    required: true,
    validate: {
      validator: function(v: string[]) {
        return v.length >= 2; // At least two options
      },
      message: 'Quiz question must have at least two options'
    }
  },
  correctOptionIndex: {
    type: Number,
    required: true,
    validate: {
      validator: function(v: number) {
        // correctOptionIndex must be a valid index in the options array
        return v >= 0 && v < (this as any).options.length;
      },
      message: 'Correct option index must be a valid index in the options array'
    }
  }
}, { _id: false });

const quizSchema = new Schema<Quiz>({
  questions: {
    type: [quizQuestionSchema],
    default: []
  }
}, { _id: false });

const lessonSchema = new Schema<ILesson>({
  courseId: {
    type: Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 100
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true
  },
  videoUrl: {
    type: String
  },
  order: {
    type: Number,
    required: true,
    min: 1
  },
  duration: {
    type: Number,
    default: 0
  },
  resources: {
    type: [resourceSchema],
    default: []
  },
  quiz: {
    type: quizSchema
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Create compound index on courseId and order for efficient sorting
lessonSchema.index({ courseId: 1, order: 1 });

export const LessonModel = mongoose.model<ILesson>('Lesson', lessonSchema);