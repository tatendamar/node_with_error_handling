'use strict';
const {
  Model,
  DataTypes
} = require('sequelize');
const sequelize = require('../../config/database');



module.exports = sequelize.define('project', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Title is required'
      },
      notEmpty: {
        msg: 'Title cannot be empty'
      }
    }
  },
  isFeatured: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
    validate: {
      isIn: {
        args: [['true', 'false']],
        msg: 'Invalid value for isFeatured'
      }
    }
  },
  productImage: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Product image is required'
      }
    }
  },
  price: {
    type: DataTypes.DECIMAL,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Price is required'
      },
      notEmpty: {
        msg: 'Price cannot be empty'
      },
      isDecimal: {
        msg: 'price value must be a decimal'
      },
      min: {
        args: [0],
        msg: 'Price cannot be less than 0'
      },
      max: {
        args: [10000000000000],
        msg: 'Price cannot be greater than 10000000000000'
      }
    }
  },
  shortDescription: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Short description is required'
      },
      notEmpty: {
        msg: 'Short description cannot be empty'
      }
    }
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Description is required'
      },
      notEmpty: {
        msg: 'Description cannot be empty'
      }
    }
  },
  productUrl: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Product URL is required'
      },
      notEmpty: {
        msg: 'Product URL cannot be empty'
      },
      isUrl: {
        msg: 'Invalid URL'
      }
    }
  },
  category: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Category is required'
      }
    }
  },
  tags: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Tags is required'
      },
    
    }
  },
  createdBy: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'user',
      key: 'id',
    },
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
  },
  updatedAt: {
    allowNull: false,
    type: DataTypes.DATE,
  }
},
  {
    paranoid: true,
    freezeTableName: true,
    modelName: 'project',
  }
)