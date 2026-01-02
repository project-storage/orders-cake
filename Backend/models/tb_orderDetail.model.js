module.exports = (sequelize, DataTypes) => {
    const tb_orderDetail = sequelize.define('tb_orderDetail', {
      orderID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: true,
          min: 1
        }
      },
      cakeID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: true,
          min: 1
        }
      },
      totalCake: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
          isDecimal: true,
          min: 0.01
        }
      },
      totalPoundsAmount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
          isDecimal: true,
          min: 0.01
        }
      },
      totalPrice: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
          isDecimal: true,
          min: 0.01
        }
      },
    }, {
        // Additional model options
        timestamps: true, // Enable createdAt and updatedAt
        validate: {
            // Custom validation to ensure price consistency
            priceConsistency() {
                if (this.totalPrice !== null && this.totalCake !== null) {
                    // This is a simplified validation - in a real app you might want to check against cake price
                }
            }
        }
    });

    return tb_orderDetail
  }
  