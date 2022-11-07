const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = mongoose.Schema(
    {
        writer: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },

        title: {
            type: String,
            maxlength: 50,
        },
        description: {
            type: String,
        },
        price: {
            type: Number,
            default: 0,
        },
        images: {
            type: Array,
            default: [],
        },
        categories: {
            type: String,
            default: 0,
        },
        sold: {
            type: Number,
            maxlength: 100,
            default: 0,
        },
        views: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true }
);

productSchema.index(
    {
        title: "text",
        description: "text",
    },
    {
        weights: {
            // 중요도
            title: 5,
            description: 1,
        },
    }
);

const Product = mongoose.model("Product", productSchema);

module.exports = { Product }; // 다른 곳에서도 쓸 수 있게
