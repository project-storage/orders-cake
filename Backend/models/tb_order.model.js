module.exports = (sequelize, DataTypes) => {
    const tb_order = sequelize.define('tb_order', {
        bookNumber: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: true,
                min: 1
            }
        },
        orderNumber: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: true,
                min: 1
            }
        },
        stuID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: true,
                min: 1
            }
        },
        teamID: {
            type: DataTypes.INTEGER,
            allowNull: true,
            validate: {
                isInt: true,
                min: 1
            }
        },
        dateBuy: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            validate: {
                isDate: true
            }
        },
        timeBuy: {
            type: DataTypes.TIME,
            allowNull: false,
            validate: {
                is: /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/
            }
        },
        pickupDate: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            validate: {
                isDate: true,
                isAfterToday() {
                    if (this.pickupDate && new Date(this.pickupDate) < new Date()) {
                        throw new Error('Pickup date must be today or in the future');
                    }
                }
            }
        },
        pickupTime: {
            type: DataTypes.TIME,
            allowNull: false,
            validate: {
                is: /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/
            }
        },
        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true,
            validate: {
                isDecimal: true,
                min: 0
            }
        },
        statusID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: true,
                min: 1
            }
        },
        depositPrice: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true,
            validate: {
                isDecimal: true,
                min: 0
            }
        },
        remainingPrice: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true,
            validate: {
                isDecimal: true,
                min: 0
            }
        },
        teachID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: true,
                min: 1
            }
        }
    }, {
        // Additional model options
        timestamps: true, // Enable createdAt and updatedAt
        validate: {
            // Custom validation to ensure price consistency
            priceConsistency() {
                if (this.depositPrice !== null && this.remainingPrice !== null && this.price !== null) {
                    const totalCalculated = parseFloat(this.depositPrice) + parseFloat(this.remainingPrice);
                    if (Math.abs(parseFloat(this.price) - totalCalculated) > 0.01) { // Allow small floating point differences
                        throw new Error('Price must equal deposit price plus remaining price');
                    }
                }
            }
        }
    });
    return tb_order
}