module.exports = (sequelize, DataTypes) => {
    const tb_student = sequelize.define('tb_student', {
        stuNumber: {
            type: DataTypes.STRING(20),
            allowNull: true,
            unique: true,
            validate: {
                len: [0, 20]
            }
        },
        stuIdCard: {
            type: DataTypes.STRING(20),
            allowNull: true,
            unique: true,
            validate: {
                is: /^[0-9]{13}$/, // Thai ID card format
                len: [13, 13]
            }
        },
        title: {
            type: DataTypes.STRING(5),
            allowNull: false,
            validate: {
                len: [1, 5],
                notEmpty: true
            }
        },
        name: {
            type: DataTypes.STRING(50),
            allowNull: false,
            validate: {
                len: [1, 50],
                notEmpty: true
            }
        },
        surname: {
            type: DataTypes.STRING(50),
            allowNull: false,
            validate: {
                len: [1, 50],
                notEmpty: true
            }
        },
        telephone: {
            type: DataTypes.STRING(10),
            allowNull: false,
            validate: {
                is: /^\d{10}$/,
                len: [10, 10]
            }
        },
        groupID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: true,
                min: 1
            }
        },
    }, {
        // Additional model options
        timestamps: true, // Enable createdAt and updatedAt
        validate: {
            // Custom validation to ensure required fields
            telephoneMustBeValid() {
                if (this.telephone && !/^\d{10}$/.test(this.telephone)) {
                    throw new Error('Telephone must be a 10-digit number');
                }
            }
        }
    });

    return tb_student
}
