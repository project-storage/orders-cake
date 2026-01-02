module.exports = (sequelize, DataTypes) => {
    const tb_team = sequelize.define('tb_team', {
        teamName: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
            validate: {
                len: [1, 100],
                notEmpty: true
            }
        },
        teamType: {
            type: DataTypes.STRING(20),
            allowNull: false,
            validate: {
                len: [1, 20],
                notEmpty: true
            }
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                len: [3, 100],
                isAlphanumeric: true,
                notEmpty: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [6, 255],
                notEmpty: true
            }
        },
        role: {
            type: DataTypes.ENUM('team'),
            allowNull: false,
            defaultValue: 'team'
        }
    }, {
        // Additional model options
        timestamps: true, // Enable createdAt and updatedAt
        validate: {
            // Custom validation
            teamNameMustBeUnique() {
                if (!this.teamName) {
                    throw new Error('Team name is required');
                }
            }
        }
    });
    return tb_team
}