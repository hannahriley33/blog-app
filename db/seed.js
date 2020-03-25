const Tweet = require('../lib/models/Tweet');
const Comment = require('../lib/models/Comment');
const chance = require('chance').Chance();

// specifying the number of tweets to create with our seed function
module.exports = async({ tweetsToCreate = 10, commentsToCreate = 100 } = {}) => {
  // creating tweets
  // creating an array of tweetsToCreate length
  // map through the array
  // -> for each item in the array we create an object with { handle, text }
  // for each tweet in the mapped array we create a tweet in our mongodb
  const handles = ['@spot', '@rover', '@bingo'];
  const tweets = await Tweet.create([...Array(tweetsToCreate)].map(() => ({
    handle: chance.pickone(handles),
    text: chance.sentence()
  })));

  await Comment.create([...Array(commentsToCreate)].map(() => ({
    tweetId: chance.pickone(tweets)._id,
    handle: chance.pickone(handles),
    text: chance.sentence()
  })));
};
