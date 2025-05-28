import mongoose from "mongoose";

export const SnippetSchema = new mongoose.Schema({text: String, summary: String});
export const SnippetModel = mongoose.model('Snippet', SnippetSchema);