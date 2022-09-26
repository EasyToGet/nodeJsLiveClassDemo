const handleSuccess = require('../service/handleSuccess');
const handleError = require('../service/handleError');
const User = require('../models/userModel');

const users = {
  async getUser(req, res) {
    /**
    * #swagger.tags = ['Users - 使用者']
    * #swagger.description = '取得所有使用者'
    */
    const allUsers = await User.find();
    handleSuccess(res, '取得成功', allUsers);
  },
  async createdUsers(req, res) {
    /**
    * #swagger.tags = ['Users - 使用者']
    * #swagger.description = '新增使用者'
    */
    try {
      const data = req.body;
      console.log(data.email);
      if (data.email) {
        const newUsers = await User.create({
          name: data.name,
          email: data.email,
          password: data.password,
          photo: data.photo
        })
        handleSuccess(res, '新增成功', newUsers);
      } else {
        handleError(res, '欄位是空的，請填寫');
      }
    } catch (error) {
      handleError(res, error.message);
    }
  },
  async deleteAll(req, res) {
    /**
    * #swagger.tags = ['Users - 使用者']
    * #swagger.description = '刪除全部使用者'
    */
    // 取出 req 的 Url，再判斷是否等於 '/api/users/'
    if (req.originalUrl == '/api/users/') {
      handleError(res, '刪除失敗，查無此 ID');
    } else {
      await User.deleteMany({});
      const deleteAll = [];
      handleSuccess(res, '刪除成功', deleteAll);
    }
  },
  async deleteSingle(req, res) {
    /**
    * #swagger.tags = ['Users - 使用者']
    * #swagger.description = '刪除單筆使用者'
    */
    try {
      const id = req.params.id;
      const deleteSingle = await User.findByIdAndDelete(id);
      if (deleteSingle) {
        const user = await User.find();
        handleSuccess(res, '刪除成功', user);
      } else {
        handleError(res, '刪除失敗，查無此 ID');
      }
    } catch (error) {
      handleError(res, error.message);
    }
  },
  async updateUsers(req, res) {
    /**
    * #swagger.tags = ['Users - 使用者']
    * #swagger.description = '更改單筆使用者'
    */
    try {
      const id = req.params.id;
      const data = req.body;
      if (!data.email) {
        return handleError(res, '欄位是空的，請填寫');
      }
      const updateUsers = await User.findByIdAndUpdate(id, {
        name: data.name,
        email: data.email,
        password: data.password,
        photo: data.photo
      },
        {
          new: true,
          runValidators: true
        });
      if (!updateUsers) {
        return handleError(res, '更新失敗，查無此 ID');
      }
      const user = await User.find();
      handleSuccess(res, '更新成功', user);
    } catch (error) {
      handleError(res, "欄位沒有正確，或沒有此 ID");
    }
  }
}

module.exports = users;