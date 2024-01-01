const Account = require("./Account");
const Member = require("./Member");
const Question = require('./Question');
const Comment = require('./Comment');
const Vote = require("./Vote");
const Category = require("./Category");

Comment.hasMany(Vote, {
  foreignKey: 'commentId',
});

Comment.hasMany(Comment);

Comment.belongsTo(Member, {
  foreignKey: 'memberId',
});

Question.belongsTo(Member, {
  foreignKey: 'memberId',
});
Question.hasMany(Comment, {
  foreignKey: 'questionId',
});

Category.belongsToMany(Question, { through: 'Categories_Questions'})
Question.belongsToMany(Category, { through: 'Categories_Questions'})



Vote.addHook('beforeValidate', (vote) => {
  vote.dataValues.questionId ||= 1;
  vote.dataValues.commentId ||= 1;
});

Vote.addHook('beforeCreate', async (vote) => {
  const { voteType, commentId }= vote.dataValues
  const comment = await Comment.findByPk(commentId);        
  const newVoteCount = (voteType === "UP") 
  ? comment.getDataValue('voteCount') + 1
  : comment.getDataValue('voteCount') - 1
  comment.setDataValue('voteCount', newVoteCount);
  
  await comment.save();
})

Vote.addHook('afterDestroy', async (vote) => {
  const { voteType, commentId }= vote.dataValues
  const comment = await Comment.findByPk(commentId);        
  const newVoteCount = (voteType === "UP") 
  ? comment.getDataValue('voteCount') - 1
  : comment.getDataValue('voteCount') + 1
  comment.setDataValue('voteCount', newVoteCount);
  
  await comment.save();
})

module.exports = {
  Account,
  Member,
  Question,
  Comment,
  Vote,
  Category,
}
