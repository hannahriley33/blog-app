const { getComment, getBlog } = require('../db/data-helpers');
const request = require('supertest');
const app = require('../lib/app');
describe('comment routes', () => {
  it('creates a comment', async() => {
    const blog = await getBlog();
    return request(app)
      .post('/api/v1/comments')
      .send({
        blogId: blog._id,
        author: 'test author',
        content: 'test content'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          blogId: blog._id,
          author: 'test author',
          content: 'test content',
          __v: 0
        });
      });
  });
  it('gets a comment by id', async() => {
    const blog = await getBlog();
    const comment = await getComment({ blogId: blog._id });
    return request(app)
      .get(`/api/v1/comments/${comment._id}`)
      .then(res => {
        expect(res.body).toEqual({
          ...comment,
          blogId: blog
        });
      });
  });
  it('updates a comment by id', async() => {
    const comment = await getComment();
    return request(app)
      .patch(`/api/v1/comments/${comment._id}`)
      .send({ author: 'Test Author' },
        { content: 'bad!' })
      .then(res => {
        expect(res.body).toEqual({
          ...comment,
          author: expect.any(String),
          content: expect.any(String)
        });
      });
  });
  it('deletes a comment by id', async() => {
    const comment = await getComment();
    return request(app)
      .delete(`/api/v1/comments/${comment._id}`)
      .then(res => {
        expect(res.body).toEqual(comment);
      });
  });
});
