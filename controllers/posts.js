const handleSuccess = require('../service/handleSuccess');
const handleError = require('../service/handleError');
const Posts = require('../models/post');

const posts = {
  async getPosts(req, res) {
    const allPosts = await Posts.find();
    handleSuccess(res, '取得成功', allPosts);
  },
  async createdPosts({ body, req, res }) {
    try {
      const data = JSON.parse(body);
      if (data.content !== '') {
        const newPost = await Posts.create({
          name: data.name,
          tags: data.tags,
          type: data.type,
          content: data.content
        });
        handleSuccess(res, '新增成功', newPost);
      } else {
        handleError(res, '欄位沒有正確，或沒有此 ID');
      }
    } catch (error) {
      handleError(res, '欄位沒有正確，或沒有此 ID');
    }
  },
  async deleteAll(req, res) {
    await Posts.deleteMany({});
    const deleteAll = await Posts.find();
    handleSuccess(res, '刪除成功', deleteAll);
  },
  async deleteSingle(req, res) {
    try {
      const id = await req.url.split('/').pop();
      const deleteSingle = await Posts.findByIdAndDelete(id);
      if (deleteSingle) {
        handleSuccess(res, '刪除成功', deleteSingle);
      } else {
        handleError(res, '欄位沒有正確，或沒有此 ID');
      }
    } catch (error) {
      handleError(res, '欄位沒有正確，或沒有此 ID');
    }
  },
  async patchPosts({ body, req, res }) {
    try {
      const id = req.url.split('/').pop();
      const data = JSON.parse(body);
      const patchData = await Posts.findByIdAndUpdate(id, {
        name: data.name,
        tags: data.tags,
        type: data.type,
        content: data.content
      }, { new: true });
      if (data.content !== '' && patchData) {
        handleSuccess(res, '更新成功', patchData);
      } else {
        handleError(res, '欄位沒有正確，或沒有此 ID');
      }
    } catch (error) {
      handleError(res, '欄位沒有正確，或沒有此 ID');
    }
  }
}

module.exports = posts;