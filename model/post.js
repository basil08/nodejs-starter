import mongoose from "mongoose";

// const POST_TYPES = [ TWEET, BLOG, ESSAY ];

const postSchema = new mongoose.Schema({
  title: { type: String, default: null },
  rawText: { type: String },
  // htmlText: { type: String},
  // type: { type: String, enum: POST_TYPES, default: POST_TYPES[0]},
  word_count: { type: Number },
  images: [{ type: String }],
  created_by: mongoose.Schema.Types.ObjectId,
  last_updated: { type: Date },
  created_at: { type: Date, default: Date.now },
  is_public: { type: Boolean, default: false },
  numLikes: { type: Number, default: 0},
});

export default mongoose.model("post", postSchema);

// title
// text
// type: TWEET, BLOG, ESSAY
// word_count
// [images]
// created_by
// last_updated
// created_at
// is_public
// numLikes