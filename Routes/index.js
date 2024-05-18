const router = require('express').Router()
const jwt = require("jsonwebtoken")
const verifyToken = require('../helpers/verifyToken')

router.get('/api/getAccessToken', async(req,res)=>{
    try {
        token = jwt.sign(
            {
                userId: 13,
                email: 'dummy@gmail.com'
            },
            'Bearer',
            { expiresIn: "1h" }
        )
        res.status(200).send({token})
    } catch (err) {
        console.warn('Error /getAccessToken')
        res.status(400).send({error: 'Error Occured While Fetching Access Token'})
    }
})

router.get('/api/chapters',verifyToken, async(req, res) => {
    try{
        let response = await fetch('https://api.quran.com/api/v4/chapters')
        response = await response.json()
        response = response.chapters
        res.status(200).send(response);
    }catch(e){
        console.warn('Error /chapters: ', e)
        res.status(400).send({error: 'Error Occured While Fetching Chapters List'})
    }
})

router.get('/api/chapters/verses',verifyToken, async(req, res) => {
    try{
        let response = await fetch(`https://api.quran.com/api/v4/verses/by_page/${req.query.page}?language=en&words=true&translations=131&word_fields=text_uthmani`)
        response = await response.json()
        response = response.verses
        res.status(200).send(response);
    }catch(e){
        console.warn('Error /chapters/verses: ', e)
        res.status(400).send({error: 'Error Occured While Fetching Verses By Page Number'})
    }
})

module.exports = router;