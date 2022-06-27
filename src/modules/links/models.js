// all the models come in here
const mongoose = require("mongoose");
const { linkSchema } = require("./schema");

const linkModel = mongoose.model("Link", linkSchema);

class Link {
  static isUnique = async function (url, author) {
    let link = await linkModel.find({
      $and: [{ author: author }, { url: url }],
    });
    if (!link.length) {
      return true;
    }
    return false;
  };

  static authorExists = async function (authorId, linkId = null) {
    try {
      let author =
        linkId === null
          ? await mongoose.models.User.find({ _id: authorId })
          : await linkModel.find({ _id: linkId, author: authorId });
      if (!!author.length) {
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  };

  static getById = async function (id) {
    try {
      const result = await linkModel.findOne({ _id: id });
      if (!result) {
        throw new Error("invalid link id provided");
      }
      return result;
    } catch (error) {
      throw new Error(error);
    }
  };

  static create = async function (link) {
    try {
      const newLink = new linkModel(link);
      const result = await newLink.save();
      return result;
    } catch (error) {
      throw new Error(error);
    }
  };

  static update = async function (id, linkData) {
    const link = await linkModel.find({ _id: id });
    if (!link) {
      throw new Error("invalid link id provided");
    }
    const result = await linkModel.findByIdAndUpdate(id, linkData, {
      new: true,
    });
    return result;
  };

  static delete = async function (id) {
    const deletedLink = await linkModel.findByIdAndDelete(id);
    if (!deletedLink) {
      throw new Error("invalid link id provided");
    }
    return deletedLink;
  };

  static getAll = async function (author) {
    const result = await linkModel.find({
      author: author,
    });
    return result;
    // Response(
    //   "success",
    //   200,
    //   "fetched all links relating to this author successfully",
    //   result
    // );
  };
}

module.exports = Link;
