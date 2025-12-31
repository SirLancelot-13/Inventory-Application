const pool=require('../db/pool.js');
const express=require('express');
const router=express.Router();
const {getPokemons,getPokemonByRegion,getPokemonByType,getPokemonByPriceRange,getPokemonByName,getPokemonByLvl,addPokemon}=require('../routers/indexRouter.js');

router.get('/',async (req,res)=>{
    const rows = await getPokemons();
    res.render('index',{pokemon:rows});
});

router.get('/type/:type',async (req,res)=>{
    const type=req.params.type;
    const rows=await getPokemonByType(type);
    res.render('index',{pokemon:rows});
});

router.get('/price',async (req,res)=>{
    const minPrice=req.query.min;
    const maxPrice=req.query.max;
    const rows=await getPokemonByPriceRange(minPrice,maxPrice);
    res.render('index',{pokemon:rows});
});

router.get('/search',async (req,res)=>{
    const name=req.query.name;
    const rows=await getPokemonByName(name);
    res.render('index',{pokemon:rows});
});

router.get('/lvl/:lvl',async (req,res)=>{
    const lvl=req.params.lvl;
    const rows=await getPokemonByLvl(lvl);
    res.render('index',{pokemon:rows});
});

router.post('/',async(req,res)=>{
    if (req.body.action==='search'){
        const name=req.body.name;
        res.redirect('/search?name='+name);
    }
    else if (req.body.action==='filterPrice'){
        const minPrice=req.body.minPrice;
        const maxPrice=req.body.maxPrice;
        res.redirect('/price?min='+minPrice+'&max='+maxPrice);
    }
    else if (req.body.action==='filterRegion'){
        const region=req.body.region;
        res.redirect('/region/'+region);
    }
    else if (req.body.action==='filterType'){
        const type=req.body.type;
        res.redirect('/type/'+type);
    }
    else if (req.body.action==='filterLvl'){
        const lvl=req.body.lvl;
        res.redirect('/lvl/'+lvl);
    }
    else if (req.body.action==='add'){
        await addPokemon(req.body.name, req.body.price, req.body.type, req.body.level);
        res.redirect('/');
    }
    else if (req.body.action==='clear'){
        res.redirect('/');
    };
})

module.exports = router;