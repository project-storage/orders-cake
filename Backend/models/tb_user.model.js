module.exports = (sequelize, DataTypes) => {
    const tb_user = sequelize.define('tb_user', {
        image: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                isUrl: true
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
        tel: {
            type: DataTypes.STRING(10),
            allowNull: true,
            validate: {
                is: /^\d{10}$/,
                len: [10, 10]
            }
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: true,
            unique: true,
            validate: {
                isEmail: true,
                len: [0, 100]
            }
        },
        username: {
            type: DataTypes.STRING(100),
            allowNull: true,
            unique: true,
            validate: {
                len: [3, 100],
                isAlphanumeric: true
            }
        },
        password: {
            type: DataTypes.STRING(100),
            allowNull: true,
            validate: {
                len: [6, 100]
            }
        },
        role: {
            type: DataTypes.ENUM('superAdmin', 'Admin', 'cake_distributor', 'finance', 'advisor'),
            allowNull: true
        }
    }, {
        // Additional model options
        timestamps: true, // Enable createdAt and updatedAt
        validate: {
            // Custom validation to ensure either email or username is provided
            eitherEmailOrUsername() {
                if (!this.email && !this.username) {
                    throw new Error('Either email or username must be provided');
                }
            }
        }
    });

    return tb_user;
};
