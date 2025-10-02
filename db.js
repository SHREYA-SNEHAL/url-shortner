const {Sequelize,DataTypes}=require('sequelize');
require('dotenv').config();


const sequelize=new Sequelize(
    process.env.DB_NAME || 'url',
    process.env.DB_USER || 'root',
    process.env.DB_PASS,               // <- pulled from environment
    {
        host: process.env.DB_HOST || 'localhost',
        dialect: 'mysql',
    }
);

//Define table

const urls=sequelize.define('urls',{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
    },

    original_url:{
        type:DataTypes.STRING,
        allowNull:false,

    },

    short_code:{
        type:DataTypes.STRING,
        unique:true,
        allowNull:true,
    },

},{
    tableName:'urls',
    timestamps:true

});

(async ()=>{
    try{
        await sequelize.authenticate();
        console.log('Connection has been establised sucessfully.');

        await urls.sync();
        console.log('The table has been created sucessfully.');
    }
    catch(error){
        console.error('Unable to connect to the database:',error);

    }
    
    
})();
module.exports={sequelize,urls};