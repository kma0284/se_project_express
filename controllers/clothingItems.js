const ClothingItem = require("../models/clothingItem");

module.exports.getItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => res.send(items))
    .catch(() =>
      res.status(500).send({ message: "An error has occurred on the server" })
    );
};

module.exports.createItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;

  ClothingItem.create({
    name,
    weather,
    imageUrl,
    owner: req.user._id,
  })
    .then((item) => res.status(201).send(item))
    .catch((err) => {
      console.error("CREATE ITEM ERROR:", err);

      if (err.name === "ValidationError") {
        return res.status(400).send({
          message: err.message,
        });
      }

      return res.status(500).send({
        message: "An error has occurred on the server",
      });
    });
};

module.exports.deleteItem = (req, res) => {
  ClothingItem.findByIdAndDelete(req.params.itemId)
    .orFail()
    .then((item) => res.send(item))
    .catch((err) => {
      console.error(err);

      if (err.name === "CastError") {
        return res.status(400).send({
          message: "Invalid item ID",
        });
      }

      if (err.name === "DocumentNotFoundError") {
        return res.status(404).send({
          message: "Item not found",
        });
      }

      return res.status(500).send({
        message: "An error has occurred on the server",
      });
    });
};

module.exports.likeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    {
      $addToSet: {
        likes: req.user._id,
      },
    },
    {
      new: true,
    }
  )
    .orFail()
    .then((item) => res.send(item))
    .catch((err) => {
      console.error(err);

      if (err.name === "CastError") {
        return res.status(400).send({
          message: "Invalid item ID",
        });
      }

      if (err.name === "DocumentNotFoundError") {
        return res.status(404).send({
          message: "Item not found",
        });
      }

      return res.status(500).send({
        message: "An error has occurred on the server",
      });
    });
};

module.exports.dislikeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    {
      $pull: {
        likes: req.user._id,
      },
    },
    {
      new: true,
    }
  )
    .orFail()
    .then((item) => res.send(item))
    .catch((err) => {
      console.error(err);

      if (err.name === "CastError") {
        return res.status(400).send({
          message: "Invalid item ID",
        });
      }

      if (err.name === "DocumentNotFoundError") {
        return res.status(404).send({
          message: "Item not found",
        });
      }

      return res.status(500).send({
        message: "An error has occurred on the server",
      });
    });
};
