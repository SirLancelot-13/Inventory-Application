const pool=require('../db/pool');
const express=require('express');
const router=express.Router();

async function getPokemons(){
    try{
        const {rows}=await pool.query('Select * from pokemons');
        return rows;
    }
    catch(err){
        console.log(err);
    }
};

async function getPokemonByRegion(region){
    try{
        const {rows}=await pool.query('Select * from pokemons where region=$1',[region]);
        return rows;
    }
    catch(err){
        console.log(err);
    }
};

async function getPokemonByType(type){
    try{
        const {rows}=await pool.query('Select * from pokemons where type=$1',[type]);
        return rows;
    }
    catch(err){
        console.log(err);
    }
};

async function getPokemonByPriceRange(minPrice,maxPrice){
    try{
        const {rows}=await pool.query('Select * from pokemons where price between $1 and $2',[minPrice,maxPrice]);
        return rows;
    }
    catch(err){
        console.log(err);
    }
};

async function getPokemonByName(name){
    try{
        const {rows}=await pool.query('Select * from pokemons where name ILIKE $1',['%'+name+'%']);
        return rows;
    }
    catch(err){
        console.log(err);
    }
};

async function getPokemonByLvl(lvl){
    try{
        const {rows}=await pool.query('Select * from pokemons where level=$1',[lvl]);
        return rows;
    }
    catch(err){
        console.log(err);
    }
};

async function addPokemon(name, price, type, level) {
    try {
        await pool.query('INSERT INTO pokemons (name, price, type, level) VALUES ($1, $2, $3, $4)', [name, price, type, level]);
    } catch (err) {
        console.log(err);
    }
};

module.exports={
    getPokemons,
    getPokemonByRegion,
    getPokemonByType,
    getPokemonByPriceRange,
    getPokemonByName,
    getPokemonByLvl,
    addPokemon
}