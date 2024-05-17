module.exports = (sequelize, DataTypes) => {
    const tb_user = sequelize.define('tb_user', {
        image: {
            type: DataTypes.STRING,
            allowNull: true
        },
        title: {
            type: DataTypes.STRING(5),
            allowNull: false
        },
        name: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        surname: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        tel: {
            type: DataTypes.STRING(10),
            allowNull: true
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        username: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        password: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        role: {
            type: DataTypes.ENUM('superAdmin', 'Admin', 'ฝ่ายจ่ายเค้ก', 'ฝ่ายการเงิน', 'ครูที่ปรึกษา'),
            allowNull: true
        }
    });

    return tb_user;
};
