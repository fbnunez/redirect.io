const mongoose = require('mongoose');

const UrlKeySchema = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    alias: String,
    url: String,
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  }
);

module.exports = mongoose.model('url_key', UrlKeySchema);
