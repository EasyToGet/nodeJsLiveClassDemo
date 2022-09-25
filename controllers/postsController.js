const handleSuccess = require('../service/handleSuccess');
const handleError = require('../service/handleError');
const Post = require('../models/postsModel');

const posts = {
  async getPosts(req, res) {
    /**
     * #swagger.tags = ['Posts - 貼文']
     * #swagger.description = '取得所有貼文'
     */
    // asc 遞增 (由小到大，由舊到新): "createdAt" ; desc 遞減 (由大到小、由新到舊): "-createdAt"
    const timeSort = req.query.timeSort === "asc" ? "createdAt" : "-createdAt";
    // new RegExp() 將字串轉成正規表達式，例如: "cool" -> /cool/
    const q = req.query.keyword !== undefined ? { "content": new RegExp(req.query.keyword) } : {};
    const allPosts = await Post.find(q).populate({
      path: 'user',
      select: 'name photo'
    }).sort(timeSort);
    handleSuccess(res, '取得成功', allPosts);
  },
  async createdPosts(req, res) {
    /**
    * #swagger.tags = ['Posts - 貼文']
    * #swagger.description = '新增貼文'
    */
    try {
      const data = req.body;
      if (data.content) {
        const newPost = await Post.create({
          user: data.user,
          tags: data.tags,
          type: data.type,
          content: data.content
        })
        handleSuccess(res, '新增成功', newPost);
      } else {
        handleError(res, '欄位是空的，請填寫');
      }
    } catch (error) {
      handleError(res, error.message);
    }
  },
  async deleteAll(req, res) {
    /**
    * #swagger.tags = ['Posts - 貼文']
    * #swagger.description = '刪除所有貼文'
    */
    // 取出 req 的 Url，再判斷是否等於 '/api/posts/'
    if (req.originalUrl == '/api/posts/') {
      handleError(res, '刪除失敗，查無此 ID');
    } else {
      await Post.deleteMany({});
      const deleteAll = [];
      handleSuccess(res, '刪除成功', deleteAll);
    }
  },
  async deleteSingle(req, res) {
    /**
    * #swagger.tags = ['Posts - 貼文']
    * #swagger.description = '刪除單筆貼文'
    */
    try {
      const id = req.params.id;
      const deleteSingle = await Post.findByIdAndDelete(id);
      if (deleteSingle) {
        const post = await Post.find();
        handleSuccess(res, '刪除成功', post);
      } else {
        handleError(res, '刪除失敗，查無此 ID');
      }
    } catch (error) {
      handleError(res, error.message);
    }
  },
  async patchPosts(req, res) {
    /**
    * #swagger.tags = ['Posts - 貼文']
    * #swagger.description = '更改單筆貼文'
    */
    try {
      const id = req.params.id;
      const data = req.body;
      if (!data.content) {
        return handleError(res, '欄位是空的，請填寫');
      }
      const patchPosts = await Post.findByIdAndUpdate(id, {
        name: data.name,
        content: data.content,
        tags: data.tags,
        type: data.type
      },
        {
          new: true,
          runValidators: true
        });
      if (!patchPosts) {
        return handleError(res, '更新失敗，查無此 ID');
      }
      const post = await Post.find().populate({
        path: 'user',
        select: 'name photo'
      });
      handleSuccess(res, '更新成功', post);
    } catch (error) {
      handleError(res, "欄位沒有正確，或沒有此 ID");
    }
  }
}

module.exports = posts;