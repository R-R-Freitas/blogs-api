const BlogPost = (sequelize, DataTypes) => {
  const BlogPost = sequelize.define("BlogPost", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: DataTypes.INTEGER,
  },
  {
    timestamps: true,
    createdAt: 'published',
    updatedAt: 'updated',
  });

  return BlogPost;
};

module.exports = BlogPost;
