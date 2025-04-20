const {Sequelize,DataTypes}=require('sequelize');

const sequelize=new Sequelize('url','root','Shreya@19',{
    host:'localhost',
    dialect:'mysql',
});

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