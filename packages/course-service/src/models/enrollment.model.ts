// src/models/enrollment.model.ts
import mongoose, { Document, Schema } from 'mongoose';

interface QuizScore {
  lessonId: mongoose.Types.ObjectId;
  score: number;
  attempts: number;
}

interface Progress {
  completedLessons: mongoose.Types.ObjectId[]; // References to completed lessons
  lastAccessed: mongoose.Types.ObjectId; // Reference to last accessed lesson
  quizScores: QuizScore[];
}

interface Rating {
  value: number; // 1-5
  review?: string;
  createdAt: Date;
}

export interface IEnrollment extends Document {
  userId: mongoose.Types.ObjectId;
  courseId: mongoose.Types.ObjectId;
  status: 'active' | 'completed' | 'dropped';
  progress: Progress;
  enrollmentDate: Date;
  completionDate?: Date;
  certificateId?: string;
  rating?: Rating;
  createdAt: Date;
  updatedAt: Date;
}

const quizScoreSchema = new Schema<QuizScore>({
  lessonId: {
    type: Schema.Types.ObjectId,
    ref: 'Lesson',
    required: true
  },
  score: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  attempts: {
    type: Number,
    required: true,
    default: 1,
    min: 1
  }
}, { _id: false });

const progressSchema = new Schema<Progress>({
  completedLessons: [{
    type: Schema.Types.ObjectId,
    ref: 'Lesson'
  }],
  lastAccessed: {
    type: Schema.Types.ObjectId,
    ref: 'Lesson'
  },
  quizScores: {
    type: [quizScoreSchema],
    default: []
  }
}, { _id: false });

const ratingSchema = new Schema<Rating>({
  value: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  review: {
    type: String,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, { _id: false });

const enrollmentSchema = new Schema<IEnrollment>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  courseId: {
    type: Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  status: {
    type: String,
    required: true,
    enum: ['active', 'completed', 'dropped'],
    default: 'active'
  },
  progress: {
    type: progressSchema,
    default: {
      completedLessons: [],
      quizScores: []
    }
  },
  enrollmentDate: {
    type: Date,
    required: true,
    default: Date.now
  },
  completionDate: {
    type: Date
  },
  certificateId: {
    type: String
  },
  rating: {
    type: ratingSchema
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

// Create compound index for user-course combination to ensure uniqueness
enrollmentSchema.index({ userId: 1, courseId: 1 }, { unique: true });

// Create indexes for common queries
enrollmentSchema.index({ userId: 1, status: 1 });
enrollmentSchema.index({ courseId: 1, enrollmentDate: -1 });

export const EnrollmentModel = mongoose.model<IEnrollment>('Enrollment', enrollmentSchema);